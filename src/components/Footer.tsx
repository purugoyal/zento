// src/components/Footer.tsx
import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem 0",
        borderTop: "1px solid #eaeaea",
        background: "#fff",
      }}
    >
      © {new Date().getFullYear()} ZENTO
    </footer>
  );
}
