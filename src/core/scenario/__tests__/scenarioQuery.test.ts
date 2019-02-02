import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { Scenario } from "../../../entity/Scenario";

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
    const scenarioDef = makeScenario();
    const scenario = new Scenario(scenarioDef);
    await Promise.all([scenario.save(), tc.createUserWithGuide()]);
    await Promise.all([scenario.reload(), tc.login()]);
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

const makeScenario = () => ({
  scenarioCode: faker.lorem.word(),
  maxPlayerSize: faker.random.number(),
  sessionCount: faker.random.number(),
  overview: [
    {
      sessionNumber: faker.random.number(),
      roleDescription: [
        {
          description: faker.lorem.sentence(),
          count: faker.random.number()
        }
      ],
      chartPoints: [faker.random.number(), faker.random.number()],
      expectations: faker.lorem.words()
    }
  ],
  description: faker.lorem.sentence(),
  instructions: [
    {
      step: faker.random.number(),
      header: faker.company.companyName(),
      bullets: [
        {
          format: ScenarioSchema.BulletFormat.BOLD,
          text: faker.lorem.sentence()
        }
      ]
    }
  ],
  roleDistribution: [faker.lorem.word()]
});
