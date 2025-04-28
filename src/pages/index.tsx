// src/pages/index.tsx
import Link from "next/link";
export default function Home() {
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "4rem", fontSize: "2.5rem" }}>
        Banking built for the Bitcoin era
      </h1>
      <p style={{ textAlign: "center", color: "#aaa" }}>
        ZENTO brings you modern credit, investing, and mortgages—all powered by your assets.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
        <Link href="/signup"><button className="button">Get Started</button></Link>
        <Link href="/learn-more"><button className="button">Learn More</button></Link>
      </div>
    </>
  );
}
