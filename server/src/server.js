import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import lessonRoutes from './routes/lessonRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import earningRoutes from './routes/earningRoutes.js'
import progressRoutes from './routes/progressRoutes.js'

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
app.use('/api/v1/student',lessonRoutes)
app.use('/api/v1/',quizRoutes)
app.use('/api/v1/',dashboardRoutes)
app.use('/api/v1/student',paymentRoutes)
app.use('/api/v1/instructor', earningRoutes)
app.use('/api/v1',progressRoutes)

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
