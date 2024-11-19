import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import {
  getProgress,
  updateProgress,
} from "../controllers/progressController.js";

const router = Router();

router.get("student/progress", authenticateToken, getProgress);
router.put("student/updateprogress", authenticateToken, updateProgress);

export default router;
