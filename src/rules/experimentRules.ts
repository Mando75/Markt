import { rule } from "graphql-shield";
import { GraphQLContext } from "../types/graphql-context";
import { userExists } from "./userRoles";
import { AuthenticationError } from "apollo-server-express";
import { ApolloErrors } from "../enums/ApolloErrors";
import { Experiment } from "../entity/Experiment";
import { AccountType } from "../enums/accountType.enum";

/**
 * Checks if the given user is a guide for the experiment.
 * Can only be used with
 */
export const isExperimentGuide = rule({ cache: "contextual" })(
  async (
    _: any,
    { experimentId }: { experimentId: string },
    { session, user }: GraphQLContext
  ) => {
    // Check the user exists on the session
    if (!user || !userExists(user, session)) {
      return new AuthenticationError(ApolloErrors.UNAUTHORIZED);
    }
    // If the experiment id doesn't match the one stored on the session,
    // check for admin privileges
    if (
      experimentId !== session.experimentId &&
      user.accountType !== AccountType.ADMIN
    ) {
      return new AuthenticationError(ApolloErrors.FORBIDDEN);
    }
    // Scope the experiment call the session user
    // guide and check it exists
    const guide = await user.guide;
    return (await Experiment.findOne({
      where: { id: experimentId, active: true, guide }
    }))
      ? true
      : new AuthenticationError(ApolloErrors.FORBIDDEN);
  }
);
