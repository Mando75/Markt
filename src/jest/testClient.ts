import * as rp from "request-promise";
import { User } from "../entity/User";
import { AccountType } from "../enums/accountType.enum";
import * as faker from "faker";
import { Guide } from "../entity/Guide";
import { Scenario } from "../entity/Scenario";
import { Group } from "../entity/Group";
import { Player } from "../entity/Player";
import * as IORedis from "ioredis";
import { Experiment } from "../entity/Experiment";
import { loadRoleDist } from "../core/experiment/connectors/startNewExperiment";
import { RoleType } from "../entity/RoleType";

export class TestClient {
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };
  fakeUser: {
    firstName: string;
    lastName: string;
    accountType: AccountType;
    email: string;
    password: string;
    emailConfirmed: boolean;
  };
  testUser: User | undefined;

  constructor(url: string) {
    this.url = url;
    this.options = {
      jar: rp.jar(),
      withCredentials: true,
      json: true
    };
    this.fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      accountType: AccountType.USER,
      email: faker.internet.exampleEmail().toLowerCase(),
      password: faker.internet.password(8, false) + "@Aa1",
      emailConfirmed: false
    };
  }

  static setEnv(port: number) {
    process.env.TEST_HOST = `http://localhost:${port}`;
    process.env.TEST_GRAPHQL_ENDPOINT = `http://localhost:${port}/graphql`;
  }

  async register(
    confirmEmail: boolean,
    user?: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }
  ) {
    if (!user) user = this.fakeUser;
    const resp = await rp.post(this.url, {
      ...this.options,
      body: {
        query: `mutation {
                  registerUser(user: {
                    firstName: "${user.firstName}",
                    lastName: "${user.lastName}",
                    password: "${user.password}",
                    email: "${user.email}"
                  }) {
                    message
                    path
                  }
                }`
      }
    });
    this.testUser = await User.findOne({ email: user.email });
    if (confirmEmail) {
      if (this.testUser) {
        this.testUser.emailConfirmed = true;
        await this.testUser.save();
      }
    }
    return resp;
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          logout
        }
        `
      }
    });
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          {
            me {
              id
              email
            }
          }
        `
      }
    });
  }

  async login(email?: string, password?: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
        mutation {
          login(user: { email: "${
            email ? email : this.fakeUser.email
          }", password: "${password ? password : this.fakeUser.password}" }) {
            path
            message
          }
        }
        `
      }
    });
  }

  async query(query: string) {
    return rp.post(this.url, { ...this.options, body: { query } });
  }

  async createUser(
    emailConfirmed: boolean,
    accountType: AccountType = AccountType.USER
  ) {
    this.fakeUser.emailConfirmed = emailConfirmed;
    this.fakeUser.accountType = accountType;
    this.testUser = await User.create(this.fakeUser).save();
    return this.testUser;
  }

  async createUserWithGuide() {
    const user = await this.createUser(true);
    const guide = new Guide();
    guide.user = user;
    await guide.save();
    if (this.testUser) {
      await this.testUser.reload();
    }
    return { user, guide };
  }

  static createRedisConnection() {
    return new IORedis(process.env.REDIS_URL + "/1");
  }
  static async createMockUsers(count: number) {
    let users: User[] = [];
    for (let i = 0; i < count; i++) {
      const fakeUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        accountType: AccountType.USER,
        email: faker.internet.exampleEmail().toLowerCase(),
        password: faker.internet.password(8, false) + "@Aa1",
        emailConfirmed: true
      };
      users.push(await User.create(fakeUser).save());
    }
    return users;
  }

  async createMockGroup(playerCount: number = 1) {
    if (!this.testUser) {
      throw new Error("Must first create a test user");
    }
    const guide = await this.testUser.guide;
    const group = Group.create();
    group.name = faker.company.companyName();
    group.guide = Promise.resolve(guide);
    await group.save();
    for (let i = 0; i < playerCount; i++) {
      const fakePlayer = {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
      };
      const p = Player.create(fakePlayer);
      p.guide = Promise.resolve(guide);
      p.group = group;
      await p.save();
    }
    return group;
  }

  static async createMockScenario() {
    const scen = this._genScenario();
    const newScen = await Scenario.create(scen).save();
    const roleTypes = scen.roleDistribution.map(async rd => {
      const rt = RoleType.create({
        roleTypeId: rd,
        name: faker.random.word()
      });
      rt.scenario = Promise.resolve(newScen);
      return await rt.save();
    });
    return {
      scenario: newScen,
      scenarioDef: scen,
      roleTypes
    };
  }

  async createMockScenarioWithExperimentAndGuide() {
    const { guide } = await this.createUserWithGuide();
    const [{ scenario }, group] = await Promise.all([
      TestClient.createMockScenario(),
      this.createMockGroup()
    ]);

    const experiment = new Experiment();
    experiment.scenario = scenario;
    experiment.guide = Promise.resolve(guide);
    experiment.group = Promise.resolve(group);
    await experiment.save();
    await loadRoleDist(experiment, TestClient.createRedisConnection());
    return experiment;
  }

  static _genScenario() {
    return {
      name: faker.lorem.word(),
      scenarioCode: faker.random.uuid().substring(0, 9),
      maxPlayerSize: 8,
      sessionCount: faker.random.number(),
      overview: [
        {
          sessionNumber: faker.random.number(),
          roleDescription: [
            {
              description: faker.lorem.sentence(),
              count: faker.random.number()
            }
          ],
          chartPoints: [[[faker.random.number(), faker.random.number()]]],
          expectations: faker.lorem.words()
        }
      ],
      description: faker.lorem.sentence(),
      instructions: this.genInstructions(),
      roleDistribution: Array(8)
        .fill(0)
        .map(() => faker.random.uuid())
    };
  }

  static genInstructions(length = 1) {
    const i: Array<ScenarioSchema.Instructions> = [];
    for (let k = 0; k < length; k++) {
      i.push({
        step: faker.random.number(),
        header: faker.company.companyName(),
        bullets: [
          {
            format: ScenarioSchema.BulletFormat.BOLD,
            text: faker.lorem.sentence()
          }
        ]
      });
    }
    return i;
  }
}
