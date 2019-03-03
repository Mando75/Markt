import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { RoleType } from "../../../entity/RoleType";
import * as faker from "faker";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("RoleTypeQuery", () => {
  it("Queries a RoleType correctly", async () => {
    const tc = new TestClient(host);
    const [{ scenario, scenarioDef }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);

    await tc.login();
    const name = faker.name.firstName();
    const rtDef = {
      name,
      roleTypeId: scenarioDef.scenarioCode + "-" + name
    };
    const rt = RoleType.create(rtDef);
    rt.scenario = Promise.resolve(scenario);
    await rt.save();
    const { data } = await tc.query(
      `{ roleType(id: "${
        rt.id
      }") { id name roleTypeId createdDate updatedDate } }`
    );
    expect(data.roleType).toMatchObject(rtDef);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
