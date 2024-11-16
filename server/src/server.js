import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import authRoutes from '../src/routes/authRoutes.js'
import courseRoutes from '../src/routes/courseRoutes.js'
import lessonRoutes from '../src/routes/lessonRoutes.js'
import quizRoutes from '../src/routes/quizRoutes.js'
import dashboardRoutes from '../src/routes/dashboardRoutes.js'
import paymentRoutes from '../src/routes/paymentRoutes.js'
import earningRoutes from '../src/routes/earningRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// const clientUrl = process.env.CLIENT_URL;

app.use(
  cors({
    origin:"*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/',courseRoutes)
app.use('/api/v1/instructor',lessonRoutes)
app.use('/api/v1/lesson',quizRoutes)
app.use('/api/v1/',dashboardRoutes)
app.use('/api/v1/student',paymentRoutes)
app.use('/api/v1/instructor', earningRoutes)

app.get('/api/v1/getkey', (req,res) => {
  res.status(200).json({
    success:true,
    key:process.env.RAZORPAY_KEY_ID
  })
})
 

connectDB()
  .then(() => {
     
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect.`, err);
  });
