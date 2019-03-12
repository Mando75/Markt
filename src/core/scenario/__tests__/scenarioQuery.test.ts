import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("scenarioQuery", () => {
  it("Queries a scenario with all the right fields", async () => {
    const tc = new TestClient(host);
    const [{ scenario, scenarioDef }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    await tc.login();
    expect(scenario).toMatchObject(scenarioDef);
    const { data } = await tc.query(
      `{ scenario (id: "${scenario.id}") { id scenarioCode } }`
    );
    expect(data.scenario.id).toEqual(scenario.id);
    expect(data.scenario.scenarioCode).toEqual(scenario.scenarioCode);
  });

  it("searches by code instead of id", async () => {
    const tc = new TestClient(host);
    const [{ scenario }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    await tc.login();
    const { data } = await tc.query(
      `{scenario(code: "${scenario.scenarioCode}") { id scenarioCode } }`
    );
    expect(data.scenario).toBeTruthy();
    expect(data.scenario.scenarioCode).toEqual(scenario.scenarioCode);
    expect(data.scenario.id).toEqual(scenario.id);
  });

  it("returns null if no id or code is given", async () => {
    const tc = new TestClient(host);
    await tc.createUserWithGuide();
    await tc.login();
    const { data } = await tc.query(`{scenario { id scenarioCode } }`);
    expect(data.scenario).toBeNull();
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
