import styles from "./Marquee.module.css";

const DEFAULT_ITEMS = [
  "Graphic Design",
  "Branding",
  "Web Design",
  "Print",
  "Illustration",
];

function Sparkle() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={styles.sparkle}
      aria-hidden="true"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}

function MarqueeTrack({ items, hidden = false }) {
  return (
    <div className={styles.track} aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span className={styles.item} key={index}>
          {item}
          <Sparkle />
        </span>
      ))}
    </div>
  );
}

export default function Marquee({ items = DEFAULT_ITEMS, className = "", ...rest }) {
  return (
    <div className={`${styles.root} ${className}`} {...rest}>
      <div className={styles.bar}>
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} hidden />
      </div>
    </div>
  );
}
