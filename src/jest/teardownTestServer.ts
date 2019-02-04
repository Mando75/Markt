import { Connection } from "typeorm";
import { Server } from "http";
import { CreateTypeORMConnection } from "../utils";

export const teardownTestServer = async (app: Server, db: Connection) => {
  await app.close();
  await db.close();
};

export const dropSchema = async () => {
  const connection = await CreateTypeORMConnection();
  await connection.dropDatabase();
};
