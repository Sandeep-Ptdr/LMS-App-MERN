import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import { createQuiz,deleteQuiz,getAllQuizzes, getAllQuizzesForStudent, getQuizResult, getSingleQuiz, submitQuiz } from "../controllers/quizContoller.js";
 

const router = Router();

router.post("/instructor/course/lesson/:lessonId/quiz/create", authenticateToken, checkInstructorRole, createQuiz); // create quiz
router.get("/quizzes", authenticateToken, getAllQuizzes)// get all quizzes
router.get("/student/course/lesson/quiz/:quizId", authenticateToken,getSingleQuiz)//get single quiz
router.delete('/delete/quiz/:quizId', authenticateToken, checkInstructorRole, deleteQuiz);//delet quiz 
router.post("/quiz/:quizId/submit", authenticateToken, submitQuiz);//for submit quiz
router.get("/student/quizzes",authenticateToken, getAllQuizzesForStudent )
router.get('/student/quizzes-result',authenticateToken,getQuizResult)
export default router;
