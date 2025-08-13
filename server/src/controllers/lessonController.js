import { uploadOnCloudinary } from "../config/cloudinary.js";
import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";

// create  lesson for a course by instructor only.

const createLesson = async (req, res) => {
  try {
    const { title, description } = req.body;

    const {video, pdf, image} = req.files

     

    if(!video && !pdf && !image){
      return res.status(400).json({success: false, message: "No files uploaded"})
    }

    const videoUrlFromCloudinary = video ? await uploadOnCloudinary(video[0].buffer) : null;
    const pdfUrlFromCloudinary = pdf ? await uploadOnCloudinary(pdf[0].buffer) : null;
    const imageUrlFromCloudinary = image ? await uploadOnCloudinary(image[0].buffer) : null;

    if(!videoUrlFromCloudinary && !pdfUrlFromCloudinary && !imageUrlFromCloudinary){
      return res.status(400).json({success: false, message: "Failed to upload files"});
    }

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const newLesson = new Lesson({
      title,
      description,
      videoUrl: videoUrlFromCloudinary.secure_url,
      pdfUrl: pdfUrlFromCloudinary.secure_url,
      imageUrl: imageUrlFromCloudinary.secure_url,  
      course: course._id,
    });

    await newLesson.save();

    res.status(201).json({
      success: true,
      message: "Lesson created successfully!",
      newLesson,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get all lessons of a course
const getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId });


    if (!lessons) {
      return res
        .status(404)
        .json({ success: false, message: "No lessons found for this course" });
    }

    res.status(200).json({ success: true, lessons });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get single lesson

const getSingleLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }

    res.status(200).json({ success: true, lesson });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateLesson = async (req, res) => {
  try {
    
    const { title, description } = req.body;
     
    const {video, pdf, image} = req.files

     

    if(!video && !pdf && !image){
      return res.status(400).json({success: false, message: "No files uploaded"})
    }

    const videoUrlFromCloudinary = video ? await uploadOnCloudinary(video[0].path) : null;
    const pdfUrlFromCloudinary = pdf ? await uploadOnCloudinary(pdf[0].path) : null;
    const imageUrlFromCloudinary = image ? await uploadOnCloudinary(image[0].path) : null;

    if(!videoUrlFromCloudinary && !pdfUrlFromCloudinary && !imageUrlFromCloudinary){
      return res.status(400).json({success: false, message: "Failed to upload files"});
    }
    
    const lesson = await Lesson.findById(req.params.lessonId);


    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
    }

    lesson.title = title || lesson.title;
    lesson.description = description || lesson.description;
    lesson.videoUrl = videoUrlFromCloudinary.secure_url || lesson.videoUrl;
    lesson.pdfUrl = pdfUrlFromCloudinary.secure_url || lesson.pdfUrl;
    lesson.imageUrl = imageUrlFromCloudinary.secure_url || lesson.imageUrl;

    await lesson.save();
    res
      .status(200)
      .json({ success: true, message: "lesson update successfully", lesson });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updating lesson",
      error: error.message,
    });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }

    await Lesson.findByIdAndDelete(req.params.lessonId);

    res
      .status(200)
      .json({ success: true, message: "Lesson deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

export {
  createLesson,
  getAllLessons,
  getSingleLesson,
  updateLesson,
  deleteLesson,
};
