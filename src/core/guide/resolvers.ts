import { ResolverMap } from "../../types/graphql-utils";
import { createGuideFromUser, getGuide } from "./connectors";

export const resolvers: ResolverMap = {
  Query: {
    guide: getGuide
  },
  Mutation: {
    createGuideFromUser
  }
};
