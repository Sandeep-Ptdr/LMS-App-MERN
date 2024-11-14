import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

const router = Router();

router.post('/createorder', authenticateToken, createOrder);//for creating order    
router.post('/verifypayment', verifyPayment);//for verify payment

export default router
