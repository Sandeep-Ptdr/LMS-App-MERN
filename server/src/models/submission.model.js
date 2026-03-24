import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
     student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    answers: [Number],

    score: { type: Number },
    totalQuestions: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    wrongAnswers: { type: Number, default: 0 },
    unansweredAnswers: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    questionResults: [
      {
        questionText: { type: String },
        options: [String],
        selectedAnswer: { type: Number, default: null },
        correctAnswer: { type: Number },
        isCorrect: { type: Boolean, default: false },
        marks: { type: Number, default: 1 },
        marksEarned: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
