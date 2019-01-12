import "reflect-metadata";
import { User } from "../../../entity/User";
import * as Redis from "ioredis";
import { createForgotPasswordLink } from "../connectors/lib";
import { ErrorMessages } from "../errorMessages";
import { lockAccount } from "../connectors/sendForgotPasswordEmail";
import {
  startTestServer,
  TestClient,
  teardownTestServer
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
let app: Server, db: Connection, host: string, tc: TestClient, user: User;
const redis = new Redis(process.env.REDIS_URL as string);

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
    tc = new TestClient(host);
    user = await tc.createUser(true);
  } else {
    process.exit(1);
  }
});

describe("forgotPassword", () => {
  // your test here
  const newPassword = "N@wP@assw0rd!";
  let url: string;
  let key: string;
  const query = (pwd: string, key: string) => `
      mutation {
        forgotPasswordChange(newPassword: "${pwd}", key: "${key}") {
        path
        message
      }
    }  
    `;
  it("locks the account", async () => {
    await lockAccount(user.id);
    url = await createForgotPasswordLink("", user.id, redis);
    const parts = url.split("/");
    key = parts[parts.length - 1];
    expect(await tc.login()).toEqual({
      data: {
        login: [
          {
            path: "email",
            message: ErrorMessages.ACCOUNT_LOCKED
          }
        ]
      }
    });
  });

  it("rejects invalid passwords", async () => {
    const response = await tc.query(query("badpassword", key));
    expect(response.data).toEqual({
      forgotPasswordChange: [
        {
          path: "newPassword",
          message: ErrorMessages.PASSWORD_TOO_SIMPLE
        }
      ]
    });
  });

  it("resets the account", async () => {
    const response = await tc.query(query(newPassword, key));
    expect(response.data).toEqual({
      forgotPasswordChange: null
    });
  });

  it("expires the redis key", async () => {
    const response = await tc.query(query(newPassword, key));
    expect(response.data).toEqual({
      forgotPasswordChange: [
        {
          path: "key",
          message: ErrorMessages.EXPIRED_KEY
        }
      ]
    });
  });

  it("allows us to log in with new password", async () => {
    const response = await tc.login("", newPassword);
    expect(response.data).toEqual({ login: null });
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
