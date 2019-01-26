import { ResolverMap } from "../../types/graphql-utils";
import { GraphQLContext } from "../../types/graphql-context";
import { Guide } from "../../entity/Guide";
import { User } from "../../entity/User";
import { getGuide, getUserGuide } from "./connectors";

export const resolvers: ResolverMap = {
  User: {
    guide: getUserGuide
  },
  Query: {
    guide: getGuide
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
