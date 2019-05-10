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
    currentSessionRole: async (obj: ExperimentPlayer) =>
      await obj.getCurrentSessionRole(),
    profitEquation: async (obj: ExperimentPlayer) =>
      await obj.getProfitEquation(),
    transactions: (obj: ExperimentPlayer, _, { loaders: { epTransactions } }) =>
      epTransactions.load(obj.id)
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
    guide: ({ id }: Experiment, _, { loaders: { exGuide } }) => {
      return exGuide.load(id);
    },
    lastRoundSummaryReport: async (obj: Experiment) =>
      await obj.getLastRoundSummaryReport(),
    players: ({ id }: Experiment, _, { loaders: { exPlayers } }) => {
      return exPlayers.load(id);
    },
    scenario: ({ id }: Experiment, _, { loaders: { exScenario } }) => {
      return exScenario.load(id);
    },
    sessions: ({ id }: Experiment, _, { loaders: { exSessions } }) => {
      return exSessions.load(id);
    }
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
