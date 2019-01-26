import "reflect-metadata";
import {
  startTestServer,
  teardownTestServer,
  TestClient
} from "../../../../jest";
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

describe("createPlayer", () => {
  const query = (guideId: string, groupId: string = "") => `
    mutation {
      createPlayer(playerParams: { 
        firstName: "${faker.name.firstName()}", 
        lastName: "${faker.name.lastName()}",
        email: "${faker.internet.email()}",
        guideId: "${guideId}"
        ${groupId ? ',groupId: "' + groupId + '"' : ""}
      }) {
        id
      }
    }
  `;

  it("Allows guides to create a player with no group", async () => {
    const tc = new TestClient(host);
    const { guide } = await tc.createUserWithGuide();
    await tc.login();
    const { data } = await tc.query(query(guide.id));
    expect(data.createPlayer.id).toBeTruthy();
  });

  it("Catches bad guide id's", async () => {
    const tc = new TestClient(host);
    await tc.createUserWithGuide();
    await tc.login();
    const { data, errors } = await tc.query(query(faker.random.uuid()));
    expect(data.createPlayer).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].extensions.code).toEqual("BAD_USER_INPUT");
    expect(errors[0].message).toEqual("Invalid guide: Guide does not exist");
  });

  it("catches other bad input", async () => {
    const tc = new TestClient(host);
    await tc.createUserWithGuide();
    await tc.login();
    const { data, errors } = await tc.query(
      query(faker.random.uuid(), "BADUUID")
    );
    expect(data.createPlayer).toBeNull();
    expect(errors).toHaveLength(1);
    expect(errors[0].extensions.code).toEqual("BAD_USER_INPUT");
    expect(errors[0].message).toEqual("Invalid parameter");
  });
});

afterAll(async () => {
  await teardownTestServer(app, db);
});
