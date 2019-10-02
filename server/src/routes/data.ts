import { Router } from "express";
import DataController from "../controllers/DataController";

const router = Router();

router.get("/teams", DataController.getAllTeams);
router.get("/scoreboard", DataController.getBestScores);

export default router;