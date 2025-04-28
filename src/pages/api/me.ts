// src/pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getTokenFromRequest, verifyToken } from "src/lib/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { userId } = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true },
    });
    return res.status(200).json({ user });
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
