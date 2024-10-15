import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
    },
    instructor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    price: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    averageRating: { type: Number, default: 0 },

    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("course", courseSchema);
export default Course;
