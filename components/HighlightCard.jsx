import styles from "./HighlightCard.module.css";

export default function HighlightCard({ items, className = "", ...rest }) {
  const isSplit = items.length === 2;

  return (
    <div className={`${styles.card} ${className}`} {...rest}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`${styles.half} ${isSplit && i === 0 ? styles.ink : styles.paper}`}
        >
          <span className={styles.label}>{item.label}</span>
          <span className={styles.body}>{item.body}</span>
        </div>
      ))}
    </div>
  );
}
