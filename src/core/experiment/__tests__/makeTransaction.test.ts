import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";

let app: Server,
  db: Connection,
  host: string,
  experimentId: string,
  joinCode: string;

const startNextRound = (experimentId: string) => `
  mutation {
    startNextRound(experimentId: "${experimentId}") {
      id
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

const joinExperiment = (joinCode: string, playerCode: string) => `
  mutation {
    joinExperiment(params: {joinCode: "${joinCode}", playerCode: "${playerCode}"}) {
      id
    }
  } 
`;

const makeTransaction = (
  experimentId: string,
  buyerCode: string,
  sellerCode: string,
  amount: number
) => `
mutation {
  makeTransaction(params: { experimentId: "${experimentId}", buyerCode: "${buyerCode}", sellerCode: "${sellerCode}", amount: ${amount}}) {
  id
  }
}
`;
beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
    console.log(joinExperiment("asd", "asdf"));
  }
});

describe("makeTransaction", () => {
  const tc = new TestClient(host);
  beforeAll(async () => {
    let { experiment } = await tc.createAppleMarketExperimentAndGuide();
    experimentId = experiment.id;
    joinCode = experiment.joinCode;
    await tc.login();
    await tc.query(startNextSession(experimentId));
    await tc.query(startNextRound(experimentId));
  });

  it("prevents non-players from making a transaction", async () => {
    const { errors } = await tc.query(
      makeTransaction(
        experimentId,
        faker.random.word(),
        faker.random.word(),
        faker.random.number()
      )
    );
    console.log(errors);
    expect(errors).toBeTruthy();
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
