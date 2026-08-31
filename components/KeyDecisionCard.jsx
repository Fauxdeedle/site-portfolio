import styles from "./KeyDecisionCard.module.css";

export default function KeyDecisionCard({ title, description }) {
  return (
    <div className={styles.card}>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
}
