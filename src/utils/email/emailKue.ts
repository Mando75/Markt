import { createQueue } from "kue";
import { splitRedisUrl } from "../redis";

export const emailKue = createQueue({
  redis: {
    ...splitRedisUrl(),
    db: 3,
    username: null,
    auth: "password"
  }
});
