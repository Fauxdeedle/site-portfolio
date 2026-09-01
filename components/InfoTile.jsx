import styles from "./InfoTile.module.css";

export default function InfoTile({ label, value, className = "", ...rest }) {
  return (
    <div className={`${styles.tile} ${className}`} {...rest}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
