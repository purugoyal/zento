import Link from "next/link";
import styles from "../styles/CreditCard.module.css";

export default function CreditCardPage() {
  const creditLine = "$70,000";
  const apr = "12.99%";
  const interestPayment = "$59.12";

  const history = [
    { merchant: "Online Retailer", amount: "$120.25" },
    { merchant: "Coffee Shop",    amount: "$6.50"   },
    { merchant: "Diner",          amount: "$24.89"  },
    { merchant: "Gas Station",    amount: "$47.65"  },
  ];

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Credit Card</h1>

      <div className={styles.cardMock}>
        <div className={styles.chip} />
        <div className={styles.dots}>•••• •••• •••• 3456</div>
        <div className={styles.visa}>VISA</div>
      </div>

      <Link href="/credit-card/details" className={styles.detailsLink}>
        Card details &gt;
      </Link>

      <section className={styles.stats}>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Credit Line</div>
          <div className={styles.statValue}>{creditLine}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>APR</div>
          <div className={styles.statValue}>{apr}</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>Interest Payment</div>
          <div className={styles.statValue}>{interestPayment}</div>
        </div>
      </section>

      <button className={styles.payButton}>Make Payment</button>

      <section className={styles.history}>
        <div className={styles.historyHeader}>
          <h2 className={styles.historyTitle}>Transaction History</h2>
          <Link href="/credit-card/history" className={styles.viewAll}>
            View all &gt;
          </Link>
        </div>
        <ul className={styles.historyList}>
          {history.map((tx, i) => (
            <li key={i} className={styles.historyItem}>
              <span>{tx.merchant}</span>
              <span>{tx.amount}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
