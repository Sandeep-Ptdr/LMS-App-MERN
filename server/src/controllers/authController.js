import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import sendEmail from "../utils/email.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, Please login",
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



const forgetPassword = async (req, res) => {
  try {
    console.log('body', req.body)
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    //generate 6 digit otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);
    user.otp = hashedOtp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save({validateBeforeSave: false});


    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. This OTP is valid for 10 minutes.`,
    })

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
   
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};


const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    if(!user.otp || user.otpExpires < Date.now()){
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      })
    }


    //verify otp

    const hashedOtp = await bcrypt.compare(otp, user.otp);
    if (!hashedOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    // update password

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({validateBeforeSave: false});


    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  }catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
}



export { registerUser, logInUser,forgetPassword,verifyOtpAndResetPassword };
