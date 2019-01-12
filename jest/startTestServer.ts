import { TestClient } from "../src/utils";
import { AddressInfo } from "ws";
import {
  bootstrapConnections,
  normalizePort,
  CreateTypeORMConnection
} from "../src/utils";
const nock = require("nock");

const mockApis = () => {
  nock("https://api.sendgrid.com")
    .post("/v3/mail/send")
    .reply(200, {
      message: "success"
    });
};

export const startTestServer = async () => {
  mockApis();
  const resp = await bootstrapConnections(normalizePort(0));
  if (resp) {
    const app = resp.app;
    const db = resp.db;
    const { port } = app.address() as AddressInfo;
    TestClient.setEnv(port);
    const host = process.env.TEST_GRAPHQL_ENDPOINT as string;
    return { app, db, host };
  }
};

export const dropSchema = async () => {
  const queryRunner = (await CreateTypeORMConnection()).createQueryRunner();
  await queryRunner.dropSchema("public");
  await queryRunner.executeMemoryDownSql();
};
