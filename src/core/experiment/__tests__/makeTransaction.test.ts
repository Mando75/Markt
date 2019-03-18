import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { ApolloErrors } from "../../../enums/ApolloErrors";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { Experiment } from "../../../entity/Experiment";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";
import { ExperimentPlayer } from "../../../entity/ExperimentPlayer";

let app: Server, db: Connection, host: string;
const transactionAmount = 20;

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

beforeAll(async () => {
  const setup = await startTestServer();
  if (setup) {
    app = setup.app;
    db = setup.db;
    host = setup.host;
  }
});

describe("makeTransaction", () => {
  it("prevents non-players from making a transaction", async () => {
    const { experimentId, tc } = await TestClient.scaffoldExperiment(
      host,
      false,
      false
    );
    const { errors } = await tc.query(
      makeTransaction(
        experimentId,
        faker.random.word(),
        faker.random.word(),
        faker.random.number()
      )
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ApolloErrors.UNAUTHORIZED);
  }, 6000);

  it("fails with invalid experiment id", async () => {
    const { buyer, seller } = await TestClient.scaffoldExperiment(
      host,
      true,
      false
    );
    const { errors } = await seller.client.query(
      makeTransaction(
        faker.random.uuid(),
        buyer.playerCode,
        seller.playerCode,
        faker.random.number()
      )
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.EXPERIMENT_DOES_NOT_EXIST
    );
  });

  it("fails when experiment status is not ready for transactions", async () => {
    const { buyer, seller, experimentId } = await TestClient.scaffoldExperiment(
      host,
      true,
      false
    );
    const { errors } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        faker.random.number()
      )
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ExperimentErrorMessages.STATUS_NOT_READY);
  });

  it("fails when experiment round is not in progress", async () => {
    const { experimentId, buyer, seller } = await TestClient.scaffoldExperiment(
      host,
      true,
      false
    );
    const expe = await Experiment.findOne(experimentId);
    if (expe) {
      expe.status = ExperimentStatusEnum.IN_ROUND;
      await expe.save();
    }
    const { errors } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        faker.random.number()
      )
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ExperimentErrorMessages.STATUS_NOT_READY);
  });

  it("fails when buyer does not exist", async () => {
    const { seller, experimentId } = await TestClient.scaffoldExperiment(
      host,
      true,
      true
    );
    const { errors } = await seller.client.query(
      makeTransaction(
        experimentId,
        faker.random.word(),
        seller.playerCode,
        faker.random.number()
      )
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.PLAYER_DOES_NOT_EXIST
    );
  });

  it("fails when seller does not exist", async () => {
    const { seller, experimentId, buyer } = await TestClient.scaffoldExperiment(
      host,
      true,
      true
    );
    const { errors } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        faker.random.word(),
        faker.random.number()
      )
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(
      ExperimentErrorMessages.PLAYER_DOES_NOT_EXIST
    );
  });

  it("Posts a transaction with the right amount", async () => {
    const { seller, experimentId, buyer } = await TestClient.scaffoldExperiment(
      host,
      true,
      true
    );
    const {
      data: { makeTransaction: data },
      errors
    } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        transactionAmount
      )
    );
    expect(data.id).toBeTruthy();
    expect(data.amount).toEqual(transactionAmount);
    expect(errors).toBeUndefined();
  });

  it("Updates the number of transactions and profit on the buyer", async () => {
    const { seller, experimentId, buyer } = await TestClient.scaffoldExperiment(
      host,
      true,
      true
    );
    const {
      data: { makeTransaction: resp }
    } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        transactionAmount
      )
    );
    const b = await ExperimentPlayer.findOne(buyer.id);
    expect(b).toBeTruthy();
    if (b) {
      const profit = await b.getProfit(transactionAmount);
      expect(b.totalProfit).toEqual(profit);
      expect(b.numTransactions).toEqual(1);
    }
    expect(resp.id).toBeTruthy();
  });

  it("Updates the number of transactions and profit on the seller", async () => {
    const { seller, experimentId, buyer } = await TestClient.scaffoldExperiment(
      host,
      true,
      true
    );
    const {
      data: { makeTransaction: resp }
    } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        transactionAmount
      )
    );
    const s = await ExperimentPlayer.findOne(seller.id);
    expect(s).toBeTruthy();
    if (s) {
      const profit = await s.getProfit(transactionAmount);
      expect(s.totalProfit).toEqual(profit);
      expect(s.numTransactions).toEqual(1);
    }
    expect(resp.id).toBeTruthy();
  });

  it("updates the round record with number of transactions and average price", async () => {
    const { seller, experimentId, buyer } = await TestClient.scaffoldExperiment(
      host,
      true,
      true
    );
    const {
      data: { makeTransaction: resp }
    } = await seller.client.query(
      makeTransaction(
        experimentId,
        buyer.playerCode,
        seller.playerCode,
        transactionAmount
      )
    );
    expect(resp).toBeTruthy();
    const exp = await Experiment.findOne(experimentId);
    expect(exp).toBeTruthy();
    const round = exp ? await exp.getActiveRound() : null;
    expect(round).toBeTruthy();
    if (round) {
      expect(round.numTransactions).toEqual(1);
      expect(round.averagePrice).toEqual(transactionAmount);
    }
  });
});
afterAll(async () => {
  await teardownTestServer(app, db);
});
