import styles from "./StatTile.module.css";

export default function StatTile({ value, label, className = "", ...rest }) {
  return (
    <div className={`${styles.tile} ${className}`} {...rest}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
