import { db, app } from "./startTestServer";

export const teardownTestServer = async () => {
  await app.close();
  await db.close();
};
