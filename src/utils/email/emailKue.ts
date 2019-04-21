import { createQueue } from "kue";
import { splitRedisUrl } from "../redis";

export const emailKue = createQueue({
  ...splitRedisUrl(),
  auth: "password",
  db: 3
});
