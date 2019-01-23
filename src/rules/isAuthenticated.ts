import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { GQLContext } from "../types/context";

export const isAuthenticated = rule()(
  async (_: any, __: any, context: GQLContext) => {
    const userId = context.session.userId;
    return !!(await User.findOne({ where: { id: userId }, select: ["id"] }));
  }
);
