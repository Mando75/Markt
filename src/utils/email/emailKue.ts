import { createQueue } from "kue";
import "dotenv/config";

export const emailKue = createQueue({
  redis: process.env.REDIS_2_URL
});
