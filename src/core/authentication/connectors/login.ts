import { setSession } from "./lib";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils";
import { yupUserLoginSchema } from "../yup.schema";
import { GraphQLContext } from "../../../types/graphql-context";
import { ErrorMessages } from "../errorMessages";
import { compare } from "bcryptjs";

/**
 * Logic for login mutation
 * Validates the login information with Yup, verifies info is correct,
 * and creates a new session
 * @param _
 * @param user
 * @param session
 * @param redis
 * @param req
 */
export const login = async (
  _: any,
  { user }: { user: GQL.IUserLoginType },
  { session, redis, req }: GraphQLContext
) => {
  try {
    await yupUserLoginSchema.validate(user, { abortEarly: false });
  } catch (err) {
    return formatYupError(err);
  }
  const loginAttempt = await User.findOne({ email: user.email });
  // ensures that a user exists, otherwise returns
  const errors = await verifyLogin(loginAttempt, user.password);
  if (errors.length) {
    return errors;
  }
  // we already know the user exists, otherwise this would have returned
  await setSession((loginAttempt as User).id, session, req, redis);
  return null;
};

/**
 * Verify that a user's login information is correct
 * @param user
 * @param password
 */
export const verifyLogin = async (user: User | undefined, password: string) => {
  const errorResponse = {
    path: "email",
    message: ErrorMessages.INVALID_LOGIN
  };
  // Verify user exists and password matches
  const errors =
    user && (await compare(password, user.password as string))
      ? []
      : [errorResponse];

  // Verify that user email is confirmed
  if (user && !errors.length && !user.emailConfirmed) {
    errors.push({
      path: "email",
      message: ErrorMessages.EMAIL_NOT_CONFIRMED
    });
  }

  if (user && !errors.length && user.accountLocked) {
    errors.push({
      path: "email",
      message: ErrorMessages.ACCOUNT_LOCKED
    });
  }
  return errors;
};
