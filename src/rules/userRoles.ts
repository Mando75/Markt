import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { GraphQLContext } from "../types/graphql-context";
import { AccountType } from "../enums/accountType.enum";
import { Guide } from "../entity/Guide";
import { AuthenticationError } from "apollo-server-express";
import { ApolloErrors } from "../enums/ApolloErrors";

export const isAuthenticated = rule()(
  async (_: any, __: any, { session: { userId } }: GraphQLContext) => {
    return !!(
      userId && (await User.findOne({ where: { id: userId }, select: ["id"] }))
    )
      ? true
      : new AuthenticationError(ApolloErrors.UNAUTHORIZED);
  }
);

export const isAdmin = rule()(
  async (_: any, __: any, { session: { userId } }: GraphQLContext) => {
    if (!userId) {
      return new AuthenticationError(ApolloErrors.UNAUTHORIZED);
    }
    const user = await User.findOne({
      where: { id: userId },
      select: ["id", "accountType"]
    });
    return user
      ? user.accountType === AccountType.ADMIN
        ? true
        : new AuthenticationError(ApolloErrors.FORBIDDEN)
      : new AuthenticationError(ApolloErrors.UNAUTHORIZED);
  }
);

export const isGuide = rule()(
  async (_: any, __: any, { session: { userId } }: GraphQLContext) => {
    if (!userId) {
      new AuthenticationError(ApolloErrors.FORBIDDEN);
    }
    const user = await User.findOne({ where: { id: userId }, select: ["id"] });
    const guide = await Guide.findOne({
      where: { user },
      select: ["id"]
    });
    return user
      ? !!guide
        ? true
        : new AuthenticationError(ApolloErrors.FORBIDDEN)
      : new AuthenticationError(ApolloErrors.UNAUTHORIZED);
  }
);
