import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { GraphQLContext } from "../types/graphql-context";

export const isAuthenticated = rule()(
  async (_: any, __: any, context: GraphQLContext) => {
    const userId = context.session.userId;
    return !!(await User.findOne({ where: { id: userId }, select: ["id"] }));
  }
);
