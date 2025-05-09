// src/pages/login.tsx
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const router                  = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      // show a friendly message instead of raw error
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "0 1rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Log In</h1>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: 4, border: "1px solid #ccc" }}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.75rem", borderRadius: 4, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            borderRadius: 4,
            border: "none",
            background: "#0070f3",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

// If the user is already logged in, redirect to dashboard
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }
  return { props: {} };
};
