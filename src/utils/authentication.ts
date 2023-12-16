import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies; // access_token

  if (token.access_token) {
    try {
      Jwt.verify(token.access_token, process.env.SECRETE_KEY);

      next();
    } catch (error) {
      res
        .clearCookie("access_token")
        .status(400)
        .send({ message: "Login expired please login again" });
    }
  } else {
    res.status(400).send({ message: "You are not login" });
  }
};
