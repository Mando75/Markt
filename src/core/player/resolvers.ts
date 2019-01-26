import { ResolverMap } from "../../types/graphql-utils";
import { createPlayer, getPlayer } from "./connectors";

export const resolvers: ResolverMap = {
  Query: {
    player: getPlayer
  },
  Mutation: {
    createPlayer
  }
};
