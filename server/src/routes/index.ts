import { Router } from "express";
import auth from "./auth";
import user from "./user";
import data from "./data"
import { checkToken } from "../middleware/checkJwt";
import files from "./files"
import GameStat from "../db/GameStat";

const routes = Router();

routes.use("/auth", auth);
routes.use("/download", files);
routes.use("/data", data);
routes.use("/team", checkToken, user);
routes.use("/init", async (req, res) => {
    await GameStat.deleteMany({});
    const stat = new GameStat({ isFinished: false, isLastHouer: false });
    await stat.save()

    return res.status(200).send("init the game");
});

export default routes;
