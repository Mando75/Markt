import { createQueue, Job } from "kue";
import { splitRedisUrl } from "../redis";
import { sendGridPlayerWelcomeEmail } from "../email/sendEmail";

const kue = createQueue({
  redis: {
    ...splitRedisUrl(),
    username: null,
    auth: "password",
    db: 3
  }
});

kue.on("error", err => {
  console.log("ERROR: In Kue", err);
});

// TODO: Increase pool count
kue.process("invitePlayer", 2, async (job: Job, done: Function) => {
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
