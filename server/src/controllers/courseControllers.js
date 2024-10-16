import { uploadOnCloudinary } from "../config/cloudinary.js";
import Course from "../models/course.model.js";

//create course by instructor
const createCourse = async (req, res) => {
  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({success:false, message:" No file Uploaded! "})
      
    }

    const result = await uploadOnCloudinary(file.path);
   

    if (!result || result.error) {
      res.status(500).json({success: false, message: "Failed to Upload content "})
    }
    
    const { title, description, price, category } = req.body;

    const newCourse = new Course({
      title,
      description,
      content: result.secure_url,
      price,
      category,
      instructor: req.user.userInfo._id,
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created Successfully!",
      course: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//get course details only student can access if enrolled

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('instructor', 'name')

    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    if (
      !course.enrolledStudents.includes(req.user.userInfo._id) &&
      req.user.userInfo.role !== "instructor"
    ) {
     
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    res.status(200).json({ success: true, course: course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get course",
      error: error.message,
    });
  }
};

//enroll the student

const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    if (course.enrolledStudents.includes(req.user.userInfo._id)) {
      return res.status(400).json({
        success: false,
        message: "You're already enrolled in this course",
      });
    }

    course.enrolledStudents.push(req.user.userInfo._id);
    await course.save();

    res
      .status(201)
      .json({ success: true, message: "Enrolled Successfully!", course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to enroll in the course",
      error: error.message,
    });
  }
};

const publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course)
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });

    if (course.instructor?.toString() !== req.user.userInfo._id?.toString()) {
      return res.status(403).json({
        success: false,
        message: "You're not Instructor of this course",
      });
    }

    if (course.status === 'published') {
      return res.status(400).json({success: false, message: "Course is already published"});
    }

    course.status = "published";
    await course.save();

    res
      .status(200)
      .json(
        { success: true, message: "Course published successfully",course },
       
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Publish Course",
      error: error.message,
    });
  }
};



export { getCourse, createCourse, enrollInCourse, publishCourse };
