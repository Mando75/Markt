import { ResolverMap } from "../../types/graphql-utils";
import { GraphQLContext } from "../../types/graphql-context";
import { Group } from "../../entity/Group";
import { Guide } from "../../entity/Guide";

export const resolvers: ResolverMap = {
  Query: {
    async group(
      _: any,
      { id }: GQL.IGroupOnQueryArguments,
      { loaders: { groupLoader } }: GraphQLContext
    ) {
      return groupLoader.load(id);
    }
  },
  Mutation: {
    async createGroup(
      _: any,
      { groupParams: { guideId, name } }: GQL.ICreateGroupOnMutationArguments,
      __: GraphQLContext
    ) {
      const guide = await Guide.findOne(guideId);
      const group = new Group();
      group.name = name;
      if (guide) {
        group.guide = Promise.resolve(guide);
      }
      return await group.save();
    }
  }
};
