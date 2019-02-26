import { ResolverMap } from "./types/graphql-utils";
import { GraphQLScalarType, Kind } from "graphql";
import { GraphQLContext } from "./types/graphql-context";

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
    me: (_: any, __: any, { user }: GraphQLContext) => {
      return user;
    }
  },
  Mutation: {}
};
