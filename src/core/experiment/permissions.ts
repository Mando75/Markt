import { isAdmin, isGuide, isAuthenticated } from "../../rules";
import { allow, or } from "graphql-shield";
import { isPlayer } from "../../rules/userRoles";

export const permissions = {
  Query: {
    experiment: isAuthenticated
  },
  Mutation: {
    startNewExperiment: or(isGuide, isAdmin),
    joinExperiment: allow,
    startNextSession: or(isGuide, isAdmin),
    startNextRound: or(isGuide, isAdmin),
    makeTransaction: or(isPlayer, isAdmin),
    endCurrentRound: or(isGuide, isAdmin),
    endExperiment: or(isGuide, isAdmin)
  }
};
