import { Router } from "express";
import auth from "./auth";
import user from "./user";
import data from "./data"
import { checkToken } from "../middleware/checkJwt";
import files from "./files"

const routes = Router();

routes.use("/auth", auth);
routes.use("/download", files);
routes.use("/data", data);
routes.use("/team", checkToken, user);

export default routes;
