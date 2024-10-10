import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import { createLesson, deleteLesson, getAllLessons, getSingleLesson, updateLesson } from "../controllers/lessonController.js";

const router = Router();

router.post("/course/:courseId/lesson", authenticateToken, checkInstructorRole, createLesson);//create a lesson for course by instructor only.

router.get("/course/:courseId/lessons", authenticateToken, getAllLessons);//get all lesson by anyone

router.get("/lesson/:lessonId", authenticateToken, getSingleLesson);//get a specific lesson

router.put("/lesson/:lessonId",authenticateToken, checkInstructorRole, updateLesson)//update a lesson by instructor only.

router.delete("/lesson/:lessonId", authenticateToken, checkInstructorRole, deleteLesson)//delete a lesson by instructor
export default router;