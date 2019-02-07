import { AddressInfo } from "ws";
import { bootstrapConnections, normalizePort } from "../utils";
const nock = require("nock");
import { TestClient } from "./testClient";

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
