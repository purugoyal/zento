// src/pages/signup.tsx
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

export default function SignupPage() {
  const [firstName, setFirstName]     = useState("");
  const [lastName, setLastName]       = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [error, setError]             = useState<string | null>(null);
  const router                        = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1) Send to your existing API route
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "An unexpected error occurred.");
      return;
    }

    // 2) Auto-sign in and redirect
    const signInResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (signInResult?.error) {
      setError(signInResult.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ padding: "4rem 1rem", maxWidth: 400, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Create Account
      </h1>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <label style={{ fontWeight: 500 }}>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <label style={{ fontWeight: 500 }}>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <label style={{ fontWeight: 500 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <label style={{ fontWeight: 500 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: "100%",
          }}
        />

        <label style={{ fontWeight: 500 }}>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirm(e.target.value)}
          required
          style={{
            padding: "0.75rem",
            borderRadius: 4,
            border: "1px solid #ccc",
            width: "100%",
          }}
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

// Redirect away if already logged in
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (session) {
    return { redirect: { destination: "/dashboard", permanent: false } };
  }
  return { props: {} };
};
