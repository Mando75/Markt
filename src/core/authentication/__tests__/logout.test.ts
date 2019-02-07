import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
let app: Server, db: Connection, host: string, tc: TestClient, userId: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
    tc = new TestClient(host);
  }
  userId = (await tc.createUser(true)).id;
});

describe("logout", () => {
  it("logs out the user of a single session", async () => {
    await tc.login();
    const response = await tc.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email: tc.fakeUser.email
      }
    });

    await tc.logout();

    const response2 = await tc.me();

    expect(response2.data.me).toBeNull();
  });

  it("logs out of multiple sessions", async () => {
    const sess1 = new TestClient(host);
    const sess2 = new TestClient(host);
    await sess1.login();
    await sess2.login();
    expect(await sess1.me()).toEqual(await sess2.me());
    await sess1.logout();
    // Logout should destroy both sessions
    expect(await sess1.me()).toEqual(await sess2.me());
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
