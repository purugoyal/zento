// src/pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // 1) validate all fields present
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // 2) check passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  // 3) check if email already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ error: "Email already in use." });
  }

  // 4) hash the password
  const hash = await bcrypt.hash(password, 10);

  // 5) create the user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hash,
    },
  });

  // 6) done!
  return res.status(201).json({ message: "User created", userId: user.id });
}
