import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { AccountType } from "../../../enums/accountType.enum";
import * as faker from "faker";
import { Guide } from "../../../entity/Guide";
import { User } from "../../../entity/User";
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

describe("createGroup", () => {
  const createGroupQuery = (guideId: string) => `
  mutation {
    createGroup(groupParams: { name: "${faker.company.companyName()}", guideId: "${guideId}" }) {
      id
      guide {
        id
      }
    }
  }
  `;

  it("Prevents non guides/admins from creating groups", async () => {
    const tc = new TestClient(host);
    await tc.createUser(true);
    await tc.login();
    const { data, errors } = await tc.query(
      createGroupQuery(faker.random.uuid())
    );
    expect(data.createGroup).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ApolloErrors.FORBIDDEN);
  });

  it("Allows admins to create a group", async () => {
    const adminClient = new TestClient(host);
    await adminClient.createUser(true, AccountType.ADMIN);
    await adminClient.login();
    const guide = new Guide();
    guide.user = Promise.resolve(adminClient.testUser as User);
    await guide.save();

    const { data } = await adminClient.query(createGroupQuery(guide.id));
    expect(data.createGroup).toBeTruthy();
    expect(data.createGroup.guide.id).toEqual(guide.id);
  });

  it("Allows guides to create new groups", async () => {
    const tc = new TestClient(host);
    const { guide } = await tc.createUserWithGuide();
    await tc.login();
    const { data } = await tc.query(createGroupQuery(guide.id));
    expect(data.createGroup).toBeTruthy();
    expect(data.createGroup.guide.id).toEqual(guide.id);
  });

  it("allows guides to query created groups from their record", async () => {
    const tc = new TestClient(host);
    const { guide } = await tc.createUserWithGuide();
    await tc.login();
    await tc.query(createGroupQuery(guide.id));
    const groups = await guide.groups;
    const query = `
      {
        group(id: "${groups[0].id}") {
          id
          guide {
            id
          }  
        }
      }
    `;

    const { data } = await tc.query(query);
    expect(data.group.id).toEqual(groups[0].id);
    expect(data.group.guide.id).toEqual(guide.id);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
