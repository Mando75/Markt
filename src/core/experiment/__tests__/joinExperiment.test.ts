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

describe("joinExperiment.test", () => {
  const joinExperiment = (playerCode: string, joinCode: string) => `
    mutation {
      joinExperiment(params: { joinCode: "${joinCode}", playerCode: "${playerCode}" }) {
        id
        player {
          id
        }
        experiment {
          id
          players {
            id
          }
        }    
      }
    } 
  `;
  it("returns an error when an invalid player code is given", async () => {
    const tc = new TestClient(host);
    const [experiment] = await Promise.all([
      tc.createMockScenarioWithExperimentAndGuide()
    ]);
    const { data, errors } = await tc.query(
      joinExperiment("AAAAAA", experiment.joinCode)
    );
    console.log(data, errors);
    expect(data.joinExperiment).toBeNull();
    expect(errors).toHaveLength(1);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
