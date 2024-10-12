import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options:[String],
      correctAnswer: {type: Number}
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
