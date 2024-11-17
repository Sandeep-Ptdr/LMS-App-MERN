import { uploadOnCloudinary } from "../config/cloudinary.js";
import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";

//create course by instructor
const createCourse = async (req, res) => {
  try {
    const {video, image} = req.files;
    // console.log(req);

    if (!video && !image) {
      return res
        .status(400)
        .json({ success: false, message: " No file Uploaded! " });
    }

    const videoUrl = video ? await uploadOnCloudinary(video[0].path) : null; 
    const imageUrl = image ? await uploadOnCloudinary(image[0].path) : null;
    if (!videoUrl || !imageUrl ) {
      res
        .status(500)
        .json({ success: false, message: "Failed to Upload content " });
    }

    const { title, description, price, category, status } = req.body;

    const newCourse = new Course({
      title,
      description,
      content: videoUrl.secure_url,
      image: imageUrl.secure_url,
      price,
      category,
      status,
      instructor: req.user.userInfo._id,
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

//get all course by instructor

const getAllCourse = async (req, res) => {
  try {
    const InstructorId = req.user.userInfo._id;

    const courses = await Course.find({ instructor: InstructorId });

    

    if (!courses)
      return res
        .status(404)
        .json({ success: false, message: "No courses found." });

    res.status(200).json({ success: true, courses });

  } catch (error) {
    console.log('err',error)
    res.status(500).json({
      success: false,
      message: "Server error in fetching course",
      error: error.message,
    });
  }
};

//get course details only student can access if enrolled

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate("instructor", "name")
      .populate("enrolledStudents", "name email");

    const lessons = await Lesson.find({ course: req.params.courseId });

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
    } else if (req.user.userInfo.role === "instructor") {
      return res.status(200).json({ success: true, course: course, lessons });
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
//get all enroled course by student 

const enrolledCourses = async (req, res) => {

  const studentId = req.user.userInfo._id;

  try {
    const course = await Course.find({enrolledStudents: studentId});

    if(!course)
      return res.status(404).json({success: false, message: "No enrolled courses found"});

     
    res.status(200).json({success: true, course});  

  } catch (error) {
    console.log('error:',error);
    res.status(500).json({
      success: false,
      message: "Failed to get enrolled courses",
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
    // console.log(req.params.courseId);

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

    if (course.status === "Published") {
      return res
        .status(400)
        .json({ success: false, message: "Course is already published" });
    }

    course.status = "Published";
    await course.save();

    res.status(200).json({
      success: true,
      message: "Course published successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Publish Course",
      error: error.message,
    });
  }
};

//update course by instructor only

const updateCourse = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    // console.log("body", req.body);

    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { title, description, category, status },
      { new: true }
    );    

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    console.log("updated course", course);
    res
      .status(200)
      .json({ success: true, message: "Course Update Successfully", course });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.courseId);

     

    if (!course) {
      return res.status(404).json({success: false, message: "Course not found"});
    }

    res.status(200).json({success: true, message: "Course deleted successfully"});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    })
  }
};

const getAllCourseByStudent = async (req, res) => {
  try {

    const courses = await Course.find()

    if (!courses) return res.status(404).json({ success: false, message: "No courses found" });

    res.status(200).json({ success: true, courses });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get course",
      error: error.message,
    });
  }
};

export {
  getAllCourseByStudent,
  getCourse,
  enrolledCourses,
  getAllCourse,
  createCourse,
  enrollInCourse,
  publishCourse,
  updateCourse,
  deleteCourse,
};
