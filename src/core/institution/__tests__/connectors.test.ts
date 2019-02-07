import "reflect-metadata";
import { CreateTypeORMConnection } from "../../../utils";
import { getInstitution, getInstitutionUsers } from "../connectors";
import { Institution } from "../../../entity/Institution";
import * as faker from "faker";
import { TestClient } from "../../../jest";
import { User } from "../../../entity/User";

beforeAll(async () => {
  await CreateTypeORMConnection();
});

describe("connectors", () => {
  it("Gets the right institution", async () => {
    const inst = await Institution.create({
      name: faker.company.companyName()
    }).save();
    const resp = await getInstitution("", { id: inst.id }, "");
    expect(resp).toEqual(inst);
  });

  it("Gets all of the institutions users", async () => {
    const instUsers = await TestClient.createMockUsers(2);
    const inst = await Institution.create({
      name: faker.company.companyName()
    });
    inst.users = Promise.resolve(instUsers);
    await inst.save();
    const nonInstUsers = await TestClient.createMockUsers(2);
    const resp = await getInstitutionUsers(inst, { id: undefined }, "");
    expect(resp).toEqual(instUsers);
    nonInstUsers.forEach((u: User) => {
      expect(resp).not.toContain(u);
    });
  });

  it("Scopes the institution users by id", async () => {
    const instUsers = await TestClient.createMockUsers(2);
    const inst = await Institution.create({
      name: faker.company.companyName()
    });
    inst.users = Promise.resolve(instUsers);
    await inst.save();
    const resp = await getInstitutionUsers(inst, { id: instUsers[0].id }, "");
    expect(resp).toHaveLength(1);
    expect(resp[0]).toEqual(instUsers[0]);
  });
});
