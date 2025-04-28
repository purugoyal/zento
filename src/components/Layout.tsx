import { ReactNode } from "react";
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
  const isLanding = pathname === "/";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top nav always */}
      <Navbar isAuthed={isAuthed} activePage={pathname.replace("/", "") || "dashboard"} />

      {/* Main body */}
      <div style={{ flex: 1, display: "flex", background: "#fff" }}>
        {/* Sidebar only when signed in */}
        {isAuthed && <Sidebar activePage={pathname.replace("/", "") || "dashboard"} />}

        {/* Page content */}
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

      {/* Footer only on landing page, unauthenticated */}
      {!isAuthed && isLanding && <Footer />}
    </div>
  );
}
