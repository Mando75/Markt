import { ResolverMap } from "../../types/graphql-utils";
import { getExperiment } from "./connectors/basicGets";
import { startNewExperiment } from "./connectors/startNewExperiment";
import { joinExperiment } from "./connectors/joinExperiment";
import { startNextSession } from "./connectors/startNextSession";
import { startNextRound } from "./connectors/startNextRound";
import { makeTransaction } from "./connectors/makeTransaction";
import { ExperimentPlayer } from "../../entity/ExperimentPlayer";

export const resolvers: ResolverMap = {
  ExperimentPlayer: {
    playerCode: async (obj: ExperimentPlayer) => await obj.getPlayerCode(),
    currentSessionRole: async (obj: ExperimentPlayer) =>
      await obj.getCurrentSessionRole(),
    profitEquation: async (obj: ExperimentPlayer) =>
      await obj.getProfitEquation()
  },
  Query: {
    experiment: getExperiment
  },
  Mutation: {
    startNewExperiment,
    joinExperiment,
    startNextSession,
    startNextRound,
    makeTransaction
  }
};
