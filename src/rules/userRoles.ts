import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { GraphQLContext } from "../types/graphql-context";
import { AccountType } from "../enums/accountType.enum";
import { Guide } from "../entity/Guide";

export const isAuthenticated = rule()(
  async (_: any, __: any, context: GraphQLContext) => {
    const userId = context.session.userId;
    return !!(await User.findOne({ where: { id: userId }, select: ["id"] }));
  }
);

export const isAdmin = rule()(
  async (_: any, __: any, context: GraphQLContext) => {
    const userId = context.session.userId;
    const user = await User.findOne({
      where: { id: userId },
      select: ["id", "accountType"]
    });
    return user ? user.accountType === AccountType.ADMIN : false;
  }
);

export const isGuide = rule()(
  async (_: any, __: any, context: GraphQLContext) => {
    const userId = context.session.userId;
    const user = await User.findOne({ where: { id: userId }, select: ["id"] });
    const guide = await Guide.findOne({
      where: { user },
      select: ["id"]
    });
    return user ? !!guide : false;
  }
);
