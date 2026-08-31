import styles from "./ProcessStep.module.css";

export default function ProcessStep({ title, description, image }) {
  return (
    <div className={styles.step}>
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title} className={styles.image} />
      )}
    </div>
  );
}
