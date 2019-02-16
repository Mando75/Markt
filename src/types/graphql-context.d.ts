import { Redis } from "ioredis";
import { User } from "../entity/User";

export interface GraphQLContext {
  redis: Redis;
  url: string;
  session: Session;
  user: User | undefined;
  req: Express.Request;
}

export interface Session extends Express.Session {
  userId?: string;
}
