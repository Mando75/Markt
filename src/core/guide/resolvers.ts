import { ResolverMap } from "../../types/graphql-utils";
import { GraphQLContext } from "../../types/graphql-context";
import { Guide } from "../../entity/Guide";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    async guide(_: any, { id }: { id: string }, __: GraphQLContext) {
      return await Guide.findOne(id);
    }
  },
  Mutation: {
    async createGuideFromUser(
      _: any,
      { userId }: { userId: string },
      __: GraphQLContext
    ) {
      const user = await User.findOne(userId);
      if (user) {
        return await Guide.create({ user });
      }
    }
  }
};
