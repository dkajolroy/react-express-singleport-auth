import { Router } from "express";

export const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  res.status(200).send({ message: "Success!" });
});
