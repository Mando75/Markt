import * as Redis from "ioredis";

const url = process.env.REDIS_URL;
export const redis = new Redis(url as string);
