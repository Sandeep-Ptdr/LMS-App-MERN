import { Router } from "express";
import { authenticateToken, checkInstructorRole } from "../middlewares/authMiddleware.js";
import { createLesson, deleteLesson, getAllLessons, getSingleLesson, updateLesson } from "../controllers/lessonController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/course/:courseId/lesson/create", authenticateToken, checkInstructorRole, upload.fields([{name: "video"}, {name: "pdf"}, {name: "image"}]), createLesson);//create a lesson for course by instructor only.

router.get("/course/:courseId/lessons", authenticateToken, getAllLessons);//get all lesson by anyone

router.get("/course/lesson/:lessonId", authenticateToken, getSingleLesson);//get a specific lesson
router.get("/lesson/:lessonId/edit", authenticateToken,checkInstructorRole, getSingleLesson);//get a specific lesson by instructor only

router.put("/lesson/:lessonId/edit",authenticateToken, checkInstructorRole,upload.fields([{ name: "video" }, { name: "pdf" }, {name: "image"}]), updateLesson)//update a lesson by instructor only.

router.delete("/lesson/:lessonId/delete", authenticateToken, checkInstructorRole, deleteLesson)//delete a lesson by instructor
export default router;