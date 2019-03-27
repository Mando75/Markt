import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { Experiment } from "../../../entity/Experiment";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("startNextSession", () => {
  const startNextSession = (experimentId: string) => `
    mutation {
      startNextSession(experimentId: "${experimentId}") {
        id
        experiment {
          id
          status
          activeSession {
            id
          }
        }
      }
    }
  `;

  const resetExperiment = async (experiment: Experiment) => {
    experiment.status = ExperimentStatusEnum.JOINING;
    await experiment.save();
  };
  it("handles a nonexistent experiment", async () => {
    const tc = new TestClient(host);
    await tc.createUserWithGuide();
    await tc.login();
    const { errors } = await tc.query(startNextSession(faker.random.uuid()));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST
    );
  });

  it("rejects starting a session when not joining or end of round", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    experiment.status = ExperimentStatusEnum.IN_ROUND;
    await Promise.all([tc.login(), experiment.save()]);
    const { errors } = await tc.query(startNextSession(experiment.id));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ExperimentErrorMessages.STATUS_NOT_READY);
  });

  it("rejects starting a session when the scenario is malformed", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    const sessions = (await experiment.scenario.scenarioSessions).map(s =>
      s.remove()
    );
    await Promise.all(sessions.concat([tc.login()]));
    const { errors: error1 } = await tc.query(startNextSession(experiment.id));
    expect(error1).toHaveLength(1);
    expect(error1[0].message).toEqual(
      ExperimentErrorMessages.MALFORMED_SCENARIO
    );
  });

  it("rejects when the scenario numbering is malformed", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    const sessions = (await experiment.scenario.scenarioSessions).map(s => {
      s.sessionNumber = 10;
      return s.save();
    });
    await Promise.all(sessions.concat([tc.login()]));
    const { errors: error1 } = await tc.query(startNextSession(experiment.id));
    expect(error1).toHaveLength(1);
    expect(error1[0].message).toEqual(
      ExperimentErrorMessages.MALFORMED_SCENARIO
    );
  });

  it("creates a new experiment session", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    const { data, errors } = await tc.query(startNextSession(experiment.id));
    console.log(errors);
    expect(data.startNextSession).toBeTruthy();
    expect(data.startNextSession.id).toBeTruthy();
  });

  it("rejects when max sessions have been used", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    await resetExperiment(experiment);
    await tc.query(startNextSession(experiment.id));
    await resetExperiment(experiment);
    const { errors } = await tc.query(startNextSession(experiment.id));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.MAX_SESSIONS_REACHED
    );
  });

  it("sets previous sessions to inactive", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    await resetExperiment(experiment);
    await tc.query(startNextSession(experiment.id));
    await experiment.reload();
    const sessions = await experiment.sessions;
    expect(sessions).toHaveLength(2);
    expect(sessions[0].active).toBeFalsy();
    expect(sessions[0].endDate).toBeTruthy();
    expect(sessions[1].active).toBeTruthy();
    expect(sessions[1].endDate).toBeFalsy();
  });

  it("sets the experiment status to SESSION_START", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    const { data } = await tc.query(startNextSession(experiment.id));
    await experiment.reload();
    expect(experiment.status).toEqual(ExperimentStatusEnum.SESSION_START);
    expect(data.startNextSession.experiment.status).toEqual(
      ExperimentStatusEnum.SESSION_START
    );
  });

  it("updates active session", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    const { data } = await tc.query(startNextSession(experiment.id));
    expect(data.startNextSession.id).toBeTruthy();
    expect(data.startNextSession.experiment).toBeTruthy();
    expect(data.startNextSession.experiment.id).toBeTruthy();
    expect(data.startNextSession.experiment.activeSession).toBeTruthy();
    expect(data.startNextSession.experiment.activeSession.id).toBeTruthy();
    expect(data.startNextSession.experiment.activeSession.id).toEqual(
      data.startNextSession.id
    );
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
