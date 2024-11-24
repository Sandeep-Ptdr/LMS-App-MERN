import mongoose from "mongoose";
import Progress from "../models/progress.model.js";
import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";

const updateProgress = async (req, res) => {
  const { courseId, lessonId } = req.body;
  const studentId = req.user.userInfo._id;

  try {
    if (!courseId || !lessonId)
      return res
        .status(400)
        .json({
          success: false,
          message: "Course id and lesson id is required",
        });

    const lesson = await Lesson.find({ course: courseId });

    const totalLessons = lesson?.length > 0 ? lesson.length : 0;

    const progress = await Progress.findOneAndUpdate(
      { student: studentId, course: courseId },
      {
        $addToSet: { completedLessons: lessonId },
        $set: { lastAccessedLesson: lessonId, lastAccessed: Date.now(), totalLessons: totalLessons },
      },
      { upsert: true, new: true }
    );

    const completedlessons = progress.completedLessons.length;

    const progressPercentage = (completedlessons / totalLessons) * 100;

    progress.progress = progressPercentage;

    await progress.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Progress updated successfully",
        progress,
        totalLessons,
      });
  } catch (error) {
    console.log("error;;;", error);
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
      error: error.message,
    });
  }
};

const getProgress = async (req, res) => {
  const studentId = req.user.userInfo._id;

  try {
    const progress = await Progress.find({ student: studentId })
      .populate("course", "title")
      .populate("lastAccessedLesson", "title")
      .populate("completedLessons", "title");

    if (!progress)
      return res
        .status(404)
        .json({ success: false, message: "Progress not found" });


    res.status(200).json({ success: true, progress });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get progress",
      error: error.message,
    });
  }
};

export { updateProgress, getProgress };
