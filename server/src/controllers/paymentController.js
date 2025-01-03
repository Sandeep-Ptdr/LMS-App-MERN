import { razorpayInstance } from "../config/payment.js";
import crypto from "crypto";
import Course from "../models/course.model.js";
import Transaction from "../models/transactionSchema.js";

const createOrder = async (req, res) => {
  const { amount, currency = "INR", courseId } = req.body;
  const userId = req.user.userInfo._id;

  if (!amount || !courseId)
    return res
      .status(400)
      .json({ success: false, message: "Amount and course id is required" });

  const course = await Course.findById(courseId);

  if (course.enrolledStudents.includes(userId)) {
    return res.status(400).json({
      success: false,
      message: "You're already enrolled in this course",
    });
  }

  try {
    const options = {
      amount: amount * 100,
      currency,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({
        success: false,
        message: "order not created",
      });
    }
    // console.log("order", order);

    const transaction = new Transaction({
      orderId: order.id,
      amount,
      currency,
      student: userId,
      status: order.status,
      course: courseId,
    });

    await transaction.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("error in creating order", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in creating order",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    courseId,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      const course = await Course.findById(courseId);

      if (course.enrolledStudents.includes(req.user.userInfo._id)) {
        return res.status(400).json({
          success: false,
          message: "You're already enrolled in this course",
        });
      }
      const transaction = await Transaction.findOneAndUpdate(
        {
          orderId: razorpay_order_id,
        },
        {
          transactionId: razorpay_payment_id,
          status: "success",
        }
      );

      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      course.enrolledStudents.push(req.user.userInfo._id);
      await course.save();

      res.status(200).json({
        success: true,
        message: "Payment verified successfully and enrolled in course",
      });
    } catch (error) {
      await Transaction.findByIdAndUpdate(
        {
          orderId: razorpay_order_id,
        },
        {
          status: "failed",
        }
      );
      res.status(500).json({
        success: false,
        message: "Enrollment failed",
        error: error.message,
      });
    }
  } else {
    await Transaction.findByIdAndUpdate(
      {
        orderId: razorpay_order_id,
      },
      {
        status: "failed",
      }
    );

    res.status(400).json({
      success: false,
      message: "Payment not verified",
    });
  }
};

export { createOrder, verifyPayment };
