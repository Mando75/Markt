import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";
import * as faker from "faker";
import { ApolloErrors } from "../../../enums/ApolloErrors";
import { ExperimentErrorMessages } from "../experimentErrorMessages";
import { Experiment } from "../../../entity/Experiment";
import { ExperimentStatusEnum } from "../../../enums/experimentStatus.enum";

let app: Server, db: Connection, host: string;

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
  }
});

describe("makeTransaction", () => {
  it("prevents non-players from making a transaction", async () => {
    const { experimentId, joinCode, tc } = await TestClient.scaffoldExperiment(
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
    console.log(joinCode);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toEqual(ApolloErrors.UNAUTHORIZED);
  });

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
});
afterAll(async () => {
  await teardownTestServer(app, db);
});
