import { ResolverMap } from "../../types/graphql-utils";
import { getScenario } from "./connectors/basicGets";

export const resolvers: ResolverMap = {
  Query: {
    scenario: getScenario
  }
};
