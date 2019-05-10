import { Redis } from "ioredis";
import { User } from "../../entity/User";
import { Player } from "../../entity/Player";
import { PubSub } from "apollo-server-express";
import { createLoaders } from "../../loaders";

export const pubsub = new PubSub();
/**
 * Return a closure to generate the graphql context
 * @param redis
 */
export const setContext = (redis: Redis) => {
  return async ({ req }: any) => {
    let user: User | undefined = undefined;
    let player: Player | undefined = undefined;
    if (req.session.userId) {
      user = await User.findOne(
        { id: req.session.userId, active: true },
        { cache: true }
      );
    }
    if (req.session.playerId) {
      player = await Player.findOne(
        { id: req.session.playerId, active: true },
        { cache: true }
      );
    }
    return {
      redis,
      pubsub,
      url: `${req.protocol}://${req.get("host")}`,
      session: req.session,
      user,
      player,
      req: req,
      loaders: createLoaders()
    };
  };
};
