import { AuthenticationErrorMessages } from "../authenticationErrorMessages";
import { createConfirmEmailLink, registerUser, userExists } from "./lib";
import { formatYupError, sendConfirmEmail } from "../../../utils";
import { yupUserRegistrationSchema } from "../yup.schema";
import { AccountType } from "../../../enums/accountType.enum";
import { GraphQLContext } from "../../../types/graphql-context";

/**
 * Registers a new user of type 'user' in the database
 * Returns whether the save was successful
 * @param _
 * @param user
 * @param redis
 * @param url
 */
export const register = async (
  _: any,
  { user }: { user: GQL.IUserRegistrationType },
  { redis, url }: GraphQLContext
) => {
  try {
    await yupUserRegistrationSchema.validate(user, { abortEarly: false });
  } catch (err) {
    return formatYupError(err);
  }
  try {
    if (await userExists(user.email)) {
      return [
        {
          path: "email",
          message: AuthenticationErrorMessages.EMAIL_DUPLICATE
        }
      ];
    }

    const newUser = await registerUser({
      user,
      accountType: AccountType.USER
    });

    const link = await createConfirmEmailLink(url, newUser.id, redis);
    await sendConfirmEmail({
      to: user.email,
      link
    });
    return null;
  } catch (err) {
    return [
      {
        path: "register",
        message: AuthenticationErrorMessages.GENERIC_FAILURE
      }
    ];
  }
};
