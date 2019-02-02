import { GraphQLContext } from "../../../types/graphql-context";
import { Scenario } from "../../../entity/Scenario";
import { RoleType } from "../../../entity/RoleType";

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
