import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";
import { Experiment } from "../../../entity/Experiment";
import { ApolloError } from "apollo-server-express";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import {
  deletePlayerSessions,
  getPlayerSessionIds
} from "../../../utils/ContextSession/sessionControl";
import { Redis } from "ioredis";
import { SubscriptionKey } from "../../../enums/subscriptionKey.enum";

export const endExperiment = async (
  _: any,
  { experimentId }: GQL.IEndExperimentOnMutationArguments,
  { user, redis, pubsub }: GraphQLContext
) => {
  let experiment = await findAndCheckExperiment(experimentId, user);
  await deactivateSessionsAndRounds(experiment);
  await killPlayerSessions(experiment.id, redis);
  experiment.status = ExperimentStatusEnum.CLOSED;
  experiment.active = false;
  experiment = await experiment.save();
  pubsub.publish(SubscriptionKey.EXPERIMENT_STATUS_UPDATE, experiment);
  return experiment;
};

const findAndCheckExperiment = async (id: string, user: User | undefined) => {
  const guide = user ? await user.guide : null;
  const exp = await Experiment.findOne({
    where: { id, active: true, guide },
    cache: true
  });
  if (!exp) {
    throw new ApolloError(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST,
      "404"
    );
  }
  return exp;
};

const deactivateSessionsAndRounds = async (experiment: Experiment) => {
  const sessions = await experiment.sessions;
  const promises: Promise<any>[] = sessions
    .filter(s => s.active)
    .map(async s => {
      const rounds = (await s.rounds).filter(r => r.active);
      s.active = false;
      return [
        s.save(),
        rounds.map(r => {
          r.active = false;
          return r.save();
        })
      ].flat();
    });
  await Promise.all(promises);
};

const killPlayerSessions = async (experimentId: string, redis: Redis) => {
  const sessionIds = await getPlayerSessionIds(redis, experimentId);
  await deletePlayerSessions(sessionIds, experimentId, redis);
};
