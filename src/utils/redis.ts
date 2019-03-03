import * as Redis from "ioredis";

const url =
  process.env.NODE_ENV === "test" && process.env.CI_ENV !== "true"
    ? process.env.REDIS_URL + "/1"
    : process.env.REDIS_URL;
export const redis = new Redis(url as string);
