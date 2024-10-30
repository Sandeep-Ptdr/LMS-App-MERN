import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
 
import { getStudentDashboard, getInstructorDashboard} from "../controllers/dashboardControllers.js";
 

const router = Router();


router.get('/instructor',authenticateToken, checkInstructorRole, getInstructorDashboard);
router.get('/student/dashboard',authenticateToken,getStudentDashboard);

export default router;