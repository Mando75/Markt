import { rule } from "graphql-shield";
import { User } from "../entity/User";
import { Context } from "../types/context";
import { AccountType } from "../enums/accountType.enum";

export const isAdmin = rule()(async (_: any, __: any, context: Context) => {
  const userId = context.session.userId;
  const user = await User.findOne(userId);
  if (user) {
    return user.accountType === AccountType.ADMIN;
  }
  return false;
});
