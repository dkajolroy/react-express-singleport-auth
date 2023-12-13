import { Router } from "express";
import { generateToken, initConfig, prisma } from "./../utils/config";

export const authRouter = Router();

// Login
authRouter.post("/login", async (req, res, next) => {
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
        message: "Signup Success!",
      });
  } catch (error) {
    next(error);
  }
});

// Sign up with Google and Credentials
interface InputUser {
  password?: string;
  email?: string;
  phone?: string;
  name?: string;
}
authRouter.post("/signup", async (req, res, next) => {
  const { password, email, name }: InputUser = req.body;
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
        name,
        username,
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
  } catch (error) {
    next(error);
  }
});
