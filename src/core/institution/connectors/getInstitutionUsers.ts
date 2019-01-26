import { Institution } from "../../../entity/Institution";
import { User } from "../../../entity/User";

export const getInstitutionUsers = async (
  parent: Institution,
  { id }: { id: string | undefined },
  __: any
) => {
  let scope = await parent.users;
  scope = id ? filterById(scope, id) : scope;

  return scope;
};

const filterById = (scope: User[], id: string) =>
  scope.filter((u: User) => u.id === id);
