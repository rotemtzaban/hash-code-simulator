import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => res.json("allGood").send());

export default router;