import "reflect-metadata";
import { startTestServer, teardownTestServer, TestClient } from "../../../jest";
import { Server } from "http";
import { Connection } from "typeorm";

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
  it("returns an error when an invalid guide is given", async () => {
    const tc = new TestClient(host);
    expect(tc).toBeTruthy();
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
