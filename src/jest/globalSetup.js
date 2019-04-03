process.env.TS_NODE_FILES = "true";
require("ts-node/register");
require('dotenv').config();
const createConnection = require("../utils/CreateTypeORMConnection")
  .CreateTypeORMConnection;
module.exports = async () => {
  console.log("Setting environment");
  process.env.NODE_ENV = "test";
  process.env.TEST_PORT = 0;
  console.log("Connecting to Database");
  const connection = await createConnection();
  console.log("Drop existing schema");
  await connection.dropDatabase();
  console.log("Running migrations");
  await connection.runMigrations();
  console.log("Closing connection");
  await connection.close();
  console.log("Starting Tests");
};
