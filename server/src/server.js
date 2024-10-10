import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import authRoutes from '../src/routes/authRoutes.js'
import courseRoutes from '../src/routes/courseRoutes.js'
import lessonRoutes from '../src/routes/lessonRoutes.js'
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

app.use('/api/v1/user',authRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1',lessonRoutes)

connectDB()
  .then(() => {
     
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect.`, err);
  });
