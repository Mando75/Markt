import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { RoleType } from "../../../entity/RoleType";
import { ScenarioSession } from "../../../entity/ScenarioSession";
import { SessionRole } from "../../../entity/SessionRole";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("sessionRole", () => {
  it("queries session role with all the right fields", async () => {
    const tc = new TestClient(host);
    const [{ scenario }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    await tc.login();
    const rtDef = {
      name: faker.name.firstName(),
      roleTypeId: scenario.scenarioCode + "-" + faker.name.firstName()
    };
    const rt = RoleType.create(rtDef);
    rt.scenario = Promise.resolve(scenario);
    const scenarioSessDef = {
      scenarioSessionId: faker.lorem.word(),
      sessionNumber: faker.random.number(),
      instructions: TestClient.genInstructions(),
      roundDiscussionPoints: TestClient.genInstructions(),
      numberOfRounds: faker.random.number()
    };
    const ss = new ScenarioSession(scenarioSessDef);
    ss.scenario = Promise.resolve(scenario);
    await Promise.all([ss.save(), rt.save()]);
    const srDef = {
      sessionNumber: faker.random.number(),
      name: faker.name.firstName(),
      value: faker.random.number(),
      allowSell: true,
      instructions: TestClient.genInstructions(2),
      profitEquation: faker.lorem.word()
    };
    const sr = new SessionRole(srDef);
    sr.scenarioSession = Promise.resolve(ss);
    sr.roleType = Promise.resolve(rt);
    await sr.save();
    const { data } = await tc.query(`{ sessionRole(id: "${sr.id}") { id }}`);
    expect(data.sessionRole.id).toEqual(sr.id);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
