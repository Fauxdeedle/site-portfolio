import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { projects, getProject, getNextProject } from "@/lib/projects";
import styles from "./page.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Dylan Scoble`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <ButtonLink href="/" size="sm">
          ← Back to work
        </ButtonLink>
      </div>

      <div className={styles.hero}>
        {project.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.heroImage}
            alt={`${project.name} hero`}
            className={styles.heroImage}
          />
        ) : (
          <ImagePlaceholder label="Project hero image" style={{ height: 520 }} />
        )}
      </div>

      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <span className={styles.title}>{project.name}</span>
          <span className={styles.tagline}>{project.tagline}</span>
        </div>
        <div className={styles.meta}>
          <div>
            <div className={styles.metaLabel}>Client</div>
            <div className={styles.metaValue}>{project.client}</div>
          </div>
          <div>
            <div className={styles.metaLabel}>Role</div>
            <div className={styles.metaValue}>{project.role}</div>
          </div>
          <div>
            <div className={styles.metaLabel}>Year</div>
            <div className={styles.metaValue}>{project.year}</div>
          </div>
        </div>
      </div>

      <div className={styles.copyBlock}>
        <span className={styles.sectionHeading}>The challenge</span>
        <span className={styles.body}>{project.challenge}</span>
      </div>

      <div className={styles.gallery}>
        {[0, 1].map((i) => (
          <div className={styles.galleryItem} key={i}>
            {project.gallery[i] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.gallery[i]}
                alt={`${project.name} process ${i + 1}`}
                className={styles.galleryImage}
              />
            ) : (
              <ImagePlaceholder label="Process / gallery image" radius={16} />
            )}
          </div>
        ))}
      </div>

      <div className={`${styles.copyBlock} ${styles.noTop}`}>
        <span className={styles.sectionHeading}>The result</span>
        <span className={styles.body}>{project.result}</span>
      </div>

      <div className={styles.next}>
        <span className={styles.nextLabel}>Next project</span>
        <a href={`/work/${next.slug}`} className={styles.nextLink}>
          <span className={styles.nextName}>{next.name} →</span>
        </a>
      </div>
    </div>
  );
}
