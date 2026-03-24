
import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import issueTokenUserAndRoom from "../controllers/issueTokenUserAndRoom.js";
import { createLiveSession } from "../controllers/LiveSessionController.js";

const router = Router();



router.post('/create-session',authenticateToken,checkInstructorRole,createLiveSession)
router.get('/token/:roomId',authenticateToken ,issueTokenUserAndRoom)

export default router