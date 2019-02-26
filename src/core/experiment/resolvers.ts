import { ResolverMap } from "../../types/graphql-utils";
import { getExperiment } from "./connectors/basicGets";
import { startNewExperiment } from "./connectors/startNewExperiment";

export const resolvers: ResolverMap = {
  Query: {
    experiment: getExperiment
  },
  Mutation: {
    startNewExperiment
  }
};
