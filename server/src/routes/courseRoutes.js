import { Router } from "express";
import {
  authenticateToken,
  checkInstructorRole,
} from "../middlewares/authMiddleware.js";
import {
  createCourse,
  deleteCourse,
  enrolledCourses,
  enrollInCourse,
  getAllCourse,
  getAllCourseByStudent,
  getCourse,
  publishCourse,
  updateCourse,
} from "../controllers/courseControllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { submitRating } from "../controllers/ratingController.js";

const router = Router();

router.post("/instructor/course/create", authenticateToken, checkInstructorRole, upload.fields([{ name: "video" }, { name: "image" }]), createCourse);
router.get("/instructor/courses",authenticateToken,checkInstructorRole,getAllCourse)
router.get("/student/course/:courseId", authenticateToken, getCourse); //get course if student enrolled
router.get("/instructor/course/:courseId/edit", authenticateToken,checkInstructorRole, getCourse); //get course by instructor 
router.get("/instructor/course/:courseId/detail", authenticateToken,checkInstructorRole, getCourse); //get course by instructor 
router.post("/instructor/course/:courseId/enroll", authenticateToken, enrollInCourse); //enroll students in course
router.put(
  "/instructor/:courseId/publish",
  authenticateToken,
  checkInstructorRole,
  publishCourse
);//only instructor publish the course

router.put('/instructor/course/:courseId/edit',authenticateToken,checkInstructorRole,updateCourse);//course should be update by only instructor

router.delete(`/instructor/course/:courseId/delete`, authenticateToken, checkInstructorRole, deleteCourse);

router.post('/instructor/:courseId/rate',authenticateToken,submitRating);// for giving rating

router.get('/courses',authenticateToken,getAllCourseByStudent);//get all course by student

router.get('/student/mycourses',authenticateToken, enrolledCourses);//get enrolled course by student

export default router;
