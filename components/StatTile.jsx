import styles from "./StatTile.module.css";

export default function StatTile({ value, label }) {
  return (
    <div className={styles.tile}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
