import * as Redis from "ioredis";
import { URL } from "url";

const url =
  process.env.NODE_ENV === "test" && process.env.CI_ENV !== "true"
    ? process.env.REDIS_URL + "/1"
    : process.env.REDIS_URL;
export const redis = new Redis(url as string);

export const splitRedisUrl = () => {
  console.log(process.env.REDIS_URL);
  const redisUrl = new URL(process.env.REDIS_URL as string);
  console.log(redisUrl);
  return {
    host: redisUrl.hostname,
    port: redisUrl.port,
    username: redisUrl.username,
    password: redisUrl.password,
    db: 2
  };
};
