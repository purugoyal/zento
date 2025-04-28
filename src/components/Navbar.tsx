// src/components/Navbar.tsx
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export interface NavbarProps {
  isAuthed: boolean;
  activePage: string;
}

export default function Navbar({ isAuthed, activePage }: NavbarProps) {
  const displayPage =
    activePage === "" ? "" : " " + activePage[0].toUpperCase() + activePage.slice(1);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #eaeaea",
        background: "#fff",
        color: "#000",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        <Link href="/">ZENTO</Link>
        <span style={{ fontSize: "1rem", marginLeft: "0.5rem", color: "#555" }}>
          {displayPage}
        </span>
      </div>
      <div>
        {isAuthed ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              background: "#d9534f",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/login">
              <button style={{ marginRight: 8, padding: "0.5rem 1rem" }}>
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button style={{ padding: "0.5rem 1rem" }}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
