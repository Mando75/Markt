import * as Redis from "ioredis";
import { URL } from "url";

const url =
  process.env.NODE_ENV === "test" && process.env.CI_ENV !== "true"
    ? process.env.REDIS_URL + "/1"
    : process.env.REDIS_URL;
export const redis = new Redis(url as string, { enableReadyCheck: false });

redis.on("connect", () => {
  console.log("connected");
});
redis.on("error", () => {
  console.log("Error connecting");
  if (process.env.NODE_ENV != "production") redis.disconnect();
});

export const redis2 = new Redis(
  (process.env.REDIS_2_URL as string) || (process.env.REDIS_URL as string)
);

redis2.on("connect", () => {
  console.log("connected to 2");
});

export const splitRedisUrl = (
  uri: string = process.env.REDIS_URL as string,
  db: number = 2
) => {
  const redisUrl = new URL(uri);
  return {
    host: redisUrl.hostname,
    port: redisUrl.port,
    username: redisUrl.username,
    password: redisUrl.password,
    db
  };
};
