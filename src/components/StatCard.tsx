// src/components/StatCard.tsx
import React, { ReactElement } from "react";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  /** only accept a React element (e.g. <FaWallet />) */
  icon?: ReactElement;
  href?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  href,
}: StatCardProps) {
  const CardInner = (
    <div
      style={{
        background: "#fff",
        border: "1px solid #eaeaea",
        borderRadius: "0.75rem",
        padding: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        color: "#111",
      }}
    >
      {icon && <div style={{ fontSize: "1.5rem" }}>{icon}</div>}
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: 0, fontWeight: "bold" }}>{value}</p>
      {subtitle && <small style={{ color: "#666" }}>{subtitle}</small>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
        {CardInner}
      </Link>
    );
  }
  return CardInner;
}
