process.env.TS_NODE_FILES = "true";
require("ts-node/register");
const createConnection = require('../utils/CreateTypeORMConnection').CreateTypeORMConnection
module.exports = async () => {
  process.env.NODE_ENV = "test";
  process.env.TEST_PORT = 0;
  const connection = await createConnection();
  await connection.runMigrations();
  await connection.close();
};
