import styles from "./InfoTile.module.css";

export default function InfoTile({ label, value, className = "", ...rest }) {
  return (
    <div className={`${styles.tile} ${className}`} {...rest}>
      <div className={styles.label}>{label}</div>
      <h4 className={styles.value}>{value}</h4>
    </div>
  );
}
