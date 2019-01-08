import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { Context } from "../types/context";

export const isAuthenticated = rule()(
  async (_: any, __: any, context: Context) => {
    const userId = context.session.userId;
    return !!(await User.findOne({ where: { id: userId }, select: ["id"] }));
  }
);
