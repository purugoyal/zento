// src/components/Button.tsx
import React, { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The things you put inside <Button>…</Button> */
  children: ReactNode;
}

/** A fully‐typed button with default styling */
export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      style={{
        padding: "0.5rem 1rem",
        background: "#0070f3",
        border: "none",
        borderRadius: 4,
        color: "#fff",
        cursor: "pointer",
        fontSize: "1rem",
      }}
    >
      {children}
    </button>
  );
}
