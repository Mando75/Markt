import { ResolverMap } from "../../types/graphql-utils";
import {
  getScenario,
  getRoleType,
  getScenarioSession,
  getSessionRole
} from "./connectors/basicGets";

export const resolvers: ResolverMap = {
  Query: {
    scenario: getScenario,
    roleType: getRoleType,
    scenarioSession: getScenarioSession,
    sessionRole: getSessionRole
  }
};
