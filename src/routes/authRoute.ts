import { Router } from "express";
import { generateToken, prisma } from "./../utils/config";

const authRouter = Router();

// Login
authRouter.post("/login", async (req, res, next) => {
  const { username, password }: { username?: String; password?: string } =
    req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "Invalid username or password" });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: username.toLowerCase() },
        ],
      },
    });
    if (!user) {
      return res.status(401).send({ message: "User not found !" });
    }

    const token = generateToken(user.email);
    res.status(200).send({
      token: token,
      user,
      message: "Login Success!",
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
    res.status(200).send({
      token: token,
      user,
      message: "Signup Success!",
    });
  } catch (error) {
    next(error);
  }
});
export { authRouter };
