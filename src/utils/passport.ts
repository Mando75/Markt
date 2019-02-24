import * as passport from "passport";
import { Strategy } from "passport-google-oauth2";
import { User } from "../entity/User";
import { AccountType } from "../enums/accountType.enum";
import { Guide } from "../entity/Guide";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_AUTH_CALLBACK_URL
} = process.env;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      callbackURL: GOOGLE_AUTH_CALLBACK_URL as string
    },
    async (_, __, profile, cb) => {
      const { id, name, email } = profile;
      let user = await checkForUser({ id, email });
      if (!user) {
        // Create new user
        user = await User.create({
          firstName: name.givenName,
          lastName: name.familyName,
          email,
          externalGuid: id,
          accountType: AccountType.USER
        }).save();
        /**
         * TODO
         * Currently create guide by default. Change this in the future
         */
        const guide = new Guide();
        guide.user = user;
        await guide.save();
      } else if (!user.externalGuid) {
        // Merge user
        user.externalGuid = id;
        await user.save();
      }
      cb(null, { userId: user.id });
    }
  )
);

/**
 * Checks if user already exists in system. Will always check for id,
 * also conditionally checks email if provided
 * @param id
 * @param email
 */
const checkForUser = async ({ id, email }: { id: string; email: string }) => {
  const query = User.createQueryBuilder("user").where(
    `"user"."external_guid" = :id`,
    { id }
  );

  // If email exists, also check for that. They may have signed up with another service
  if (email) {
    query.orWhere(`"user"."email" = :email`, { email });
  }

  return query.getOne();
};

export default passport;
