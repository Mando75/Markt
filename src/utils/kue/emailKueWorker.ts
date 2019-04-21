import { createQueue, Job } from "kue";
import { splitRedisUrl } from "../redis";
import { sendGridPlayerWelcomeEmail } from "../email/sendEmail";

const kue = createQueue({
  ...splitRedisUrl(),
  auth: "password",
  // TODO fix redis stuff
  db: process.env.NODE_ENV === "production" ? 0 : 3
});

kue.process("invitePlayer", 20, async (job: Job, done: Function) => {
  process.send = process.send || console.log;
  process.send(`starting email job for ${job.data.email}`);
  await sendGridPlayerWelcomeEmail(
    job.data.email,
    job.data.playerName,
    job.data.guideName,
    job.data.playerCode
  );
  process.send(`email job finished for ${job.data.email}`);
  done();
});
