"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import styles from "./ProjectShowcase.module.css";

export default function ProjectShowcase({ projects = [], className = "", ...rest }) {
  const [index, setIndex] = useState(0);

  if (projects.length === 0) return null;

  const project = projects[index];
  const count = projects.length;

  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  return (
    <div className={`${styles.root} ${className}`} {...rest}>
      <div className={styles.frameBorder} aria-hidden="true" />
      <div className={styles.content}>
        <div className={styles.imageSide}>
          {project.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.thumbnail} alt={`${project.name} preview`} className={styles.image} />
          ) : (
            <ImagePlaceholder label={`Drop ${project.name?.toLowerCase()} image`} className={styles.image} radius={0} />
          )}

          {count > 1 && (
            <div className={styles.stepper}>
              <button
                type="button"
                className={styles.stepperButton}
                onClick={goPrev}
                aria-label="Previous project"
              >
                <Icon name="arrow-left" size={20} style={{ color: "var(--white)" }} />
              </button>
              <span className={styles.stepperCount}>
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                className={styles.stepperButton}
                onClick={goNext}
                aria-label="Next project"
              >
                <Icon name="arrow-right" size={20} style={{ color: "var(--white)" }} />
              </button>
            </div>
          )}
        </div>

        <div className={styles.textSide}>
          <div className={styles.tags}>
            {project.category && <span className={styles.tag}>{project.category}</span>}
            {project.year && <span className={styles.tag}>{project.year}</span>}
          </div>
          <h3 className={styles.title}>{project.name}</h3>
          <p className={styles.description}>{project.description}</p>
          {project.slug && (
            <Link href={`/work/${project.slug}`} className={styles.cta}>
              See project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
