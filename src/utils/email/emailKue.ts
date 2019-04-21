import { createQueue } from "kue";
import { splitRedisUrl } from "../redis";

export const emailKue = createQueue({
  redis: {
    ...splitRedisUrl(),
    auth: "password",
    db: 3
  }
});
