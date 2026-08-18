import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { portfolioProjects } from "@/lib/projects";
import styles from "../page.module.css";
import local from "./page.module.css";

export const metadata = {
  title: "Dylan Scoble — Portfolio",
  description: "Selected branding, print, and web design work by Dylan Scoble.",
  robots: { index: false, follow: false },
};

export default function Portfolio() {
  const [featured, ...rest] = portfolioProjects;
  const teasers = rest.slice(0, 2);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-illustration.png" alt="" className={styles.heroImage} />
        <div className={styles.heroCopy}>
          <span className={styles.name}>Dylan Scoble</span>
          <span className={styles.role}>Graphic - Branding - Web design</span>
          <span className={styles.pitch}>
            A selection of branding, print, and web design work — sharing it here
            as part of my portfolio.
          </span>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>10 years</span>
            <span className={styles.statLabel}>in the industry</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>60+</span>
            <span className={styles.statLabel}>Projects completed</span>
          </div>
        </div>
      </section>

      {featured && (
        <section className={styles.section}>
          <span className={styles.sectionHeading}>Selected work</span>
          <Link href={`/work/${featured.slug}?from=portfolio`} className={styles.featured}>
            {featured.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.heroImage}
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
              <ButtonLink href={`/work/${featured.slug}?from=portfolio`}>See more</ButtonLink>
            </div>
          </Link>
          <div className={styles.teasers}>
            {teasers.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}?from=portfolio`}
                className={styles.teaser}
              >
                <div className={styles.teaserImage}>
                  <ImagePlaceholder label={`Drop ${project.name.toLowerCase()} image`} />
                </div>
                <span className={styles.teaserName}>{project.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles.aboutCopy}>
          <span className={styles.sectionHeading}>About me</span>
          <span className={styles.aboutBody}>
            Ten years in, I still get a kick out of the first sketch turning into a finished
            brand. I work end to end — identity, print, and the website that ties it all
            together.
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/about-photo.png" alt="Dylan Scoble" className={styles.aboutPhoto} />
      </section>

      <section className={`${styles.section} ${styles.contact}`}>
        <div className={styles.contactCopy}>
          <span className={styles.sectionHeading}>Get in touch</span>
          <span className={styles.contactBody}>
            Thanks for taking a look — happy to walk through any of this work in more detail.
          </span>
          <div className={local.contactLinks}>
            <ButtonLink href="mailto:hello@dylanscoble.com">Email me</ButtonLink>
            <ButtonLink href="https://www.linkedin.com/in/dylanscoble">LinkedIn</ButtonLink>
            <ButtonLink href="/resume.pdf">Resume</ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
