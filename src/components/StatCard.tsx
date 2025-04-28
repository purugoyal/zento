// src/components/StatCard.tsx
import React, { ReactNode, CSSProperties } from "react";
import Link from "next/link";

export interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  href?: string;
  style?: CSSProperties;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  href,
  style,
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
        ...(style || {}),
      }}
    >
      {icon && <div style={{ fontSize: "1.5rem" }}>{icon}</div>}
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ margin: 0, fontWeight: "bold" }}>{value}</p>
      {subtitle && <small style={{ color: "#666" }}>{subtitle}</small>}
    </div>
  );

  return href ? (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      {CardInner}
    </Link>
  ) : (
    CardInner
  );
}
