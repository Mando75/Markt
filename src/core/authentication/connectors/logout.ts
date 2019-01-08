import { deleteSessions, getSessionIds } from "./lib";
import { Context } from "../../../types/context";

/**
 * Logic for logout mutation
 * Removes all user sessions
 * @param _
 * @param __
 * @param session
 * @param redis
 */
export const logout = async (_: any, __: any, { session, redis }: Context) => {
  const { userId } = session;
  if (userId) {
    const sessionIds = await getSessionIds(redis, userId);
    return await deleteSessions(sessionIds, userId, redis);
  }
};
