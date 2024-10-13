import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
  },
  instructor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
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
  price:{
    type: Number,
    require: true
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
},{timestamps: true});

const Course = mongoose.model('course',courseSchema);
export default Course;

