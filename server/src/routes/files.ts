import { Router } from "express";
import FilesController from "../controllers/FilesController";

const router = Router();

router.get("/question/:year", FilesController.downloadQuestion);
router.get("/input/:year", FilesController.downloadInputs);

export default router;