process.env.TS_NODE_FILES = "true";
require("ts-node/register");
const Redis = require("ioredis");
const { dropSchema } = require("./teardownTestServer");

module.exports = async () => {
  const redis = new Redis(process.env.REDIS_URL);
  await Promise.all([redis.flushall(), dropSchema()]);
  return null;
};
