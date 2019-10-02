import { Router } from "express";
import SubmissionController from "../controllers/SubmissionController";

const router = Router();

router.get("/submitscore", SubmissionController.submiteScore);

export default router;