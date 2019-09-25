import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkToken } from "../middleware/checkJwt";

const router = Router();

router.post("/signin", AuthController.signIn);
router.post("/signup",checkToken, AuthController.signIn);

export default router;