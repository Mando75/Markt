import { Redis } from "ioredis";

export interface GraphQLContext {
  redis: Redis;
  url: string;
  session: Session;
  req: Express.Request;
}

export interface Session extends Express.Session {
  userId?: string;
}
