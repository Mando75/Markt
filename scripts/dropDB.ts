import { CreateTypeORMConnection } from "../src/utils";

CreateTypeORMConnection()
  .then(async conn => {
    return await conn.dropDatabase();
  })
  .finally(() => process.exit(0));
