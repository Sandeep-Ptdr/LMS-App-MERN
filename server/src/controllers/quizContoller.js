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
      instructor: req.user.userInfo._id,
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
       const instructorId = req.user.userInfo._id;

      //  console.log('instructorId', instructorId)
    const quizzes = await Quiz.find({ instructor: instructorId })
      .populate("lesson", "title")
      .populate("course", "title");

      console.log(quizzes,'quizzes')

    if (!quizzes.length) {
      return res
        .status(404)
        .json({ success: false, message: "No quizzes found!" });
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
    const submissions = await Submission.find({
      student: studentId,
      quiz: { $in: quizzes.map((quiz) => quiz._id) },
    }).select(
      "quiz score percentage totalMarks totalQuestions correctAnswers wrongAnswers unansweredAnswers createdAt"
    );

    if (!quizzes) {
      return res
        .status(404)
        .json({ success: false, message: "No quizzes found for the student" });
    }

    const submissionMap = new Map(
      submissions.map((submission) => [
        submission.quiz.toString(),
        {
          isSubmitted: true,
          score: submission.score ?? 0,
          percentage:
            submission.percentage > 0
              ? submission.percentage
              : (
                  submission.totalMarks > 0
                    ? Number(
                        (((submission.score ?? 0) / submission.totalMarks) * 100).toFixed(2)
                      )
                    : 0
                ),
          totalMarks: submission.totalMarks ?? 0,
          totalQuestions: submission.totalQuestions ?? 0,
          correctAnswers: submission.correctAnswers ?? 0,
          wrongAnswers: submission.wrongAnswers ?? 0,
          unansweredAnswers: submission.unansweredAnswers ?? 0,
          submittedAt: submission.createdAt,
        },
      ])
    );

    const normalizedQuizzes = quizzes.map((quiz) => {
      const submissionInfo = submissionMap.get(quiz._id.toString());
      const quizTotalMarks =
        quiz?.questions?.reduce(
          (sum, question) => sum + (question?.marks || 1),
          0
        ) || 0;
      const effectiveTotalMarks =
        submissionInfo?.totalMarks > 0 ? submissionInfo.totalMarks : quizTotalMarks;
      const effectivePercentage =
        submissionInfo?.percentage > 0
          ? submissionInfo.percentage
          : effectiveTotalMarks > 0
            ? Number((((submissionInfo?.score ?? 0) / effectiveTotalMarks) * 100).toFixed(2))
            : 0;

      return {
        ...quiz.toObject(),
        isSubmitted: Boolean(submissionInfo?.isSubmitted),
        submission: submissionInfo
          ? {
              ...submissionInfo,
              totalMarks: effectiveTotalMarks,
              percentage: effectivePercentage,
            }
          : null,
      };
    });

    res.status(200).json({ success: true, quizzes: normalizedQuizzes });
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
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    const existingSubmission = await Submission.findOne({
      student: req.user.userInfo._id,
      quiz: req.params.quizId,
    });
    
    if(existingSubmission){
      return res.status(400).json({
        success: false,
        message: "You have already submitted this quiz",
      });
    }

    if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid answer provided" });
    }

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    const unansweredAnswers = answers.filter((answer) => answer == null).length;
    const totalMarks = quiz.questions.reduce(
      (sum, question) => sum + (question.marks || 1),
      0
    );
    const questionResults = quiz.questions.map((question, index) => {
      const selectedAnswer = answers[index] ?? null;
      const isCorrect = question.correctAnswer === selectedAnswer;
      const marks = question.marks || 1;
      const marksEarned = isCorrect ? marks : 0;

      if (isCorrect) {
        score += marks;
        correctAnswers += 1;
      } else {
        wrongAnswers += 1;
      }

      return {
        questionText: question.questionText,
        options: question.options,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        marks,
        marksEarned,
      };
    });
    const totalQuestions = quiz.questions.length;
    const percentage = totalMarks
      ? Number(((score / totalMarks) * 100).toFixed(2))
      : 0;

    const newSubmission = new Submission({
      student: req.user.userInfo._id,
      course: quiz.course,
      quiz: quiz._id,
      answers,
      score,
      totalQuestions,
      totalMarks,
      correctAnswers,
      wrongAnswers,
      unansweredAnswers,
      percentage,
      questionResults,
    });

    await newSubmission.save();

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      score,
      totalQuestions,
      totalMarks,
      correctAnswers,
      wrongAnswers,
      unansweredAnswers,
      percentage,
      questionResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getQuizResult = async (req, res) => {
  try {
    const userId = req.user.userInfo._id;
    const quizResults = await Submission.find({ student: userId })
      .populate("quiz", "title questions")
      .populate("course", "title");
    
    const normalizedQuizResults = quizResults
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((submission) => {
        const totalQuestions = submission?.quiz?.questions?.length || 0;
        const totalMarks =
          submission?.quiz?.questions?.reduce(
            (sum, question) => sum + (question?.marks || 1),
            0
          ) || 0;

        return {
          _id: submission._id,
          score: submission.score ?? 0,
          createdAt: submission.createdAt,
          answers: submission.answers || [],
          quiz: {
            _id: submission?.quiz?._id,
            title: submission?.quiz?.title || "Untitled Quiz",
          },
          course: {
            _id: submission?.course?._id,
            title: submission?.course?.title || "Unknown Course",
          },
          totalQuestions:
            submission.totalQuestions > 0 ? submission.totalQuestions : totalQuestions,
          totalMarks:
            submission.totalMarks > 0 ? submission.totalMarks : totalMarks,
          correctAnswers: submission.correctAnswers ?? 0,
          wrongAnswers: submission.wrongAnswers ?? 0,
          unansweredAnswers: submission.unansweredAnswers ?? 0,
          percentage:
            submission.percentage > 0
              ? submission.percentage
              : ((submission.totalMarks > 0 ? submission.totalMarks : totalMarks)
              ? Number(
                  (
                    ((submission.score ?? 0) /
                      (submission.totalMarks > 0 ? submission.totalMarks : totalMarks)) *
                    100
                  ).toFixed(2)
                )
              : 0),
          questionResults: submission.questionResults || [],
        };
      });

    res.status(200).json({ success: true, quizResults: normalizedQuizResults });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
    
  }


}

 


export {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  deleteQuiz,
  submitQuiz,
  getAllQuizzesForStudent,
  getQuizResult,
};
