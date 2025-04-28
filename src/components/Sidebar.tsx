// src/components/Sidebar.tsx
import React from "react";
import Link from "next/link";

export interface SidebarProps {
  activePage: string;
}

export default function Sidebar({ activePage }: SidebarProps) {
  const items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Credit Line", href: null },
    { label: "Marketplace", href: null },
    { label: "Mortgage", href: null },
    { label: "Settings", href: null },
    { label: "Help Center", href: null },
  ];

  return (
    <aside
      style={{
        width: 200,
        borderRight: "1px solid #eaeaea",
        padding: "2rem 1rem",
        boxSizing: "border-box",
      }}
    >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((it) => {
          const isActive = it.href === "/" + activePage;
          return (
            <li key={it.label} style={{ marginBottom: "1rem" }}>
              {it.href ? (
                <Link
                  href={it.href}
                  style={{
                    display: "block",
                    padding: "0.5rem 1rem",
                    borderRadius: 4,
                    textDecoration: "none",
                    color: isActive ? "#fff" : "#000",
                    background: isActive ? "#0070f3" : "transparent",
                  }}
                >
                  {it.label}
                </Link>
              ) : (
                <span
                  style={{
                    display: "block",
                    padding: "0.5rem 1rem",
                    color: "#888",
                  }}
                >
                  {it.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
