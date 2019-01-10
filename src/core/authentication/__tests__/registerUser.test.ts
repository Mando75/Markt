import "reflect-metadata";
import { TestClient } from "../../../utils";
import { ErrorMessages } from "../errorMessages";
import * as faker from "faker";
import { startTestServer, teardownTestServer } from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
let app: Server, db: Connection, host: string, tc: TestClient;

const user = ({
  email = faker.internet.email().toLowerCase(),
  pwd = faker.internet.password(8, false) + "@Aa1",
  first = faker.name.firstName(),
  last = faker.name.lastName()
}: any) => ({
  email,
  password: pwd,
  firstName: first,
  lastName: last
});

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
    tc = new TestClient(host);
  }
});

describe("Registering a new user", async () => {
  it("Registers a user properly", async () => {
    const resp = await tc.register(false, user({}));
    expect(resp.data.registerUser).toBe(null);
  });

  it("Can't register the same user twice", async () => {
    const duplicateUser = new TestClient(host);
    await duplicateUser.createUser(false);
    const {
      data: { registerUser }
    } = await duplicateUser.register(false);
    expect(registerUser).toHaveLength(1);
    expect(registerUser[0].path).toEqual("email");
    expect(registerUser[0].message).toEqual(ErrorMessages.EMAIL_DUPLICATE);
  });

  it("catches an invalid email", async () => {
    const {
      data: { registerUser }
    } = await tc.register(false, user({ email: "bademail" }));
    expect(registerUser).toHaveLength(1);
    expect(registerUser[0].path).toEqual("email");
    expect(registerUser[0].message).toEqual(ErrorMessages.EMAIL_INVALID_EMAIL);
  });

  it("catches short email", async () => {
    const {
      data: { registerUser }
    } = await tc.register(false, user({ email: "1@a.c" }));
    expect(registerUser).toHaveLength(1);
    expect(registerUser[0].path).toEqual("email");
    expect(registerUser[0].message).toEqual(ErrorMessages.EMAIL_TOO_SHORT);
  });

  it("catches long email", async () => {
    const invalidEmail = `${new Array(255).join("a")}@chuck.com`;
    const {
      data: { registerUser }
    } = await tc.register(false, user({ email: invalidEmail }));
    expect(registerUser).toHaveLength(1);
    expect(registerUser[0].path).toEqual("email");
    expect(registerUser[0].message).toEqual(ErrorMessages.EMAIL_TOO_LONG);
  });

  it("catches invalid password", async () => {
    const {
      data: { registerUser }
    } = await tc.register(
      false,
      user({ email: "newmail@mail.com", pwd: "badpwd" })
    );
    expect(registerUser).toHaveLength(2);
    expect(registerUser[0].path).toEqual("password");
    expect(registerUser[0].message).toEqual(ErrorMessages.PASSWORD_TOO_SHORT);
    expect(registerUser[1].path).toEqual("password");
    expect(registerUser[1].message).toEqual(ErrorMessages.PASSWORD_TOO_SIMPLE);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
