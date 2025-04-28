import Navbar from "../components/Navbar";
import styles from "../styles/CreditLine.module.css";

export default function CreditLinePage() {
  // dummy data — swap these for real props when you connect your backend
  const btcCollateral = "2.50";
  const totalLine = "$70,000";
  const available = "$30,000";

  const products = [
    { title: "Cash Withdrawal", amount: "$20,000", interest: "11.50%" },
    { title: "Revolving Credit", amount: "$20,000", interest: "15.00%" },
  ];

  const transactions = [
    { date: "05/02/2024", desc: "Interest Payment", amount: "-$200", balance: "$30,300" },
    { date: "05/01/2024", desc: "Cash Withdrawal", amount: "-$2,000", balance: "$30,500" },
    { date: "04/24/2024", desc: "Balance Transfer", amount: "-$5,000", balance: "$32,500" },
    { date: "04/12/2024", desc: "Expense", amount: "-$450", balance: "$37,500" },
    { date: "04/05/2024", desc: "Repayment", amount: "$1,500", balance: "$37,950" },
  ];

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.heading}>Credit Line</h1>

        {/* top summary row */}
        <section className={styles.summary}>
          <div className={styles.metric}>
            <div className={styles.label}>BTC Collateral</div>
            <div className={styles.value}>{btcCollateral}</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.label}>Total Credit Line</div>
            <div className={styles.value}>{totalLine}</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.label}>Available Credit</div>
            <div className={styles.value}>{available}</div>
          </div>
        </section>

        {/* product cards */}
        <section className={styles.products}>
          {products.map((p) => (
            <div key={p.title} className={styles.productCard}>
              <div className={styles.productTitle}>{p.title}</div>
              <div className={styles.productValue}>{p.amount}</div>
              <div className={styles.interest}>Interest: {p.interest}</div>
            </div>
          ))}
        </section>

        {/* transactions table */}
        <section className={styles.transactions}>
          <h2 className={styles.subheading}>Transactions</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Amount</th>
                <th className={styles.th}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i} className={i % 2 === 0 ? styles.even : ""}>
                  <td className={styles.td}>{tx.date}</td>
                  <td className={styles.td}>{tx.desc}</td>
                  <td className={styles.td}>{tx.amount}</td>
                  <td className={styles.td}>{tx.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
// example: src/pages/dashboard.tsx
import { GetServerSideProps } from "next";
import { getTokenFromRequest, verifyToken } from "src/lib/auth";

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
