import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";

/**
 * Resolver for the
 * @param parent
 * @param _
 * @param __
 */
export const getUserGuide = async (
  parent: User,
  _: any,
  __: GraphQLContext
) => {
  return await parent.guide;
};
