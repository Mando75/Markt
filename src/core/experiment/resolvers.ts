import { ResolverMap } from "../../types/graphql-utils";
import { getExperiment } from "./connectors/basicGets";

export const resolvers: ResolverMap = {
  Query: {
    experiment: getExperiment
  }
};
