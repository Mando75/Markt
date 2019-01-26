import { ResolverMap } from "../../types/graphql-utils";
import { GraphQLContext } from "../../types/graphql-context";
import { Guide } from "../../entity/Guide";
import { User } from "../../entity/User";
import { getGuide } from "./connectors";

export const resolvers: ResolverMap = {
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
        const guide = new Guide();
        guide.user = Promise.resolve(user);
        return await guide.save();
      }
    }
  }
};
