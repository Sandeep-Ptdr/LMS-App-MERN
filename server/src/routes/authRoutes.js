import express from "express";
import {registerUser,logInUser, forgetPassword, verifyOtpAndResetPassword } from "../controllers/authController.js";
const router = express.Router();

router.post('/register', registerUser);
router.post('/login',logInUser);
router.post('/forgot-password',forgetPassword);
router.post('/reset-password',verifyOtpAndResetPassword);

export default router;