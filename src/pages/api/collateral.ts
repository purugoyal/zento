// src/pages/api/collateral.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";    // adjust path if needed
import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) Grab the session with getServerSession
  const session = await getServerSession(req, res, authOptions);
  console.log("🚨 [/api/collateral] session via getServerSession:", session);

  if (!session?.user?.email) {
    return res
      .status(401)
      .json({ error: "Not authenticated (no session or missing email)" });
  }

  // 2) Lookup our user
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // 3) GET /api/collateral → historical entries
  if (req.method === "GET") {
    const history = await prisma.collateral.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ history });
  }

  // 4) POST /api/collateral → add a new entry
  if (req.method === "POST") {
    const { amount } = req.body;
    if (typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const entry = await prisma.collateral.create({
      data: { userId: user.id, amount },
    });
    return res.status(201).json({ entry });
  }

  // 5) anything else is not allowed
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
