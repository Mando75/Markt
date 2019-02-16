import { GraphQLContext } from "../../../types/graphql-context";
import {
  deleteSessions,
  getSessionIds
} from "../../../utils/ContextSession/sessionControl";

/**
 * Logic for logout mutation
 * Removes all user sessions
 * @param _
 * @param __
 * @param session
 * @param redis
 */
export const logout = async (
  _: any,
  __: any,
  { session, redis }: GraphQLContext
) => {
  const { userId } = session;
  if (userId) {
    const sessionIds = await getSessionIds(redis, userId);
    return await deleteSessions(sessionIds, userId, redis);
  }
};
