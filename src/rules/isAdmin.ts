import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { GraphQLContext } from "../types/graphql-context";
import { AccountType } from "../enums/accountType.enum";

export const isAdmin = rule()(
  async (_: any, __: any, context: GraphQLContext) => {
    const userId = context.session.userId;
    const user = await User.findOne(userId);
    if (user) {
      return user.accountType === AccountType.ADMIN;
    }
    return false;
  }
);
