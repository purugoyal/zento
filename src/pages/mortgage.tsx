// src/pages/mortgage.tsx
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { getTokenFromRequest, verifyToken } from "../lib/auth";

export default function MortgagePage() {
  return (
    <Layout>
      <h1>Mortgage</h1>
      <p>Your mortgage dashboard and forms go here.</p>
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
