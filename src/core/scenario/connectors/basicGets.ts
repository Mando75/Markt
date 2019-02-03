import { GraphQLContext } from "../../../types/graphql-context";
import { Scenario } from "../../../entity/Scenario";
import { RoleType } from "../../../entity/RoleType";
import { ScenarioSession } from "../../../entity/ScenarioSession";
import { SessionRole } from "../../../entity/SessionRole";

export const getScenario = async (
  _: any,
  { id }: GQL.IScenarioOnQueryArguments,
  __: GraphQLContext
) => await Scenario.findOne(id);

export const getRoleType = async (
  _: any,
  { id }: GQL.IRoleTypeOnQueryArguments,
  __: GraphQLContext
) => await RoleType.findOne(id);

export const getScenarioSession = async (
  _: any,
  { id }: { id: string },
  __: GraphQLContext
) => await ScenarioSession.findOne(id);

export const getSessionRole = async (
  _: any,
  { id }: { id: string },
  __: GraphQLContext
) => await SessionRole.findOne(id);
