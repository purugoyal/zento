// src/components/Navbar.tsx
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface NavbarProps {
  isAuthed: boolean;
}

export default function Navbar({ isAuthed }: NavbarProps) {
  const { pathname } = useRouter();
  // capitalize first letter, drop leading slash
  const page = pathname === "/" ? "" : " " + pathname.slice(1).replace(/^\w/, (c) => c.toUpperCase());

  return (
    <nav
      style={{
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        padding:        "1rem 2rem",
        borderBottom:   "1px solid #eaeaea",
        background:     "#fff",
        color:          "#000",
      }}
    >
      {/* Logo + active page */}
      <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
        <Link href="/">ZENTO</Link>
        <span style={{ fontSize: "1rem", marginLeft: "0.5rem", color: "#555" }}>{page}</span>
      </div>

      {/* Right-hand actions */}
      <div>
        {isAuthed ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              background:    "#d9534f",
              color:         "#fff",
              border:        "none",
              padding:       "0.5rem 1rem",
              borderRadius:  4,
              cursor:        "pointer",
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
              <button style={{ padding: "0.5rem 1rem" }}>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
