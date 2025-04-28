// src/components/Layout.tsx
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const isAuthed = !!session?.user;
  const activePage = pathname === "/" ? "" : pathname.slice(1);
  const isLanding = pathname === "/";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar isAuthed={isAuthed} activePage={activePage} />
      <div style={{ flex: 1, display: "flex", background: "#fff" }}>
        {isAuthed && <Sidebar activePage={activePage} />}
        <main
          style={{
            flex: 1,
            padding: isLanding ? "4rem" : "2rem",
            background: "#fff",
            color: "#000",
          }}
        >
          {children}
        </main>
      </div>
      {!isAuthed && isLanding && <Footer />}
    </div>
  );
}
