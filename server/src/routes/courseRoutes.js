import { Router } from "express";
import {
  authenticateToken,
  checkInstructorRole,
} from "../middlewares/authMiddleware.js";
import {
  createCourse,
  enrollInCourse,
  getCourse,
  publishCourse,
} from "../controllers/courseControllers.js";

const router = Router();

router.post("/create", authenticateToken, checkInstructorRole, createCourse);
router.get("/:courseId", authenticateToken, getCourse); //get course if student enrolled
router.post("/:courseId/enroll", authenticateToken, enrollInCourse); //enroll students in course
router.post(
  "/:courseId/publishcourse",
  authenticateToken,
  checkInstructorRole,
  publishCourse
);//only instructor publish the course

export default router;
