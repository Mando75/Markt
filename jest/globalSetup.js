process.env.TS_NODE_FILES = true;
require("ts-node/register");
// const { startTestServer } = require("./startTestServer");
module.exports = async () => {
  process.env.NODE_ENV = "test";
  process.env.TEST_PORT = 0;
  return null;
};
