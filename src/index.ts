import cookiePerser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { authRouter } from "./routes/authRoute";
import { userRouter } from "./routes/userRoute";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePerser());

// config routes
// use to top of static paths
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// config frontend
// use to bottom of static api routes
const __projectRoot = path.resolve();
app.use(express.static(path.join(__projectRoot, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__projectRoot, "client/dist/index.html"));
});

//  if you don't use proxy in a frontend
// app.use(
//   cors({
//     origin: "http://localhost:5173", //fontend url
//     credentials: true,
//   })
// );

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
