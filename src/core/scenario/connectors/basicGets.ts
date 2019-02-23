/**
 * @author Bryan Muller
 * @description This file contains the basic getters for the scenario schema resolvers.
 * Each resolver will try to optimize the database query by only requesting the queried fields
 * from the query.
 */
import { GraphQLContext } from "../../../types/graphql-context";
import { Scenario } from "../../../entity/Scenario";
import { RoleType } from "../../../entity/RoleType";
import { ScenarioSession } from "../../../entity/ScenarioSession";
import { SessionRole } from "../../../entity/SessionRole";
import * as graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";

/**
 * Basic scenario query
 * @param _
 * @param id
 * @param code
 * @param __
 * @param info
 */
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

/**
 * Basic Role Type query
 * @param _
 * @param id
 * @param __
 * @param info
 */
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
