import { Router } from "express";
import { getUserCounts } from "../controllers/summery-controller";

const router = Router();

router.get("/count", getUserCounts);

export default router;
