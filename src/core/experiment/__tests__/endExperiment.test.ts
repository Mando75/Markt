import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { Experiment } from "../../../entity/Experiment";
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

const endExperiment = (experimentId: string) => `
mutation {
  endExperiment(experimentId: "${experimentId}") {
    id
    active
    endDate
    status
  }
}`;

describe("endExperiment", () => {
  it("catches an invalid experiment", async () => {
    const { tc } = await TestClient.scaffoldExperiment(host, false, false);
    const { errors } = await tc.query(endExperiment(faker.random.uuid()));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST
    );
  });

  it("updates active status and end date", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      false,
      false
    );
    const {
      data: { endExperiment: ee }
    } = await tc.query(endExperiment(experimentId));
    expect(ee).toBeTruthy();
    expect(ee.active).toBeFalsy();
    expect(ee.status).toEqual(ExperimentStatusEnum.CLOSED);
    expect(ee.endDate).toBeTruthy();
  });

  it("deactivates the sessions/rounds", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      false,
      true
    );
    const {
      data: { endExperiment: ee }
    } = await tc.query(endExperiment(experimentId));
    expect(ee).toBeTruthy();
    const experiment = await Experiment.findOne(experimentId);
    expect(experiment).toBeTruthy();
    if (experiment) {
      const sessions = await experiment.sessions;
      expect(sessions).toHaveLength(1);
      sessions.forEach(async s => {
        const rounds = await s.rounds;
        expect(rounds).toHaveLength(1);
        rounds.forEach(r => expect(r.active).toBeFalsy());
        expect(s.active).toBeFalsy();
      });
    }
  });

  it("deletes the player sessions from redis", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      true,
      false
    );
    const redis = TestClient.createRedisConnection();
    const sessionsP = await redis.lrange(
      `${RedisPrefix.PLAYER_SESSION}${experimentId}`,
      0,
      -1
    );
    expect(sessionsP).toHaveLength(4);
    const {
      data: { endExperiment: ee }
    } = await tc.query(endExperiment(experimentId));
    expect(ee).toBeTruthy();
    const sessionsA = await redis.lrange(
      `${RedisPrefix.PLAYER_SESSION}${experimentId}`,
      0,
      -1
    );
    expect(sessionsA).toHaveLength(0);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
