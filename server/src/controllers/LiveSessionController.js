import LiveClassSession from "../models/LiveClassSession.js";

const createLiveSession = async (req, res) => {
  try {
    const instructorId = req.user.userInfo._id;
    const { title, roomId, courseId, duration } = req.body;

    if (!title || !roomId || !courseId || !duration) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const liveSession = new LiveClassSession({
      title,
      roomId,
      courseId,
      duration,
      sessionStartTime: new Date(),
      sessionDate: new Date(),
      instructorId,
    });

    await liveSession.save();
    res.status(200).json({
      success: true,
      message: "Live Session Created Successfully",
      liveSession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export { createLiveSession }