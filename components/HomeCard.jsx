import Icon from "./Icon";
import styles from "./HomeCard.module.css";

export default function HomeCard({ icon = "graphic", title = "Graphic & Print", description = "Bringing your brand to life." }) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrap}>
        <Icon name={icon} size={120} strokeWidth={1.2} />
      </div>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  );
}
