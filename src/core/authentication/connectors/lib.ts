import { User } from "../../../entity/User";
import { AccountType } from "../../../enums/accountType.enum";
import { Redis } from "ioredis";
import { v4 } from "uuid";
import { RedisPrefix } from "../../../enums/redisPrefix.enum";
import { Guide } from "../../../entity/Guide";

/**
 * Checks if user already exists based upon email address
 * @param email
 * @return Promise<boolean>
 */
export const userExists = async (email: string) => {
  const user = await User.findOne({
    where: { email },
    select: ["id"]
  });
  return !!user;
};

/**
 * Creates a new user in the database. Expects a user object with prehashed
 * password and AccountType.
 * @param Object with
 * @param user
 * @param hashedPwd
 * @param accountType
 */
export const registerUser = async ({
  user,
  accountType
}: {
  user: GQL.IUserRegistrationType;
  accountType: AccountType;
}) => {
  return createGuide(
    await User.create({
      ...user,
      accountType
    }).save()
  );
};

/**
 * Create a guide for the user
 * @param user
 */
const createGuide = async (user: User) => {
  const g = new Guide();
  g.user = user;
  await g.save();
  return g.user;
};

/**
 * Create an email confirmation link
 * @param url
 * @param userId
 * @param redis
 */
export const createConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(RedisPrefix.CONFIRM_EMAIL + id, userId, "ex", 60 * 60 * 24);
  return `${url}/confirm/${id}`;
};

/**
 * Creates a password reset link which can be given to the user
 * @param url
 * @param userId
 * @param redis
 */
export const createForgotPasswordLink = async (
  url: string,
  userId: string,
  redis: Redis
) => {
  const id = v4();
  await redis.set(RedisPrefix.FORGOT_PASSWORD + id, userId, "ex", 60 * 20);
  return `${url}/change-password/${id}`;
};
