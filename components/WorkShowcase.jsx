"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import Switcher from "@/components/Switcher";
import styles from "@/app/page.module.css";

const TYPES = ["Product", "Graphic"];

export default function WorkShowcase({ projects }) {
  const [type, setType] = useState(TYPES[0]);

  const filtered = projects.filter((p) => p.type === type.toLowerCase());
  const featured = filtered.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <>
      <div className={styles.workHeader}>
        <h2 className={styles.sectionHeading}>Some of my work</h2>
        <Switcher options={TYPES} value={type} onChange={setType} />
      </div>
      <div className={styles.projectGrid}>
        {featured.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            name={project.name}
            category={project.category}
            year={project.year}
            description={project.description}
            thumbnail={project.thumbnail}
          />
        ))}
      </div>
    </>
  );
}
