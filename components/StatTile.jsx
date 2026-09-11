import styles from "./StatTile.module.css";

export default function StatTile({ value, label, className = "", ...rest }) {
  return (
    <div className={`${styles.tile} ${className}`} {...rest}>
      <h4 className={styles.value}>{value}</h4>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
