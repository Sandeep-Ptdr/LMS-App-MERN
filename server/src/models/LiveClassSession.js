import mongoose from "mongoose";

const liveClassSessionSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    title: String,
    sessionLink: {
      type: String,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    sessionStartTime: {
      type: String,
      required: true,
    },
    sessionEndTime: {
      type: String,
    },
    sessionStatus: {
      type: String,
      enum: ["scheduled", "live", "completed", "cancelled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

const LiveClassSession = mongoose.model(
  "LiveClassSession",
  liveClassSessionSchema
);
export default LiveClassSession;
