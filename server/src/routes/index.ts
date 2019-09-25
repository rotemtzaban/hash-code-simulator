import { Router } from "express";
import auth from "./auth";
import user from "./user";
import { checkToken } from "../middleware/checkJwt";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", checkToken, user);

export default routes;
