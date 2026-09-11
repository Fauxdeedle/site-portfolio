import Icon from "./Icon";
import styles from "./HomeCard.module.css";

export default function HomeCard({
  icon = "graphic",
  title = "Graphic & Print",
  description = "Bringing your brand to life.",
  items = [],
  className = "",
  ...rest
}) {
  return (
    <div className={`${styles.card} ${className}`} {...rest}>
      <div className={styles.iconWrap}>
        <Icon name={icon} size="100%" strokeWidth={1.2} />
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
      {items.length > 0 && (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
