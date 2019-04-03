import { GraphQLContext } from "../../../types/graphql-context";
import { Player } from "../../../entity/Player";
import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";
import { Redis } from "ioredis";
import { RedisPrefix } from "../../../enums/redisPrefix.enum";
import { RoleType } from "../../../entity/RoleType";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { setPlayerSession } from "../../../utils/ContextSession/sessionControl";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";

/**
 * Resolver function for joining an experiment
 * Returns a new ExperimentPlayer entity
 * TODO: Create a cookie
 * @param _
 * @param joinCode
 * @param playerCode
 * @param redis
 * @param session
 * @param req
 */
export const joinExperiment = async (
  _: any,
  { params: { joinCode, playerCode } }: GQL.IJoinExperimentOnMutationArguments,
  { redis, session, req, pubsub, player: sessionPlayer }: GraphQLContext
) => {
  if (
    session.playerId &&
    sessionPlayer &&
    sessionPlayer.playerCode === playerCode
  ) {
    const player = await getExistingPlayer(joinCode, sessionPlayer);
    const experiment = await player.experiment;
    pubsub.publish(SubscriptionKey.PLAYER_JOINED_EXPERIMENT, experiment);
    return player;
  }
  const { experiment, player } = await getExperimentAndPlayer(
    joinCode,
    playerCode
  );
  let ep = await checkExperimentBeforeJoin(experiment, player);
  if (!ep) {
    ep = await createNewPlayer(player, experiment, redis);
  }

  await setPlayerSession(player.id, experiment.id, session, req, redis);
  ep = await ep.save();
  await experiment.reload();
  pubsub.publish(SubscriptionKey.PLAYER_JOINED_EXPERIMENT, experiment);
  return ep;
};

/**
 * Returns an experiment player for someone who already has an ExperimentPlayer session
 * @param joinCode
 * @param player
 */
const getExistingPlayer = async (joinCode: string, player: Player) => {
  const experimentPlayers = await player.experimentPlayers;
  const index = (await Promise.all(
    experimentPlayers.map(ep => ep.experiment)
  )).findIndex(e => e.joinCode === joinCode);
  return experimentPlayers[index];
};

/**
 * Queries the database for the experiment and player records based on provided join codes.
 * Throws a new error if one of the records is null.
 * @param joinCode
 * @param playerCode
 */
const getExperimentAndPlayer = async (joinCode: string, playerCode: string) => {
  const experiment = await Experiment.findOne({
    where: { joinCode, active: true },
    cache: true
  });
  if (!experiment) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
      "404"
    );
  }
  const guide = await experiment.guide;
  // Player code is unique across playerCode, guide, and active
  const player = await Player.findOne({
    where: { playerCode, guide, active: true },
    cache: true
  });
  if (!player) {
    throw new ApolloError(ExperimentErrorMessages.PLAYER_DOES_NOT_EXIST, "404");
  }
  return { experiment, player };
};

/**
 * Performs checks on the experiment to ensure that player can join without issue
 * @param experiment
 * @param player
 */
const checkExperimentBeforeJoin = async (
  experiment: Experiment,
  player: Player
) => {
  // Checks if the experiment is full
  if (experiment.closed()) {
    throw new ApolloError(ExperimentErrorMessages.EXPERIMENT_CLOSED, "403");
  }
  // Checks if the player has already joined
  return await ExperimentPlayer.findOne({
    where: { experiment, player },
    cache: 60000
  });
};

/**
 * Pops a role type off the redis stack and returns the associated
 * Throws an error if unable to assign a role
 * RoleType record
 * @param eId
 * @param redis
 */
const assignPlayerRoleType = async (eId: string, redis: Redis) => {
  let roleCode: string | null = null;
  try {
    roleCode = await redis.lpop(RedisPrefix.ROLE_DIST + eId);
    const roleType = await RoleType.findOne({
      where: { roleTypeId: roleCode },
      cache: true
    });
    if (!roleType) {
      throw new Error(`Role Type does not exist: ${roleCode}`);
    }
    return roleType;
  } catch (e) {
    if (roleCode) {
      await redis.lpush(RedisPrefix.ROLE_DIST + eId, roleCode);
    }
    throw new ApolloError(
      ExperimentErrorMessages.CANNOT_ASSIGN_ROLE_TYPE,
      "500"
    );
  }
};

const createNewPlayer = async (
  player: Player,
  experiment: Experiment,
  redis: Redis
) => {
  let ep = ExperimentPlayer.create();
  ep.player = Promise.resolve(player);
  ep.experiment = Promise.resolve(experiment);
  const roleType = await assignPlayerRoleType(experiment.id, redis);
  ep.roleType = Promise.resolve(roleType);
  return ep;
};
