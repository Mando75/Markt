import { isAdmin, isAuthenticated } from "../../rules";

export const permissions = {
  Query: {
    institution: isAuthenticated
  },
  Mutation: {
    createInstitution: isAdmin
  }
};
