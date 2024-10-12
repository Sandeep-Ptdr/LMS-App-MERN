import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.models.js";
import Submission from "../models/submission.model.js";

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
    res.status(500).json({
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
    res.status(500).json({
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//delete quiz by instructor only

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      res.status(404).json({ success: false, message: "Quiz not found" });
    }

    await Quiz.findByIdAndDelete(req.params.quizId);

    res
      .status(200)
      .json({ success: true, message: "Quiz Deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    const quiz = await Quiz.findById(req.params.quizId);

    if (!quiz) {
      res.status(404).json({ success: false, message: "Quiz not found" });
    }

    if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid answer provided" });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 2;
      }
    });

    const newSubmission = new Submission({
      student: req.user.userInfo._id,
      quiz: quiz._id,
      answers,
      score,
    });

    await newSubmission.save();

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export { createQuiz, getAllQuizzes, getSingleQuiz, deleteQuiz, submitQuiz };
