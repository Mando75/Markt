import { GQLContext } from "./context";

export type Resolver = (
  parent: any,
  args: any,
  context: GQLContext,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
