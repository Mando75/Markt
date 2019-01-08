import "reflect-metadata";
import { CreateTypeORMConnection, TestClient } from "../../../utils";

const host = process.env.TEST_GRAPHQL_ENDPOINT as string;
let userId: string;
const tc = new TestClient(host);

beforeAll(async () => {
  await CreateTypeORMConnection();
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
