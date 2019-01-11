import * as Redis from "ioredis";
import { ErrorMessages } from "../errorMessages";
import { TestClient } from "../../../utils";
import { startTestServer, teardownTestServer } from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
let app: Server, db: Connection, host: string, tc: TestClient;
const redis = new Redis(process.env.REDIS_URL as string);

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
    tc = new TestClient(host);
  }
});

describe("Logging in a user", () => {
  beforeAll(async () => {
    await tc.createUser(false);
  });
  it("catches no email confirmation", async () => {
    const response = await tc.login();
    expect(response.data).toEqual({
      login: [
        {
          path: "email",
          message: ErrorMessages.EMAIL_NOT_CONFIRMED
        }
      ]
    });
  });

  it("verifies proper login", async () => {
    if (tc.testUser) {
      tc.testUser.emailConfirmed = true;
      await tc.testUser.save();
    }
    const response = await tc.login();
    expect(response.data).toEqual({ login: null });
  });

  it("catches bad password", async () => {
    const response = await tc.login(tc.fakeUser.email, "badpassword");
    expect(response.data).toEqual({
      login: [
        {
          path: "email",
          message: ErrorMessages.INVALID_LOGIN
        }
      ]
    });
  });

  it("catches bad email", async () => {
    const response = await tc.login("bademail@email.com", tc.fakeUser.password);
    expect(response.data).toEqual({
      login: [
        {
          path: "email",
          message: ErrorMessages.INVALID_LOGIN
        }
      ]
    });
  });
});

afterAll(async () => {
  await Promise.all([redis.disconnect(), teardownTestServer(app, db)]);
});
