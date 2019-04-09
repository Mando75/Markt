import { createQueue } from "kue";
import { redis } from "../redis";

export const emailKue = createQueue({
  redis
});
