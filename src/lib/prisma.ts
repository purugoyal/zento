// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // prevent multiple instances in dev
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.__prisma = prisma;
