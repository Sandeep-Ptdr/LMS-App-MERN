import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({ name, email, role, password });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Register Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while register.",
      error: error.message,
    });
  }
};

const logInUser = async (req, res) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
    const { email, password } = req.body;

    const user = await User.loginStatic(email, password);

    const { password: _, ...userInfo } = user.toObject();
    
    const accessToken = jwt.sign({ userInfo }, jwtSecretKey, {
      expiresIn: "2h",
    });
    res.status(200).json({
      success: true,
      message: "Lognin successful!",
      accessToken,
      user: userInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};

export { registerUser, logInUser };
