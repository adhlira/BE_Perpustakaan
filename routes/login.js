import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Router } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const secretKey = "unitedfansclub";

  const user = await prisma.users.findUnique({ where: { username: username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Username atau Password salah" });
  }

  try {
    const expiresIn = "1h";
    const expiredAt = new Date(Date.now() + 60 * 60 * 1000);

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });
    await prisma.tokens.create({
      data: {
        userId: user.id,
        token,
        expiredAt,
      },
    });
    return res.json({ token, expiredAt });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
