import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { AccountType } from "../../../enums/accountType.enum";
import { ApolloErrors } from "../../../enums/ApolloErrors";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("createGuideFromUser", () => {
  const query = (userId: string) => `
    mutation {
      createGuideFromUser(userId: "${userId}") {
        id
        user {
          id
        }
      }
    }
  `;

  it("allows admins to create a new guide record given a user id", async () => {
    const adminClient = new TestClient(host);
    await adminClient.createUser(true, AccountType.ADMIN);
    await adminClient.login();
    const mockUser = (await TestClient.createMockUsers(1))[0];
    const { data } = await adminClient.query(query(mockUser.id));
    expect(data.createGuideFromUser.id).toBeTruthy();
    expect(data.createGuideFromUser.user.id).toEqual(mockUser.id);
    const mockGuide = await mockUser.guide;
    expect(mockGuide.id).toEqual(data.createGuideFromUser.id);
  });

  it("Prevents non admins from creating guides", async () => {
    const nonAdminClient = new TestClient(host);
    await nonAdminClient.createUser(true, AccountType.USER);
    await nonAdminClient.login();
    const mockUser = (await TestClient.createMockUsers(1))[0];
    const resp = await nonAdminClient.query(query(mockUser.id));
    expect(resp.data.createGuideFromUser).toBeNull();
    expect(resp.errors).toHaveLength(1);
    expect(resp.errors[0].message).toEqual(ApolloErrors.FORBIDDEN);
  });

  it("Allows me to query the new guide", async () => {
    const adminClient = new TestClient(host);
    await adminClient.createUser(true, AccountType.ADMIN);
    await adminClient.login();
    const mockUser = (await TestClient.createMockUsers(1))[0];
    const mockGuide = await adminClient.query(query(mockUser.id));
    const { data } = await adminClient.query(
      `{ guide(id: "${
        mockGuide.data.createGuideFromUser.id
      }") { id user { id } } }`
    );

    expect(data.guide).toBeTruthy();
    expect(data.guide.id).toEqual(mockGuide.data.createGuideFromUser.id);
    expect(data.guide.user.id).toEqual(mockUser.id);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
