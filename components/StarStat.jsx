import styles from "./StarStat.module.css";

export default function StarStat({ value, label, className = "", ...rest }) {
  return (
    <div className={`${styles.badge} ${className}`} {...rest}>
      <h4 className={styles.value}>{value}</h4>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
