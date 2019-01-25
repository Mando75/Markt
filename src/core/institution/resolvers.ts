import { ResolverMap } from "../../types/graphql-utils";
import { createInstitution, getInstitution } from "./connectors";

export const resolvers: ResolverMap = {
  Query: {
    institution: getInstitution
  },
  Mutation: {
    createInstitution
  }
};
