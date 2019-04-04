import { GraphQLContext } from "../../../types/graphql-context";
import { RedisPrefix } from "../../../enums/redisPrefix.enum";
import { AuthenticationErrorMessages } from "../authenticationErrorMessages";
import { yupPasswordSchema } from "../yup.schema";
import { formatYupError } from "../../../utils";
import { User } from "../../../entity/User";
import { hash } from "bcryptjs";
import * as yup from "yup";

export const forgotPasswordChange = async (
  _: any,
  { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
  { redis }: GraphQLContext
) => {
  const userId = await redis.get(RedisPrefix.FORGOT_PASSWORD + key);
  if (!userId) {
    return [
      {
        path: "key",
        message: AuthenticationErrorMessages.EXPIRED_KEY
      }
    ];
  }
  try {
    const passwordValidationSchema = yup
      .object()
      .shape({ newPassword: yupPasswordSchema });
    await passwordValidationSchema.validate(
      { newPassword },
      { abortEarly: false }
    );
  } catch (err) {
    return formatYupError(err);
  }

  const user = (await User.findOne(userId, { cache: true })) as User;
  user.accountLocked = false;
  user.password = await hash(newPassword, 10);
  await Promise.all([
    user.save(),
    redis.del(RedisPrefix.FORGOT_PASSWORD + key)
  ]);
  return null;
};
