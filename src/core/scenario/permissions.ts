import { isAdmin, isGuide } from "../../rules";
import { or } from "graphql-shield";

export const permissions = {
  Query: {
    scenario: or(isGuide, isAdmin)
  }
};
