// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // 1) Enable NextAuth debug + custom logger
  debug: true,
  logger: {
    error(code, metadata) {
      console.error("❌ NextAuth ERROR", code, metadata);
    },
    warn(code) {
      console.warn("⚠️ NextAuth WARN", code);
    },
    debug(code, metadata) {
      console.debug("🐛 NextAuth DEBUG", code, metadata);
    },
  },

  // 2) Wire up Prisma adapter
  adapter: PrismaAdapter(prisma),

  // 3) Credentials provider
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email:    { label: "Email",    type: "email",    placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🛠 authorize() start", { credentialsProvided: !!credentials });

        if (!credentials) {
          console.error("🚫 authorize() called without credentials");
          return null;
        }

        console.log("🛠 authorize() credentials:", { email: credentials.email });

        let user;
        try {
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });
          console.log("🛠 authorize() found user:", user);
        } catch (err) {
          console.error("🔥 authorize() prisma.findUnique error:", err);
          throw new Error("Database lookup failed");
        }

        if (!user) {
          console.warn("⚠️ authorize() no user for that email");
          return null;
        }

        let isValid: boolean;
        try {
          isValid = await bcrypt.compare(credentials.password, user.password);
          console.log("🛠 authorize() bcrypt.compare result:", isValid);
        } catch (err) {
          console.error("🔥 authorize() bcrypt.compare error:", err);
          throw new Error("Password check failed");
        }

        if (!isValid) {
          console.warn("⚠️ authorize() invalid password");
          return null;
        }

        console.log("✅ authorize() success, returning user");
        return {
          id:    user.id.toString(),
          email: user.email,
          name:  `${user.firstName} ${user.lastName}`,
        };
      },
    }),
  ],

  // 4) Callbacks to persist `token.id` → `session.user.id`
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },

  // 5) Custom sign-in & error pages
  pages: {
    signIn: "/login",
    error:  "/login",
  },

  // 6) Use JWT sessions
  session: {
    strategy: "jwt",
  },

  // 7) NEXTAUTH_SECRET must be set in your ENV
};

export default NextAuth(authOptions);
