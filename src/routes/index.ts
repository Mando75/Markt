// Routes file
import { Router } from "express";
import confirmEmail from "./confirmEmail";
import oauth from "./oauth";
import * as path from "path";

const routes = Router();

routes.use(oauth);
routes.use(confirmEmail);

routes.get("/", (_, res) => {
  res.sendFile(path.join(__dirname + "../../../client/dist/index.html"));
});

export { routes };
