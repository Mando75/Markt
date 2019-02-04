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
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
