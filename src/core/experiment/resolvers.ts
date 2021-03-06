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
import { ExperimentSession } from "../../entity/ExperimentSession";
import { Round } from "../../entity/Round";

export const resolvers: ResolverMap = {
  ExperimentPlayer: {
    playerCode: async (obj: ExperimentPlayer) => await obj.getPlayerCode(),
    currentSessionRole: async (obj: ExperimentPlayer) =>
      await obj.getCurrentSessionRole(),
    profitEquation: async (obj: ExperimentPlayer) =>
      await obj.getProfitEquation()
  },
  Experiment: {
    // TODO bandaid fix
    activeSession: async (obj: Experiment) =>
      await ExperimentSession.findOne({
        where: { experiment: obj, active: true },
        cache: true
      }),
    activeRound: async (obj: Experiment) => {
      return await obj.getActiveRound();
    },
    scenario: async (obj: Experiment) => {
      const e = (await Experiment.findOne(obj.id, {
        cache: true
      })) as Experiment;
      return e.scenario;
    },
    lastRoundSummaryReport: async (obj: Experiment) =>
      await obj.getLastRoundSummaryReport()
  },
  Round: {
    roundSummary: async (obj: Round) => await obj.generateRoundSummaryReport()
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
