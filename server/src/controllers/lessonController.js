import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";

// create  lesson for a course by instructor only.

const createLesson = async (req, res) => {
  try {
    const { title, description, videoUrl, pdfUrl, content } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    const newLesson = new Lesson({
      title,
      description,
      videoUrl,
      pdfUrl,
      content,
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
    const {title, description, videoUrl, pdfUrl, content} = req.body;

    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
    }

    lesson.title = title || lesson.title;
    lesson.description = description || lesson.description;
    lesson.videoUrl = videoUrl || lesson.videoUrl;
    lesson.pdfUrl = pdfUrl || lesson.pdfUrl;
    lesson.content = content || lesson.content;

    await lesson.save();
    res
      .status(200)
      .json({ success: true, message: "lesson update successfully", lesson });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteLesson = async (req,res) => {
    try {
        
        const lesson = await Lesson.findById(req.params.lessonId);

        if (!lesson) {
            return res.status(404).json({success:false,message:"Lesson not found"})           

        }

        await Lesson.findByIdAndDelete(req.params.lessonId);

        res.status(200).json({success: true, message:"Lesson deleted successfully"})

    } catch (error) {
        res.status(500).json({success: false, message:"Internal server error",error:error.message});
    }
}

export { createLesson, getAllLessons, getSingleLesson, updateLesson,deleteLesson };
