import { NextFunction, Request, Response } from "express";
import { generateToken, initConfig, prisma } from "../utils/config";

// Login function
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: { username?: string; password?: string } =
    req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "Invalid your form data" });
  }
  try {
    const exist = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLocaleLowerCase() },
          {
            email: username.toLocaleLowerCase(),
          },
        ],
      },
    });
    if (!exist || exist.password !== password) {
      return res.status(400).send({ message: "Invalid username or password" });
    }
    const token = generateToken(exist.email);
    res
      .cookie("access_token", token, {
        expires: initConfig.loginExpiresIn,
        httpOnly: true,
      })
      .status(200)
      .send({
        token: token,
        user: exist,
        message: "Login Success!",
      });
  } catch (error) {
    next(error);
  }
};

// Sign up with Google and Credentials
interface InputUser {
  password?: string;
  email?: string;
  phone?: string;
  name?: string;
  image?: string;
}
const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { password, email, name, image }: InputUser = req.body;
  if (!email || !password || !name) {
    return res.status(400).send({ message: "Invalid form data !" });
  }

  const username = name.toString().toLowerCase() + Date.now();
  try {
    const exits = await prisma.user.findFirst({ where: { email: email } });
    if (exits) {
      return res.status(400).send({ message: "User already exist !" });
    }
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        image,
        name,
        username,
        isEmailVarify: password === "blank",
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        isEmailVarify: true,
        isPhoneVarify: true,
        image: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });
    const token = generateToken(email);
    res
      .cookie("access_token", token, {
        expires: initConfig.loginExpiresIn,
        httpOnly: true,
      })
      .status(200)
      .send({
        token: token,
        user,
        message: "Signup Success!",
      });
  } catch (error) {
    next(error);
  }
};

// Social Login
const oAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { password, email, name, image }: InputUser = req.body;
  try {
    const exist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (exist) {
      const token = generateToken(exist.email);
      res
        .cookie("access_token", token, {
          expires: initConfig.loginExpiresIn,
          httpOnly: true,
        })
        .status(200)
        .send({
          token: token,
          user: exist,
          message: "Signup Success!",
        });
    } else {
      const username = name.toString().toLowerCase() + Date.now();
      const user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          image,
          name,
          username,
          isEmailVarify: password === "blank",
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
          username: true,
          phone: true,
          created_at: true,
          updated_at: true,
        },
      });
      const token = generateToken(email);
      res
        .cookie("access_token", token, {
          expires: initConfig.loginExpiresIn,
          httpOnly: true,
        })
        .status(200)
        .send({
          token: token,
          user,
          message: "Signup Success!",
        });
    }
  } catch (error) {
    next(error);
  }
};

const authController = {
  signup,
  login,
  oAuth,
};
export default authController;
