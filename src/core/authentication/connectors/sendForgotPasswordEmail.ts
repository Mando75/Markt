import { GraphQLContext } from "../../../types/graphql-context";
import { User } from "../../../entity/User";
import { AuthenticationErrorMessages } from "../authenticationErrorMessages";
import { createForgotPasswordLink } from "./lib";
import { sendGridForgotPasswordEmail } from "../../../utils/email/sendEmail";
import {
  deleteSessions,
  getSessionIds
} from "../../../utils/ContextSession/sessionControl";

export const sendForgotPasswordEmail = async (
  _: any,
  { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
  { redis }: GraphQLContext
) => {
  const user = (await User.findOne({ email }, { cache: true })) as User;
  if (!user) {
    return [
      {
        path: "email",
        message: AuthenticationErrorMessages.INVALID_LOGIN
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
  const user = await User.findOne(userId, { cache: true });
  if (user) {
    user.accountLocked = true;
    await user.save();
  }
};
