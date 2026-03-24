import generateZegoToken from "../lib/zegoToken.js";

const issueTokenUserAndRoom = async (req, res) => {
  try {
    const userId = req.user.userInfo._id;
    const roomId = req.params.roomId || 1;

    if (!userId || !roomId) {
      return res
        .status(400)
        .json({ success: false, message: "UserId and RoomId is required" });
    }

    const token = generateZegoToken(roomId, userId);
    res
      .status(200)
      .json({ success: true, appId: process.env.ZEGO_APP_ID, token });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};


export default issueTokenUserAndRoom