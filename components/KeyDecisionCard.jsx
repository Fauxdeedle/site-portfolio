import styles from "./KeyDecisionCard.module.css";

export default function KeyDecisionCard({ title, description, className = "", ...rest }) {
  return (
    <div className={`${styles.card} ${className}`} {...rest}>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
}
