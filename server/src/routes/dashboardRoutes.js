import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import { getInstructorDashboard } from "../controllers/courseControllers.js";
 

const router = Router();


router.get('/dashboard',authenticateToken, checkInstructorRole, getInstructorDashboard);

export default router;