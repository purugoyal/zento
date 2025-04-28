// src/lib/auth.ts
import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

const TOKEN_NAME = "zento_token";
const SECRET = process.env.JWT_SECRET!; // set this in your .env

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET) as { userId: number; email: string };
}

// Helpers to set / remove cookie
export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", cookie);
}

export function getTokenFromRequest(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || "");
  return cookies[TOKEN_NAME];
}
