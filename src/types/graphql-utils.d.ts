import { GraphQLContext } from "./graphql-context";
import { GraphQLScalarType } from "graphql";

export type Resolver = (
  parent: any,
  args: any,
  context: GraphQLContext,
  info: any
) => any;

export interface ResolverMap {
  [key: string]:
    | {
        [key: string]: Resolver;
      }
    | GraphQLScalarType;
}
