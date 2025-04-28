// src/components/Card.tsx
import React, { ReactNode, CSSProperties } from "react";

export interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Card({ children, style }: CardProps) {
  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
}
