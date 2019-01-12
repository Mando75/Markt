// Routes file
import { Router } from "express";
import confirmEmail from "./confirmEmail";
import oauth from "./oauth";

const routes = Router();

routes.use(oauth);
routes.use(confirmEmail);

routes.get("/", (_, res) => {
  res.redirect("/graphql");
});

export { routes };
