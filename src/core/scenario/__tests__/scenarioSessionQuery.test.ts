import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { ScenarioSession } from "../../../entity/ScenarioSession";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("scenarioSessionQuery", () => {
  it("Queries a scenario session with all the right fields", async () => {
    const tc = new TestClient(host);
    const [{ scenario }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    await tc.login();
    const scenarioSessDef = {
      scenarioSessionId: faker.lorem.word(),
      sessionNumber: faker.random.number(),
      instructions: [
        {
          header: faker.lorem.words(),
          step: faker.random.number(),
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.ITALIC,
              text: faker.lorem.words()
            }
          ]
        }
      ],
      roundDiscussionPoints: [
        {
          header: faker.lorem.words(),
          step: faker.random.number(),
          bullets: [
            {
              format: ScenarioSchema.BulletFormat.NORMAL,
              text: faker.lorem.words()
            }
          ]
        }
      ],
      numberOfRounds: faker.random.number()
    };
    const ss = new ScenarioSession(scenarioSessDef);
    ss.scenario = Promise.resolve(scenario);
    await ss.save();
    await ss.reload();
    const { data } = await tc.query(
      `{ scenarioSession(id: "${
        ss.id
      }") { id scenarioSessionId sessionNumber instructions { header step bullets { format text } } roundDiscussionPoints { header step bullets { format text } } numberOfRounds } }`
    );
    expect(data).toBeTruthy();
    expect(data.scenarioSession).toMatchObject(scenarioSessDef);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
