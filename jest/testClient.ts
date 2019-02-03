import * as rp from "request-promise";
import { User } from "../src/entity/User";
import { AccountType } from "../src/enums/accountType.enum";
import * as faker from "faker";
import { Guide } from "../src/entity/Guide";
import { Scenario } from "../src/entity/Scenario";

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
    guide.user = Promise.resolve(user);
    await guide.save();
    return { user, guide };
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

  static async createMockScenario() {
    const scen = this._genScenario();
    const toSave = new Scenario(scen);
    await toSave.save();
    return {
      scenario: toSave,
      scenarioDef: scen
    };
  }

  static _genScenario() {
    return {
      scenarioCode: faker.lorem.word().substring(0, 9),
      maxPlayerSize: faker.random.number(),
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
          chartPoints: [faker.random.number(), faker.random.number()],
          expectations: faker.lorem.words()
        }
      ],
      description: faker.lorem.sentence(),
      instructions: this.genInstructions(),
      roleDistribution: [faker.lorem.word()]
    };
  }

  static genInstructions(length = 1) {
    const i = [];
    for (let k = 0; k < length; k++) {
      i.push({
        step: faker.random.number(),
        header: faker.company.companyName(),
        bullets: [
          {
            // @ts-ignore
            format: ScenarioSchema.BulletFormat.BOLD,
            text: faker.lorem.sentence()
          }
        ]
      });
    }
    return i;
  }
}
