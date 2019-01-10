import {
  createConfirmEmailLink,
  registerUser,
  userExists
} from "../connectors/lib";
import { AccountType } from "../../../enums/accountType.enum";
import { User } from "../../../entity/User";
import * as Redis from "ioredis";
import * as rp from "request-promise";
import { TestClient } from "../../../utils";
import { startTestServer } from "../../../../jest";
import { teardownTestServer } from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
let app: Server, db: Connection, host: string, userId: string;
const redis = new Redis();

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("The register function", async () => {
  const client = new TestClient(host);
  const user = client.fakeUser;

  it("Registers a user correctly", async () => {
    const newUser = await registerUser({
      user,
      accountType: AccountType.USER
    });
    newUser.password = "";
    expect(newUser).toMatchObject({
      ...user,
      accountType: "user",
      password: "",
      active: true,
      accountLocked: false,
      acceptedToS: false,
      emailConfirmed: false,
      externalGuid: null
    });
  });
});

describe("User exists", async () => {
  const client = new TestClient(host);

  it("returns true when a user exists", async () => {
    await client.createUser(true);
    const email = client.fakeUser.email;
    expect(await userExists(email)).toBe(true);
  });

  it("returns false when a user does not exist", async () => {
    const email = "FAKEEMAIL";
    expect(await userExists(email)).toBe(false);
  });
});

describe("createEmailConfirmationLink", () => {
  beforeAll(async () => {
    const tc = new TestClient(process.env.TEST_GRAPHQL_ENDPOINT as string);
    const user = await tc.createUser(false);
    userId = user.id;
  });
  it("confirms the users and clears the redis key", async () => {
    const url = await createConfirmEmailLink(
      process.env.TEST_HOST as string,
      userId,
      redis
    );

    const { msg } = await rp({ uri: url, json: true });
    expect(msg).toEqual("ok");
    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).emailConfirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });

  it("sends invalid back if bad id sent", async () => {
    try {
      await rp({
        uri: `${process.env.TEST_HOST}/confirm/12083`,
        json: true
      });
    } catch (e) {
      expect(e.statusCode).toEqual(403);
    }
  });
});

afterAll(async () => {
  await redis.disconnect();
  await teardownTestServer(app, db);
});
