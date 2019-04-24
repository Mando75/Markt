import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import * as faker from "faker";
import { Experiment } from "../../../entity/Experiment";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";

let app: Server, db: Connection, host: string;

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

const transactionAmount = 20;
const transactionAmount2 = 30;
const makeTransaction = (
  experimentId: string,
  buyerCode: string,
  sellerCode: string,
  amount: number
) => `
mutation {
  makeTransaction(params: { experimentId: "${experimentId}", buyerCode: "${buyerCode}", sellerCode: "${sellerCode}", amount: ${amount}}) {
  id
  amount
  }
}
`;

const endCurrentRound = (experimentId: string) => `
mutation {
  endCurrentRound(experimentId: "${experimentId}") {
    roundSummary {
      numTransactions
      averagePrice
      maxPrice
      minPrice
      transactions {
        id
      }
    }
  }
}`;
describe("endCurrentRound", () => {
  it("catches an invalid experiment id", async () => {
    const { tc } = await TestClient.scaffoldExperiment(host, false, false);
    const { errors } = await tc.query(endCurrentRound(faker.random.uuid()));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST
    );
  });

  it("catches bad experiment status", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      false,
      false
    );
    const { errors } = await tc.query(endCurrentRound(experimentId));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ExperimentErrorMessages.STATUS_NOT_READY);
  });

  it("catches no active round", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      false,
      false
    );
    const experiment = await Experiment.findOne(experimentId);
    expect(experiment).toBeTruthy();
    if (experiment) {
      experiment.status = ExperimentStatusEnum.IN_ROUND;
      await experiment.save();
    }
    const { errors } = await tc.query(endCurrentRound(experimentId));
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ExperimentErrorMessages.NO_ACTIVE_ROUND);
  });

  it("updates the experiment status", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      false,
      true
    );
    const { data } = await tc.query(endCurrentRound(experimentId));
    const experiment = await Experiment.findOne(experimentId);
    expect(experiment).toBeTruthy();
    if (experiment)
      expect(experiment.status).toEqual(ExperimentStatusEnum.ROUND_SUMMARY);
    expect(data).toBeTruthy();
  });

  it("updates the round status", async () => {
    const { tc, experimentId } = await TestClient.scaffoldExperiment(
      host,
      false,
      true
    );
    const experiment = await Experiment.findOne(experimentId);
    expect(experiment).toBeTruthy();
    const round = experiment ? await experiment.getActiveRound() : null;
    expect(round).toBeTruthy();
    const { data } = await tc.query(endCurrentRound(experimentId));
    expect(data).toBeTruthy();
    if (round) {
      await round.reload();
      expect(round.active).toBeFalsy();
      expect(round.endDate).toBeTruthy();
    }
  });

  it("returns back the right data", async () => {
    const {
      tc,
      experimentId,
      buyer,
      seller
    } = await TestClient.scaffoldExperiment(host, true, true);
    await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        transactionAmount
      )
    );
    await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        transactionAmount2
      )
    );
    const { data } = await tc.query(endCurrentRound(experimentId));
    expect(data).toBeTruthy();
    expect(data.endCurrentRound).toBeTruthy();
    expect(data.endCurrentRound.roundSummary).toBeTruthy();
    expect(data.endCurrentRound.roundSummary.minPrice).toEqual(
      transactionAmount
    );
    expect(data.endCurrentRound.roundSummary.maxPrice).toEqual(
      transactionAmount2
    );
    expect(data.endCurrentRound.roundSummary.averagePrice).toEqual(
      (transactionAmount + transactionAmount2) / 2
    );
    expect(data.endCurrentRound.roundSummary.numTransactions).toEqual(2);
  }, 60000);
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
