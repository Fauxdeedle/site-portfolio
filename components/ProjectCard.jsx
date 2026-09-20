import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({
  slug,
  name,
  category,
  year,
  description,
  thumbnail,
  className = "",
  ...rest
}) {
  return (
    <Link href={`/work/${slug}`} className={`${styles.card} ${className}`} {...rest}>
      <div className={styles.cardBorder} aria-hidden="true" />
      <div className={styles.cardContent}>
        <div className={styles.imageWrap}>
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnail} alt={`${name} work sample`} className={styles.image} />
          ) : (
            <ImagePlaceholder label={`Drop ${name?.toLowerCase()} image`} className={styles.image} radius={16} />
          )}
        </div>
        <span className={styles.title}>{name}</span>
        <div className={styles.tags}>
          {category && <span className={styles.tag}>{category}</span>}
          {year && <span className={styles.tag}>{year}</span>}
        </div>
        <span className={styles.description}>{description}</span>
      </div>
    </Link>
  );
}
