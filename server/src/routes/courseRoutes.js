import { Router } from "express";
import {
  authenticateToken,
  checkInstructorRole,
} from "../middlewares/authMiddleware.js";
import {
  createCourse,
  enrollInCourse,
  getAllCourse,
  getCourse,
  publishCourse,
} from "../controllers/courseControllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { submitRating } from "../controllers/ratingController.js";

const router = Router();

router.post("/course/create", authenticateToken, checkInstructorRole, upload.single('video'), createCourse);
router.get("/courses",authenticateToken,checkInstructorRole,getAllCourse)
router.get("/course/:courseId", authenticateToken, getCourse); //get course if student enrolled
router.post("/course/:courseId/enroll", authenticateToken, enrollInCourse); //enroll students in course
router.post(
  "/:courseId/publishcourse",
  authenticateToken,
  checkInstructorRole,
  publishCourse
);//only instructor publish the course

router.post('/:courseId/rate',authenticateToken,submitRating);// for giving rating
export default router;
