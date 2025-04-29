// src/pages/credit-line.tsx
import Card from '../components/Card'
import Button from '../components/Button'

export default function CreditLine() {
  return (
    <div>
      <h1>Bitcoin‑Backed Loan</h1>
      <Card style={{ padding:20, marginBottom:20, display:'flex', justifyContent:'space-between' }}>
        <div><h2>31,800 USD</h2><p>Available Credit</p></div>
        <div><h2>8,200 USD</h2><p>Current Balance</p></div>
        <Button>Withdraw Funds</Button>
      </Card>
    </div>
  )
}
// example: src/pages/dashboard.tsx
import { GetServerSideProps } from "next";
import { getTokenFromRequest, verifyToken } from "../../lib/auth";


export default function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
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
