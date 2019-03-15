import { ResolverMap } from "../../types/graphql-utils";
import { getExperiment, getExperimentPlayers } from "./connectors/basicGets";
import { startNewExperiment } from "./connectors/startNewExperiment";
import { joinExperiment } from "./connectors/joinExperiment";
import { startNextSession } from "./connectors/startNextSession";
import { startNextRound } from "./connectors/startNextRound";
import { makeTransaction } from "./connectors/makeTransaction";

export const resolvers: ResolverMap = {
  Experiment: {
    players: getExperimentPlayers
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
