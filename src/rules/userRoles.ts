import { rule } from "graphql-shield";
import { GraphQLContext, Session } from "../types/graphql-context";
import { AccountType } from "../enums/accountType.enum";
import { Guide } from "../entity/Guide";
import { AuthenticationError } from "apollo-server-express";
import { ApolloErrors } from "../enums/ApolloErrors";
import { User } from "../entity/User";
import { Player } from "../entity/Player";

/**
 * All of these checks should already be handled before
 * setting the context, but this is double reinforcement
 */
export const userExists = (user: User | undefined, session: Session) => {
  return !!user && user.active && user.id === session.userId;
};

/**
 * Mirror of user Exists except as player
 * @param player
 * @param session
 */
export const playerExists = (player: Player | undefined, session: Session) => {
  return !!player && player.active && player.id === session.playerId;
};

/**
 * Basic check if the user is logged in with an active user
 */
export const isAuthenticated = rule({ cache: "contextual" })(
  async (_: any, __: any, { user, session }: GraphQLContext) => {
    return (
      userExists(user, session) ||
      new AuthenticationError(ApolloErrors.UNAUTHORIZED)
    );
  }
);

/**
 * Basic check if user is type admin
 */
export const isAdmin = rule({ cache: "contextual" })(
  async (_: any, __: any, { user, session }: GraphQLContext) => {
    if (!user || !userExists(user, session)) {
      return new AuthenticationError(ApolloErrors.UNAUTHORIZED);
    }
    return user.accountType === AccountType.ADMIN
      ? true
      : new AuthenticationError(ApolloErrors.FORBIDDEN);
  }
);

/**
 * Basic check if the user has a Guide record
 */
export const isGuide = rule({ cache: "contextual" })(
  async (_: any, __: any, { user, session }: GraphQLContext) => {
    if (!user || !userExists(user, session)) {
      return new AuthenticationError(ApolloErrors.UNAUTHORIZED);
    }
    const guide = await Guide.findOne({
      where: { user },
      select: ["id"]
    });
    return !!guide ? true : new AuthenticationError(ApolloErrors.FORBIDDEN);
  }
);

export const isPlayer = rule({ cache: "contextual" })(
  async (_: any, __: any, { session, player }: GraphQLContext) => {
    if (!player || !playerExists(player, session)) {
      return new AuthenticationError(ApolloErrors.UNAUTHORIZED);
    }
    return true;
  }
);
