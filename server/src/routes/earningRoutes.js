import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import { getEarnings } from "../controllers/earningsController.js";


const router = Router();

router.get('/earnings',authenticateToken,checkInstructorRole, getEarnings);

export default router;