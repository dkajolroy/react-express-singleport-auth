import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { authRouter } from "./routes/authRoute";
import { userRouter } from "./routes/userRoute";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// config routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("Server⚡: running ");
});

// Error handlers
app.use((req, res, next) => {
  const statusCode = req.statusCode || 500;
  const message = req.body || "Not Found";

  return res.status(statusCode).json({
    message,
    success: false,
    statusCode,
  });
});
