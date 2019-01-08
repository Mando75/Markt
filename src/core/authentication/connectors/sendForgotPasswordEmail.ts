import { Context } from "../../../types/context";
import { User } from "../../../entity/User";
import { ErrorMessages } from "../errorMessages";
import { createForgotPasswordLink, deleteSessions, getSessionIds } from "./lib";
import { sendGridForgotPasswordEmail } from "../../../utils/sendEmail";

export const sendForgotPasswordEmail = async (
  _: any,
  { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
  { redis }: Context
) => {
  const user = (await User.findOne({ email })) as User;
  if (!user) {
    return [
      {
        path: "email",
        message: ErrorMessages.INVALID_LOGIN
      }
    ];
  }
  // Create link and retrieve session Ids
  const [link, sessionIds] = await Promise.all([
    createForgotPasswordLink("", user.id, redis),
    getSessionIds(redis, user.id)
  ]);
  // Send email, lock the account, and delete the sessions
  await Promise.all([
    sendGridForgotPasswordEmail({ to: user.email, link }),
    lockAccount(user.id),
    deleteSessions(sessionIds, user.id, redis)
  ]);
  return null;
};

export const lockAccount = async (userId: string) => {
  const user = await User.findOne(userId);
  if (user) {
    user.accountLocked = true;
    await user.save();
  }
};
