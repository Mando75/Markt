import { Request, Response, Router } from "express";
import * as passport from "passport";
import { setSession } from "../utils/ContextSession/sessionControl";
import { redis } from "../utils";

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
