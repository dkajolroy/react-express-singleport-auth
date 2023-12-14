import { Router } from "express";
import authController from "../controllers/authController";

export const authRouter = Router();

// Login
authRouter.post("/login", authController.login);

authRouter.post("/signup", authController.signup);
authRouter.post("/oauh", authController.oAuth);
