// src/pages/dashboard.tsx
import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import StatCard from "../components/StatCard";
import { GetServerSideProps } from "next";
import {
  FaWallet,
  FaStar,
  FaCoins,
  FaPercent,
  FaChartLine,
  FaBitcoin,
  FaTrashAlt,
} from "react-icons/fa";

interface CollateralEntry {
  id: number;
  amount: number;
  createdAt: string;
}

interface Transaction {
  date: string;
  description: string;
  amount: number;   // negative = spend, positive = payment
  method: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  // redirect if not signed in
  useEffect(() => {
    if (session === null) router.replace("/login");
  }, [session, router]);

  // 1) live BTC price
  const [btcPrice, setBtcPrice] = useState(0);
  useEffect(() => {
    async function fetchPrice() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const json = await res.json();
      setBtcPrice(json.bitcoin.usd);
    }
    fetchPrice();
    const iv = setInterval(fetchPrice, 60000);
    return () => clearInterval(iv);
  }, []);

  // 2) collateral history + form
  const [history, setHistory] = useState<CollateralEntry[]>([]);
  const [inputBTC, setInputBTC] = useState("");
  useEffect(() => {
    fetch("/api/collateral")
      .then((r) => r.json())
      .then((data) => setHistory(data.history || []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(inputBTC);
    if (isNaN(amt)) return alert("Enter a valid number");
    const res = await fetch("/api/collateral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amt }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json.error || res.statusText);
    setHistory((h) => [json.entry, ...h]);
    setInputBTC("");
  }

  function handleDelete(id: number) {
    if (!confirm("Remove this entry?")) return;
    const entry = history.find((e) => e.id === id)!;
    fetch("/api/collateral", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: -entry.amount }),
    });
    setHistory((h) => h.filter((e) => e.id !== id));
  }

  // derived collateral totals
  const totalBTC = history.reduce((sum, e) => sum + e.amount, 0);
  const totalUSD = totalBTC * btcPrice;
  const creditLine = totalUSD * 0.5; // 50% LTV

  // 4) hard-coded credit card transactions
  const transactions: Transaction[] = [
    { date: "2025-04-27", description: "Coffee Shop", amount: -25.0, method: "Credit Card" },
    { date: "2025-04-26", description: "Grocery Store", amount: -125.0, method: "Credit Card" },
    { date: "2025-04-20", description: "Rent", amount: -3000.0, method: "Credit Card" },
    { date: "2025-04-22", description: "Payment", amount: 900.0, method: "Credit Card" },
  ];
  const creditBalance = Number(
    (-transactions.reduce((sum, tx) => sum + tx.amount, 0)).toFixed(2)
  );
  const totalRewardsSats = Math.floor(
    transactions
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => {
        const usd = Math.abs(tx.amount);
        const btcEarned = (usd * 0.02) / btcPrice;
        return sum + btcEarned * 1e8;
      }, 0)
  );

  return (
    <main style={{ padding: "2rem" }}>
      {/* only the welcome heading */}
      <h1>Welcome back, {session?.user?.name ?? "friend"}!</h1>

      {/* stats grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <StatCard
          icon={<FaWallet size={24} />}
          title="Total Credit Balance"
          value={`$${creditBalance.toFixed(2)}`}
        />
        <StatCard
          icon={<FaStar size={24} />}
          title="Total Rewards"
          value={`${totalRewardsSats.toLocaleString()} sats`}
        />
        <StatCard
          icon={<FaCoins size={24} />}
          title="Total Credit Line"
          value={`$${creditLine.toFixed(2)}`}
        />
        <StatCard
          icon={<FaBitcoin size={24} />}
          title="Total Collateral"
          value={`${totalBTC.toFixed(4)} BTC`}
          subtitle={`(~$${totalUSD.toFixed(2)})`}
        />
        <StatCard icon={<FaPercent size={24} />} title="Current LTV" value="50%" />
        <StatCard icon={<FaChartLine size={24} />} title="Current APR" value="10%" />
      </div>

      {/* collateral history */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Collateral History</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}
        >
          <input
            type="number"
            step="any"
            placeholder="Collateral BTC (+ or –)"
            value={inputBTC}
            onChange={(e) => setInputBTC(e.target.value)}
            style={{ flex: 1, padding: "0.5rem", borderRadius: 4 }}
          />
          <button type="submit">Post</button>
        </form>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((e) => (
            <li
              key={e.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {(e.amount > 0 ? "+" : "") + e.amount.toFixed(4)} BTC @{" "}
                {new Date(e.createdAt).toLocaleString(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              <button
                onClick={() => handleDelete(e.id)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* recent activity */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Recent Activity</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
              <th style={{ padding: "0.5rem" }}>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.5rem 0" }}>{tx.date}</td>
                <td>{tx.description}</td>
                <td style={{ color: tx.amount < 0 ? "#e25555" : "#2a9d8f" }}>
                  {tx.amount < 0 ? "" : "+"}${Math.abs(tx.amount).toFixed(2)}
                </td>
                <td>{tx.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
};
