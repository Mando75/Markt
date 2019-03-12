import { ResolverMap } from "../../types/graphql-utils";
import { getExperiment } from "./connectors/basicGets";
import { startNewExperiment } from "./connectors/startNewExperiment";
import { joinExperiment } from "./connectors/joinExperiment";
import { startNextSession } from "./connectors/startNextSession";
import { startNextRound } from "./connectors/startNextRound";

export const resolvers: ResolverMap = {
  Query: {
    experiment: getExperiment
  },
  Mutation: {
    startNewExperiment,
    joinExperiment,
    startNextSession,
    startNextRound
  }
};
