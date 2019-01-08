import { TestClient } from "../src/utils";
import { AddressInfo } from "ws";
import { Server } from "http";
import { bootstrapConnections, normalizePort } from "../src/utils";
import { Connection } from "typeorm";
const nock = require("nock");

export let app: Server;
export let db: Connection;

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
    app = resp.app;
    const { port } = app.address() as AddressInfo;
    TestClient.setEnv(port);
    db = resp.db;
  }
};
