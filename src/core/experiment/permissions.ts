import { isAdmin, isGuide, isAuthenticated } from "../../rules";
import { allow, or } from "graphql-shield";

export const permissions = {
  Query: {
    experiment: isAuthenticated
  },
  Mutation: {
    startNewExperiment: or(isGuide, isAdmin),
    joinExperiment: allow
  }
};
