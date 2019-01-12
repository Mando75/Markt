require("ts-node/register");
const Redis = require('ioredis')

module.exports = async () => {
  const redis = new Redis(process.env.REDIS_URL);
  await redis.flushall();
  return null;
};
