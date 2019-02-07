import { ResolverMap } from "./types/graphql-utils";
import { User } from "./entity/User";
import { GraphQLScalarType, Kind } from "graphql";

export const resolvers: ResolverMap = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom Scalar type",
    parseValue(val) {
      return new Date(val);
    },
    serialize(val) {
      return val.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    me: async (_: any, __: any, { session }: { session: Express.Session }) => {
      return await User.findOne({
        select: ["id", "email"],
        where: { id: session.userId }
      });
    }
  },
  Mutation: {}
};
