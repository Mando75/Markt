import { Request, Response, Router } from "express";
import { redis } from "../utils";
import { User } from "../entity/User";
import { RedisPrefix } from "../enums/redisPrefix.enum";

const router: Router = Router();

/**
 * Route for confirming email
 */
router.get("/confirm/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await redis.get(RedisPrefix.CONFIRM_EMAIL + id);
  if (userId) {
    await setEmailConfirmed(id, userId);
    res.json({
      msg: "ok"
    });
  } else {
    res.status(403).json({
      msg: "invalid"
    });
  }
});

/**
 * Updates the user record and sets the email to confirmed
 * Removes the key from the redis store
 * @param id
 * @param userId
 */
const setEmailConfirmed = async (id: string, userId: string) => {
  const updateUser = User.update({ id: userId }, { emailConfirmed: true });
  const updateRedis = redis.del(id);
  await Promise.all([updateUser, updateRedis]);
};
export default router;
