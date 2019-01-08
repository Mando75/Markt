require("ts-node/register");
const {teardownTestServer} = require("./teardownTestServer");

module.exports = async () => {
  await teardownTestServer();
  return null;
};
