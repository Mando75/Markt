import { Request, Response, Router } from "express";
import * as passport from "passport";
import { setSession } from "../core/authentication/connectors/lib";
import * as Redis from "ioredis";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"]
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { session: false }),
  async (req: Request, res: Response) => {
    const redis = new Redis(process.env.REDIS_URL as string);
    await setSession(
      req.user.userId,
      req.session as Express.Session,
      req,
      redis
    );
    res.redirect("/graphql");
  }
);

export default router;
