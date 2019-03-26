import { ResolverMap } from "../../types/graphql-utils";
import { getExperiment, getExperimentPlayer } from "./connectors/basicGets";
import { startNewExperiment } from "./connectors/startNewExperiment";
import { joinExperiment } from "./connectors/joinExperiment";
import { startNextSession } from "./connectors/startNextSession";
import { startNextRound } from "./connectors/startNextRound";
import { makeTransaction } from "./connectors/makeTransaction";
import { ExperimentPlayer } from "../../entity/ExperimentPlayer";
import { Experiment } from "../../entity/Experiment";
import { endCurrentRound } from "./connectors/endCurrentRound";
import { endExperiment } from "./connectors/endExperiment";
import { pubsub } from "../../utils/ContextSession/contextControl";
import { withFilter } from "apollo-server-express";
import { SubscriptionKey } from "../../enums/subscriptionKey.enum";

export const resolvers: ResolverMap = {
  ExperimentPlayer: {
    playerCode: async (obj: ExperimentPlayer) => await obj.getPlayerCode(),
    currentSessionRole: async (obj: ExperimentPlayer) =>
      await obj.getCurrentSessionRole(),
    profitEquation: async (obj: ExperimentPlayer) =>
      await obj.getProfitEquation()
  },
  Experiment: {
    activeSession: async (obj: Experiment) => await obj.getActiveSession(),
    activeRound: async (obj: Experiment) => await obj.getActiveRound()
  },
  Query: {
    experiment: getExperiment,
    experimentPlayer: getExperimentPlayer
  },
  Mutation: {
    startNewExperiment,
    joinExperiment,
    startNextSession,
    startNextRound,
    makeTransaction,
    endCurrentRound,
    endExperiment
  },
  Subscription: {
    experimentStatusChanged: {
      resolve: (payload: Experiment) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionKey.EXPERIMENT_STATUS_UPDATE),
        (payload: Experiment, { experimentId }: { experimentId: string }) =>
          payload.id === experimentId
      )
    },
    playerJoinedExperiment: {
      resolve: (payload: Experiment) => payload,
      subscribe: withFilter(
        () => pubsub.asyncIterator(SubscriptionKey.PLAYER_JOINED_EXPERIMENT),
        (payload: Experiment, { experimentId }: { experimentId: string }) =>
          payload.id === experimentId
      )
    }
  }
};
