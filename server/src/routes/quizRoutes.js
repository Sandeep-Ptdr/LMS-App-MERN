import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import { createQuiz,getAllQuizzes, getSingleQuiz } from "../controllers/quizContoller.js";
 

const router = Router();

router.post("/:lessonId/quiz", authenticateToken, checkInstructorRole, createQuiz);
router.get("/:lessonId/quizzes", authenticateToken, getAllQuizzes)
router.get("/quiz/:quizId", authenticateToken,getSingleQuiz)
export default router;
