import { Context } from "./context";
import { GraphQLScalarType } from "graphql";

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]:
    | {
        [key: string]: Resolver;
      }
    | GraphQLScalarType;
}
