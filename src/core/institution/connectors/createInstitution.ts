import { GraphQLContext } from "../../../types/graphql-context";
import { Institution } from "../../../entity/Institution";

export const createInstitution = async (
  _: any,
  { name }: { name: string },
  __: GraphQLContext
) => {
  return await Institution.create({
    name,
    active: true
  }).save();
};
