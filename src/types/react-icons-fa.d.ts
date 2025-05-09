// src/types/react-icons-fa.d.ts
import * as React from "react";

declare module "react-icons/fa" {
  /** Each Font-Awesome icon is really a React.FC producing an SVG element */
  export const FaWallet: React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaStar:   React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaCoins:  React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaPercent:React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaChartLine:React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaBitcoin:React.FC<React.SVGProps<SVGSVGElement>>;
  export const FaTrashAlt:React.FC<React.SVGProps<SVGSVGElement>>;
}
