"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Switcher from "@/components/Switcher";
import styles from "@/app/page.module.css";

const TYPES = ["Product", "Graphic"];

export default function WorkShowcase({ projects }) {
  const [type, setType] = useState(TYPES[0]);

  const filtered = projects.filter((p) => p.type === type.toLowerCase());
  const [featured, ...rest] = filtered;
  const teasers = rest.slice(0, 2);

  if (!featured) return null;

  const featuredThumbnail = featured.thumbnail;

  return (
    <>
      <div className={styles.workHeader}>
        <h2 className={styles.sectionHeading}>Some of my work</h2>
        <Switcher options={TYPES} value={type} onChange={setType} />
      </div>
      <Link key={featured.slug} href={`/work/${featured.slug}`} className={styles.featured}>
        {featuredThumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={featuredThumbnail}
            alt={`${featured.name} work sample`}
            className={styles.featuredImage}
          />
        ) : (
          <div className={styles.featuredImagePlaceholder}>
            <ImagePlaceholder label={`${featured.name} cover`} />
          </div>
        )}
        <div className={styles.featuredBody}>
          <span className={styles.featuredCategory}>{featured.name}</span>
          <span className={styles.featuredTag}>{featured.category}</span>
          <span className={styles.featuredDescription}>{featured.description}</span>
          <Button type="button" tabIndex={-1}>
            See more
          </Button>
        </div>
      </Link>
      <div className={styles.teasers}>
        {teasers.map((project) => {
          const thumbnail = project.thumbnail;
          return (
            <Link key={project.slug} href={`/work/${project.slug}`} className={styles.teaser}>
              <div className={styles.teaserImage}>
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt={`${project.name} work sample`}
                    className={styles.teaserImageImg}
                  />
                ) : (
                  <ImagePlaceholder label={`Drop ${project.name.toLowerCase()} image`} />
                )}
              </div>
              <div className={styles.teaserBody}>
                <span className={styles.teaserName}>{project.name}</span>
                <span className={styles.teaserDescription}>{project.description}</span>
                <Button type="button" tabIndex={-1}>
                  See more
                </Button>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
