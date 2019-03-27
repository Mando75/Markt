import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { Round } from "../../../entity/Round";
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

describe("startNextRound", () => {
  const startNextRound = (experimentId: string) => `
  mutation {
    startNextRound(experimentId: "${experimentId}") {
      id
      session {
        id
        experiment {
          id
          status
          activeRound {
            id
          }
          activeSession {
            id
          }
        }
      }
    }
  }`;
  const startNextSession = (experimentId: string) => `
    mutation {
      startNextSession(experimentId: "${experimentId}") {
        id
        scenarioSession {
          id
          numberOfRounds
        }
      }
    }
  `;
  const resetExperiment = async (experiment: Experiment) => {
    experiment.status = ExperimentStatusEnum.SESSION_START;
    await experiment.save();
  };
  it("handles a nonexistent experiment", async () => {
    const tc = new TestClient(host);
    await tc.createUserWithGuide();
    await tc.login();
    const { errors } = await tc.query(startNextRound(faker.random.uuid()));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST
    );
  });

  it("rejects starting a round when not at start of session or end of round", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    experiment.status = ExperimentStatusEnum.IN_ROUND;
    await Promise.all([tc.login(), experiment.save()]);
    const { errors } = await tc.query(startNextRound(experiment.id));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ExperimentErrorMessages.STATUS_NOT_READY);
  });

  it("rejects when no active session is present", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    experiment.status = ExperimentStatusEnum.SESSION_START;
    await Promise.all([tc.login(), experiment.save()]);
    const { errors } = await tc.query(startNextRound(experiment.id));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.NO_ACTIVE_SESSION
    );
  });

  it("rejects when the session is out of rounds", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    await tc.query(startNextRound(experiment.id));
    await resetExperiment(experiment);
    await tc.query(startNextRound(experiment.id));
    await resetExperiment(experiment);
    const { errors } = await tc.query(startNextRound(experiment.id));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.MAX_ROUNDS_REACHED
    );
  });

  it("returns a new round", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    const { data } = await tc.query(startNextRound(experiment.id));
    expect(data).toBeTruthy();
    expect(data.startNextRound).toBeTruthy();
    expect(data.startNextRound.id).toBeTruthy();
  });

  it("deactivates previous rounds", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    const {
      data: {
        startNextRound: { id }
      }
    } = await tc.query(startNextRound(experiment.id));
    const round = (await Round.findOne(id)) as Round;
    expect(round).toBeTruthy();
    expect(round.active).toBeTruthy();
    await resetExperiment(experiment);
    await tc.query(startNextRound(experiment.id));
    await round.reload();
    expect(round.active).toBeFalsy();
  });

  it("updates experiment status", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    const { data } = await tc.query(startNextRound(experiment.id));
    expect(data).toBeTruthy();
    const round = data.startNextRound;
    expect(round).toBeTruthy();
    expect(round.id).toBeTruthy();
    expect(round.session).toBeTruthy();
    expect(round.session.experiment).toBeTruthy();
    expect(round.session.experiment.status).toBeTruthy();
    expect(round.session.experiment.status).toEqual(
      ExperimentStatusEnum.IN_ROUND
    );
  });

  it("updates the current round", async () => {
    const tc = new TestClient(host);
    const experiment = await tc.createMockScenarioWithExperimentAndGuide();
    await tc.login();
    await tc.query(startNextSession(experiment.id));
    const { data } = await tc.query(startNextRound(experiment.id));
    expect(data).toBeTruthy();
    const round = data.startNextRound;
    expect(round).toBeTruthy();
    expect(round.id).toBeTruthy();
    expect(round.session).toBeTruthy();
    expect(round.session.experiment).toBeTruthy();
    expect(round.session.experiment.activeRound).toBeTruthy();
    expect(round.session.experiment.activeRound.id).toBeTruthy();
    expect(round.session.experiment.activeRound.id).toEqual(round.id);
    expect(round.session.id).toEqual(round.session.experiment.activeSession.id);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
