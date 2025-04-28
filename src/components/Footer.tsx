// src/components/Footer.tsx
export default function Footer() {
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
