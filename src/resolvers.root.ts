import { ResolverMap } from "./types/graphql-utils";
import { User } from "./entity/User";

export const resolvers: ResolverMap = {
  Query: {
    me: async (_: any, __: any, { session }: { session: Express.Session }) => {
      console.log(session.userId);
      return await User.findOne({
        select: ["id", "email"],
        where: { id: session.userId }
      });
    }
  },
  Mutation: {}
};
