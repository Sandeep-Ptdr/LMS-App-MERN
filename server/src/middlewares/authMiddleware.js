import jwt from "jsonwebtoken";

const jwtSecretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "No token, access forbidden" });

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err)
      return res.status(403).json({ success: false, message: "Invalid token" });

    req.user = user;
    next();
  });
}

const checkInstructorRole = (req, res, next) => {
  if (req.user.userInfo.role !== "instructor") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Access denied, You are not Instructor",
      });
  }

  next();
};

export { authenticateToken, checkInstructorRole };
