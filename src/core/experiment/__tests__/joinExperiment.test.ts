import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { ExperimentErrorMessages } from "../experimentErrorMessages";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("joinExperiment", () => {
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
    expect(data.joinExperiment).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.PLAYER_DOES_NOT_EXIST
    );
  });

  it("returns an error when an invalid join code is given", async () => {
    const tc = new TestClient(host);
    await tc.createMockScenarioWithExperimentAndGuide();
    const group = await tc.createMockGroup();
    const players = await group.players;
    const { data, errors } = await tc.query(
      joinExperiment(players[0].playerCode, "AAAAAA")
    );
    expect(data.joinExperiment).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST
    );
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
