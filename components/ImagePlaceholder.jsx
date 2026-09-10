import styles from "./ImagePlaceholder.module.css";

export default function ImagePlaceholder({ label = "Image coming soon", radius = 16, style, className = "", ...rest }) {
  return (
    <div
      className={`${styles.placeholder} ${className}`}
      style={{ borderRadius: radius, ...style }}
      {...rest}
    >
      <span className={styles.label}>{label}</span>
    </div>
  );
}
