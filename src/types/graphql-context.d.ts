import { Redis } from "ioredis";
import { User } from "../entity/User";
import { Player } from "../entity/Player";

export interface GraphQLContext {
  redis: Redis;
  url: string;
  session: Session;
  user?: User;
  player?: Player;
  req: Express.Request;
}

export interface Session extends Express.Session {
  userId?: string;
  playerId?: string;
  experimentId?: string;
}
