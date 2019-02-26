import { Redis } from "ioredis";
import { RedisPrefix } from "../../enums/redisPrefix.enum";

/**
 * Handles logic for creating user sessions. Creates a new session with express-session,
 * and saves the session id to the user's master session list in Redis
 * @param userId
 * @param session
 * @param req
 * @param redis
 */
export const setSession = async (
  userId: string,
  session: Express.Session,
  req: Express.Request,
  redis: Redis
) => {
  session.userId = userId;
  if (req.sessionID) {
    await redis.lpush(`${RedisPrefix.USER_SESSION}${userId}`, req.sessionID);
  }
};

/**
 * Handles deleting user sessions. When a session is deleted, it will gather
 * all of the sessions the user had stored in Redis, and deletes them.
 * @param sessionIds
 * @param userId
 * @param redis
 */
export const deleteSessions = async (
  sessionIds: string[],
  userId: string,
  redis: Redis
) => {
  return new Promise(async (resolve, reject) => {
    const promises = sessionIds.map((id: string) =>
      redis.del(`${RedisPrefix.REDIS_SESSION}${id}`)
    );
    promises.push(redis.del(`${RedisPrefix.USER_SESSION}${userId}`));
    try {
      await Promise.all(promises);
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
};

export const getSessionIds = async (redis: Redis, userId: string) => {
  return await redis.lrange(`${RedisPrefix.USER_SESSION}${userId}`, 0, -1);
};
