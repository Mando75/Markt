import { GraphQLContext } from "../../../types/graphql-context";
import { Scenario } from "../../../entity/Scenario";
import { RoleType } from "../../../entity/RoleType";
import { ScenarioSession } from "../../../entity/ScenarioSession";
import { SessionRole } from "../../../entity/SessionRole";
import * as graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";

export const getScenario = async (
  _: any,
  { id, code }: GQL.IScenarioOnQueryArguments,
  __: GraphQLContext,
  info: GraphQLResolveInfo
) => {
  // Empty case: They did not provide a param
  if (!(id || code)) {
    return null;
  }
  /**
   * Grab only the top level fields being called.
   * Exclude any relation columns, as they do not exist
   * on the table
   */
  const fields = Object.keys(
    graphqlFields(
      info,
      {},
      { excludedFields: ["__typename", "scenarioSessions", "roleTypes"] }
    )
  ) as (keyof Scenario)[];
  if (id)
    return fields.length
      ? await Scenario.findOne(id, { select: fields })
      : await Scenario.findOne(id);
  else if (code)
    return fields.length
      ? await Scenario.findOne({ scenarioCode: code }, { select: fields })
      : await Scenario.findOne({ scenarioCode: code });
};

export const getRoleType = async (
  _: any,
  { id }: GQL.IRoleTypeOnQueryArguments,
  __: GraphQLContext,
  info: GraphQLResolveInfo
) => {
  const fields = Object.keys(
    graphqlFields(
      info,
      {},
      { excludedFields: ["scenario", "sessionRoles", "__typename"] }
    )
  ) as (keyof RoleType)[];
  return fields.length
    ? await RoleType.findOne(id, { select: fields })
    : await RoleType.findOne(id);
};

export const getScenarioSession = async (
  _: any,
  { id }: { id: string },
  __: GraphQLContext,
  info: GraphQLResolveInfo
) => {
  const fields = Object.keys(
    graphqlFields(
      info,
      {},
      { excludedFields: ["__typename", "sessionRoles", "scenario"] }
    )
  ) as (keyof ScenarioSession)[];
  return fields.length
    ? await ScenarioSession.findOne(id, { select: fields })
    : await ScenarioSession.findOne(id);
};

export const getSessionRole = async (
  _: any,
  { id }: { id: string },
  __: GraphQLContext,
  info: GraphQLResolveInfo
) => {
  const fields = Object.keys(
    graphqlFields(
      info,
      {},
      { excludedFields: ["roleType", "scenarioSession", "scenario"] }
    )
  ) as (keyof SessionRole)[];
  return fields.length
    ? await SessionRole.findOne(id, { select: fields })
    : await SessionRole.findOne(id);
};
