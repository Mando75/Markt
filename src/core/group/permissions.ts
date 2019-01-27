import { or } from "graphql-shield";
import { isGuide, isAdmin } from "../../rules";

export const permissions = {
  Query: {
    group: or(isGuide, isAdmin)
  },
  Mutation: {
    createGroup: or(isGuide, isAdmin)
  }
};
