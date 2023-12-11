import { PrismaClient } from "@prisma/client";
import Jwt from "jsonwebtoken";
export const prisma = new PrismaClient();

export const generateToken = (email: string) => {
  return Jwt.sign({ email }, String(process.env.SECRETE_KEY), {
    expiresIn: "30d",
  });
};
