import { and } from "graphql-shield";
import { isAdmin, isAuthenticated } from "../../rules";

export const permissions = {
  Query: {
    institution: isAuthenticated
  },
  Mutation: {
    createInstitution: and(isAuthenticated, isAdmin)
  }
};
