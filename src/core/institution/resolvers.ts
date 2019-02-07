import { ResolverMap } from "../../types/graphql-utils";
import {
  getInstitutionUsers,
  createInstitution,
  getInstitution
} from "./connectors";

export const resolvers: ResolverMap = {
  Query: {
    institution: getInstitution
  },
  Mutation: {
    createInstitution
  },
  Institution: {
    users: getInstitutionUsers
  }
};
