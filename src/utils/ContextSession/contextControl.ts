import { Redis } from "ioredis";
import { User } from "../../entity/User";
import { Player } from "../../entity/Player";
import { PubSub } from "apollo-server-express";
import { Connection } from "typeorm";
import { GraphQLDatabaseLoader } from "../graphqlLoader/loader";

export const pubsub = new PubSub();
/**
 * Return a closure to generate the graphql context
 * @param redis
 */
export const setContext = (redis: Redis, db: Connection) => {
  return async ({ req }: any) => {
    let user: User | undefined = undefined;
    let player: Player | undefined = undefined;
    if (req.session.userId) {
      user = await User.findOne(
        { id: req.session.userId, active: true },
        { cache: true, relations: ["guide"] }
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
      loader: new GraphQLDatabaseLoader(db),
      req: req
    };
  };
};
