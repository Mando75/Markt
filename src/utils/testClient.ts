import * as rp from "request-promise";
import { User } from "../entity/User";
import { AccountType } from "../enums/accountType.enum";
import * as faker from "faker";

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

  async createUser(emailConfirmed: boolean) {
    this.fakeUser.emailConfirmed = emailConfirmed;
    this.testUser = await User.create(this.fakeUser).save();
    return this.testUser;
  }
}
