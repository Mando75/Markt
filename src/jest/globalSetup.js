process.env.TS_NODE_FILES = "true";
require("ts-node/register");
const { spawn } = require("child_process");
module.exports = async () => {
  console.log("In global setup");
  process.env.NODE_ENV = "test";
  process.env.TEST_PORT = 0;
  const yarn = spawn("yarn", ["run", "migrate:test"]);
  yarn.stderr.on("data", data => {
    console.log(`yarn stderr:\n${data}`);
  });
  yarn.on("exit", (code, signal) => {
    if (code) {
      process.exit(code, signal);
    }
  });
  console.log(`Migration output:`);
  for await (const data of yarn.stdout) {
    console.log(data.toString());
  }
};
