import { isAdmin, isAuthenticated } from "../../rules";

export const permissions = {
  Query: {
    guide: isAuthenticated
  },
  Mutation: {
    createGuideFromUser: isAdmin
  }
};
