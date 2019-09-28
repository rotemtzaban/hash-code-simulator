import { Router } from "express";
import DataController from "../controllers/DataController";

const router = Router();

router.get("/teams", DataController.getAllTeams);
// router.post("/signup", AuthController.signUp);

export default router;