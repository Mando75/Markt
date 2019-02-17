import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("startExperiment", () => {
  const startExperiment = (
    guideId: string,
    groupId: string,
    scenarioId: string
  ) => `
  mutation {
     startNewExperiment(params: {
        guideId: "${guideId}",
        groupId: "${groupId}",
        scenarioId: "${scenarioId}" 
     }) {
       id
       guide {
         id
       }
       group {
         id
       }
       scenario {
         id
       }  
     }
   }  
  `;
  it("returns an error when an invalid guide is given", async () => {
    const tc = new TestClient(host);
    const [{ scenario }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    const [group] = await Promise.all([tc.createMockGroup(), tc.login()]);
    const { data, errors } = await tc.query(
      startExperiment(faker.random.uuid(), group.id, scenario.id)
    );
    expect(data.startNewExperiment).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].extensions.code).toBe("404");
    expect(errors[0].message).toEqual(
      "Invalid Guide: A valid guide ID must be provided"
    );
  });
  it("returns an error when an invalid scenario is given", async () => {
    const tc = new TestClient(host);
    const { guide } = await tc.createUserWithGuide();
    const [group] = await Promise.all([tc.createMockGroup(), tc.login()]);
    const { data, errors } = await tc.query(
      startExperiment(guide.id, group.id, faker.random.uuid())
    );
    expect(data.startNewExperiment).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].extensions.code).toBe("404");
    expect(errors[0].message).toEqual(
      "Invalid Scenario: A valid scenario ID must be provided"
    );
  });

  it("returns an error when an invalid group is given", async () => {
    const tc = new TestClient(host);
    const [{ scenario }, { guide }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    await tc.login();
    const { data, errors } = await tc.query(
      startExperiment(guide.id, faker.random.uuid(), scenario.id)
    );
    expect(data.startNewExperiment).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].extensions.code).toBe("404");
    expect(errors[0].message).toEqual(
      "Invalid Group: A valid group ID must be provided"
    );
  });

  it("makes a new experiment with the right relations", async () => {
    const tc = new TestClient(host);
    const [{ scenario }, { guide }] = await Promise.all([
      TestClient.createMockScenario(),
      tc.createUserWithGuide()
    ]);
    const [group] = await Promise.all([tc.createMockGroup(), tc.login()]);
    const {
      data: { startNewExperiment }
    } = await tc.query(startExperiment(guide.id, group.id, scenario.id));
    expect(startNewExperiment.id).toBeTruthy();
    expect(startNewExperiment.guide.id).toEqual(guide.id);
    expect(startNewExperiment.group.id).toEqual(group.id);
    expect(startNewExperiment.scenario.id).toEqual(scenario.id);
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
