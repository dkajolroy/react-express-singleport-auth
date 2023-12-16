import { Request, Response, Router } from "express";
import { authentication } from "../utils/authentication";

export const userRouter = Router();

userRouter.post("/profile", authentication, (req: Request, res: Response) => {
  res
    .cookie("fff", "vvvv", {
      expires: new Date(Date.now() + 5000000),
      httpOnly: true,
    })
    .status(200)
    .send({ message: "Success!" });
});
