import { Connection } from "typeorm";
import { Server } from "http";

export const teardownTestServer = async (app: Server, db: Connection) => {
  await app.close();
  await db.close();
};
