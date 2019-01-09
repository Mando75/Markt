import * as Redis from "ioredis";
import { ErrorMessages } from "../errorMessages";
import { CreateTypeORMConnection, TestClient } from "../../../utils";

const host = process.env.TEST_GRAPHQL_ENDPOINT as string;
const redis = new Redis();

beforeAll(async () => {
  await CreateTypeORMConnection();
});

describe("Logging in a user", () => {
  const tc = new TestClient(host);
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
  await redis.disconnect();
});
