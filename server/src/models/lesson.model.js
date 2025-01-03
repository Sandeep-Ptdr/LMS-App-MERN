import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },

  pdfUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  }],
},{timestamps:true});

const Lesson = mongoose.model("Lesson", lessonSchema);
export default Lesson;
