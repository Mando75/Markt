import { GraphQLContext } from "../../../types/graphql-context";
import { Player } from "../../../entity/Player";

export const getPlayer = async (
  _: any,
  { id }: GQL.IPlayerOnQueryArguments,
  __: GraphQLContext
) => {
  return await Player.findOne(id, { cache: true });
};
