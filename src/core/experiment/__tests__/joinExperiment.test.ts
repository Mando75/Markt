import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { RedisPrefix } from "../../../enums/redisPrefix.enum";

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

  it("Does not allow a player to join once experiment is full", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    const group = await tc.createMockGroup(9);
    const players = await group.players;
    for (let i = 0; i < 8; i++) {
      await tc.query(
        joinExperiment(players[i].playerCode, experiment.joinCode)
      );
    }
    const { data, errors } = await tc.query(
      joinExperiment(players[8].playerCode, experiment.joinCode)
    );
    expect(data.joinExperiment).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_CLOSED
    );
  }, 50000);

  it("creates a new experiment player attached to the experiment record", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    const group = await tc.createMockGroup();
    const playerCode = (await group.players)[0].playerCode;
    const { data } = await tc.query(
      joinExperiment(playerCode, experiment.joinCode)
    );
    expect(data.joinExperiment).toBeTruthy();
    expect(data.joinExperiment.experiment.id).toEqual(experiment.id);
    expect(data.joinExperiment.player.id).toEqual((await group.players)[0].id);
    expect((await experiment.players).map(p => p.id)).toContain(
      data.joinExperiment.id
    );
  });

  it("creates a new session for the player in redis", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    const group = await tc.createMockGroup();
    const playerCode = (await group.players)[0].playerCode;
    const { data } = await tc.query(
      joinExperiment(playerCode, experiment.joinCode)
    );
    const redis = TestClient.createRedisConnection();
    const sessions = await redis.lrange(
      `${RedisPrefix.PLAYER_SESSION}${experiment.id}`,
      0,
      -1
    );
    expect(data.joinExperiment).toBeTruthy();
    expect(data.joinExperiment.experiment.id).toEqual(experiment.id);
    expect(data.joinExperiment.player.id).toEqual((await group.players)[0].id);
    expect((await experiment.players).map(p => p.id)).toContain(
      data.joinExperiment.id
    );
    expect(sessions).toHaveLength(1);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
