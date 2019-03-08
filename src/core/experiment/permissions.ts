import {
  isAdmin,
  isGuide,
  isAuthenticated,
  isExperimentGuide
} from "../../rules";
import { allow, or } from "graphql-shield";

export const permissions = {
  Query: {
    experiment: isAuthenticated
  },
  Mutation: {
    startNewExperiment: or(isGuide, isAdmin),
    joinExperiment: allow,
    startNextSession: or(isExperimentGuide, isAdmin),
    startNextRound: or(isExperimentGuide, isAdmin)
  }
};
