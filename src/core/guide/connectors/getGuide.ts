import { GraphQLContext } from "../../../types/graphql-context";
import { Guide } from "../../../entity/Guide";

export const getGuide = async (
  _: any,
  { id }: { id: string },
  __: GraphQLContext
) => {
  return await Guide.findOne(id);
};
