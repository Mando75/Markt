import { Redis } from "ioredis";
import { RedisPrefix } from "../../enums/redisPrefix.enum";
import * as connectRedis from "connect-redis";
import { Session } from "../../types/graphql-context";

/**
 * Configuration for session storage
 */
export const createSession = (session: any, redis: Redis) => {
  const RedisStore = connectRedis(session);
  return {
    store: new RedisStore({
      client: redis as any,
      prefix: process.env.REDIS_SESSION_PREFIX
    }),
    name: "bid",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  };
};

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
 * Creates a new session for an experiment player
 * Add the player session id to the list of all player
 * session ids for the experiment
 * @param playerId
 * @param experimentId
 * @param session
 * @param req
 * @param redis
 */
export const setPlayerSession = async (
  playerId: string,
  experimentId: string,
  session: Session,
  req: Express.Request,
  redis: Redis
) => {
  session.playerId = playerId;
  session.experimentId = experimentId;
  if (req.sessionID) {
    await redis.lpush(
      `${RedisPrefix.PLAYER_SESSION}${experimentId}`,
      req.sessionID
    );
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

/**
 * Handles deleting all of the player sessions in an experiment.
 * @param sessionIds
 * @param experimentId
 * @param redis
 */
export const deletePlayerSessions = async (
  sessionIds: string[],
  experimentId: string,
  redis: Redis
) => {
  return new Promise(async (resolve, reject) => {
    const promises = sessionIds.map((id: string) =>
      redis.del(`${RedisPrefix.REDIS_SESSION}${id}`)
    );
    promises.push(redis.del(`${RedisPrefix.PLAYER_SESSION}${experimentId}`));
    try {
      await Promise.all(promises);
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });
};

/**
 * Returns a list of all the session id a user has from their various log ins
 * @param redis
 * @param userId
 */
export const getSessionIds = async (redis: Redis, userId: string) => {
  return await redis.lrange(`${RedisPrefix.USER_SESSION}${userId}`, 0, -1);
};

/**
 * Returns all of the player session ids for a given experiment.
 * @param redis
 * @param experimentId
 */
export const getPlayerSessionIds = async (
  redis: Redis,
  experimentId: string
) => {
  return await redis.lrange(
    `${RedisPrefix.PLAYER_SESSION}${experimentId}`,
    0,
    -1
  );
};
