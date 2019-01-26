import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { AccountType } from "../../../enums/accountType.enum";
import { Institution } from "../../../entity/Institution";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("createInstitution", () => {
  const query = (name: string) => `
    mutation {
      createInstitution(name: "${name}") {
        id
      }
    }
  `;

  let newInst: Institution;
  it("Prevents non admins from creating an institution", async () => {
    const nonAdminClient = new TestClient(host);
    await nonAdminClient.createUser(true, AccountType.USER);
    await nonAdminClient.login();
    const resp = await nonAdminClient.query(query("testInstitution"));
    expect(resp.data.createInstitution).toBeNull();
    expect(resp.errors).toHaveLength(1);
    expect(resp.errors[0].message).toEqual("Not Authorised!");
  });

  it("Allows admins to create a new institution", async () => {
    const adminClient = new TestClient(host);
    await adminClient.createUser(true, AccountType.ADMIN);
    await adminClient.login();
    const { data } = await adminClient.query(query("testInstitution"));
    expect(data.createInstitution.id).toBeTruthy();
    if (data.createInstitution) {
      newInst = data.createInstitution;
    }
  });

  it("Allows us to query a new institution", async () => {
    const tc = new TestClient(host);
    await tc.createUser(true);
    await tc.login();
    const { data } = await tc.query(
      `{ 
                institution(id: "${newInst.id}") { 
                  id
                  createdDate
                  users(id: "123") {
                    id
                  }
                }
              }`
    );
    expect(data.institution).toBeTruthy();
    expect(data.institution.id).toEqual(newInst.id);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
