import { isAuthenticated } from "../../rules";

export const permissions = {
  Query: {
    guide: isAuthenticated
  },
  Mutation: {
    createGuideFromUser: isAuthenticated // TODO AND ISADMIN
  }
};
