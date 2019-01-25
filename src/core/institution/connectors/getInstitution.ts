import { GraphQLContext } from "../../../types/graphql-context";
import { Institution } from "../../../entity/Institution";

export const getInstitution = async (
  _: any,
  { id }: GQL.IInstitutionOnQueryArguments,
  __: GraphQLContext
) => {
  return await Institution.findOne(id);
};
