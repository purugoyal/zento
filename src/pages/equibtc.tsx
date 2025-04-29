// src/pages/equibtc.tsx
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import CountryFlagSelect from "../components/CountryFlagSelect";
import { getTokenFromRequest, verifyToken } from "../lib/auth";

export default function EquiBTCPage() {
  return (
    <Layout>
      <h1>EquiBTC Collateral</h1>
      {/* example component: swap through your country flags */}
      <CountryFlagSelect />
      {/* TODO: drop in your EquiBTC charts, tables, etc. */}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = getTokenFromRequest(req as any);
  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  try {
    verifyToken(token);
    return { props: {} };
  } catch {
    return { redirect: { destination: "/login", permanent: false } };
  }
};
