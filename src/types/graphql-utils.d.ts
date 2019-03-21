import { GraphQLContext } from "./graphql-context";
import { GraphQLScalarType } from "graphql";
import { ResolverFn } from "graphql-tools/dist/stitching/makeRemoteExecutableSchema";

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
    | {
        [key: string]: {
          subscribe: ResolverFn;
        };
      }
    | GraphQLScalarType;
}
