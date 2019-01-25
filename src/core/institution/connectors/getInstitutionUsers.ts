import { GraphQLContext } from "../../../types/graphql-context";
import { Institution } from "../../../entity/Institution";
import { User } from "../../../entity/User";

export const getInstitutionUsers = async (
  parent: Institution,
  { id }: { id: string },
  __: GraphQLContext
) => {
  let scope = await User.find({ where: { institution: parent } });
  scope = id ? filterById(scope, id) : scope;

  return scope;
};

const filterById = (scope: User[], id: string) =>
  scope.filter((u: User) => u.id === id);
