import { fork } from "child_process";

export const startWorkerKues = () => {
  console.log("starting worker kue");
  const ext = process.env.NODE_ENV === "production" ? "js" : "ts";
  console.log(ext);
  startEmailWorkerKue(ext);
};

const startEmailWorkerKue = (ext: string) => {
  fork(`${__dirname}/emailKueWorker.${ext}`)
    .on("exit", (code, signal) => {
      console.log("Worker exited", code, signal);
    })
    .on("message", console.log);
};
