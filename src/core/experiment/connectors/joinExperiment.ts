import { GraphQLContext } from "../../../types/graphql-context";
import { Player } from "../../../entity/Player";
import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";
import { Redis } from "ioredis";
import { RedisPrefix } from "../../../enums/redisPrefix.enum";
import { RoleType } from "../../../entity/RoleType";
import { ExperimentErrorMessages } from "../experimentErrorMessages";

/**
 * Resolver function for joining an experiment
 * Returns a new ExperimentPlayer entity
 * @param _
 * @param joinCode
 * @param playerCode
 * @param redis
 */
export const joinExperiment = async (
  _: any,
  { params: { joinCode, playerCode } }: GQL.IJoinExperimentOnMutationArguments,
  { redis }: GraphQLContext
) => {
  const { experiment, player } = await getExperimentAndPlayer(
    joinCode,
    playerCode
  );
  await checkExperimentBeforeJoin(experiment, player);
  const ep = ExperimentPlayer.create();
  ep.player = Promise.resolve(player);
  ep.experiment = Promise.resolve(experiment);
  const roleType = await assignPlayerRoleType(experiment.id, redis);
  ep.roleType = Promise.resolve(roleType);
  return await ep.save();
};

/**
 * Queries the database for the experiment and player records based on provided join codes.
 * Throws a new error if one of the records is null.
 * @param joinCode
 * @param playerCode
 */
const getExperimentAndPlayer = async (joinCode: string, playerCode: string) => {
  const experiment = await Experiment.findOne({
    where: { joinCode, active: true }
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
    where: { playerCode, guide, active: true }
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
  if (await ExperimentPlayer.findOne({ where: { experiment, player } })) {
    throw new ApolloError(
      ExperimentErrorMessages.PLAYER_ALREADY_IN_EXPERIMENT,
      "403"
    );
  }
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
      where: { roleTypeId: roleCode }
    });
    if (!roleType) {
      throw new Error(`Role Type does not exist: ${roleCode}`);
    }
    return roleType;
  } catch (e) {
    console.log(e);
    if (roleCode) {
      await redis.lpush(RedisPrefix.ROLE_DIST + eId, roleCode);
    }
    throw new ApolloError(
      ExperimentErrorMessages.CANNOT_ASSIGN_ROLE_TYPE,
      "500"
    );
  }
};
