import styles from "./ImagePlaceholder.module.css";

export default function ImagePlaceholder({ label = "Image coming soon", radius = 16, style }) {
  return (
    <div className={styles.placeholder} style={{ borderRadius: radius, ...style }}>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
