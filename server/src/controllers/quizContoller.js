import Course from "../models/course.model.js";
import Lesson from "../models/lesson.model.js";
import Quiz from "../models/quiz.models.js";
import Submission from "../models/submission.model.js";

const createQuiz = async (req, res) => {
  try {
    const { questions, title } = req.body;

    if (!questions || questions.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No questions provided" });
    }

    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      res.status(404).json({ success: false, message: "Lesson not found" });
    }

    const quiz = new Quiz({
      title: title,
      questions,
      lesson: lesson._id,
      course: lesson.course,
    });

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

//get all quizes

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate("lesson", "title")
      .populate("course", "title");

    if (!quizzes) {
      return res
        .status(404)
        .json({ success: false, message: "No quizzes found for this lesson" });
    }

    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get all quizes for the student

const getAllQuizzesForStudent = async (req, res) => {
  try {
    const studentId = req.user.userInfo._id;

    const enrolledCourses = await Course.find({
      enrolledStudents: studentId,
    }).select("_id title");

    const courseIds = enrolledCourses.map((course) => course._id);

    const quizzes = await Quiz.find({ course: { $in: courseIds } })
      .populate("lesson", "title")
      .populate("course", "title");

    if (!quizzes) {
      return res
        .status(404)
        .json({ success: false, message: "No quizzes found for the student" });
    }

    res.status(200).json({ success: true, quizzes });
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
export {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  deleteQuiz,
  submitQuiz,
  getAllQuizzesForStudent,
};
