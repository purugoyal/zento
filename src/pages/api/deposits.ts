// src/pages/api/deposits.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const DUMMY_ADDRESS = "tb1qtestaddress0000000000000000000000000000000";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) Authenticate
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid auth" });
  }

  let payload: any;
  try {
    payload = jwt.verify(auth.split(" ")[1], JWT_SECRET);
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
  const userId = Number(payload.userId);

  // 2) Only allow GET
  if (req.method === "GET") {
    try {
      // stub out an address since we’re skipping RPC
      const address = DUMMY_ADDRESS;

      // record a new zero-BTC collateral entry
      await prisma.collateral.create({
        data: {
          userId,
          amount: 0,          // zero BTC
        },
      });

      return res.status(200).json({ address });
    } catch (err: any) {
      console.error("Deposit GET error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // 3) everything else not allowed
  res.setHeader("Allow", ["GET"]);
  res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
