import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.models.js";

const createQuiz = async (req, res) => {
  try {
    const { questions } = req.body;

    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
    }

    const quiz = new Quiz({ lesson: lesson._id, questions });

    await quiz.save();
    res
      .status(201)
      .json({ success: true, message: "Quiz created successfully", quiz });
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

//get all quiz

const getAllQuizzes = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res
        .status(404)
        .json({ success: false, message: "Lesson not found" });
    }

    const quizzes = await Quiz.find({ lesson: lesson._id });

    if (!quizzes) {
      return res
        .status(404)
        .json({ success: false, message: "No quizzes found for this lesson" });
    }

    res.status(200).json({ success: true, lesson, quizzes });
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
// get single quiz
const getSingleQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, quiz });
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

export { createQuiz, getAllQuizzes, getSingleQuiz };
