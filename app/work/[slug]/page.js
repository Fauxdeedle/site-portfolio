import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import HighlightCard from "@/components/HighlightCard";
import InfoTile from "@/components/InfoTile";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ProcessStep from "@/components/ProcessStep";
import KeyDecisionCard from "@/components/KeyDecisionCard";
import StatTile from "@/components/StatTile";
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

export default async function ProjectPage({ params, searchParams }) {
  const { slug } = await params;
  const { from } = await searchParams;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const fromPortfolio = from === "portfolio";
  const homeHref = fromPortfolio ? "/portfolio" : "/";
  const nextQuery = fromPortfolio ? "?from=portfolio" : "";

  const metaItems = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Timeline", value: project.timeline },
    { label: "Team", value: project.team },
    { label: "Platform", value: project.platform },
  ].filter((item) => item.value);

  const overviewItems = [
    project.problem && { label: "The problem", body: project.problem },
    project.goal && { label: "The goal", body: project.goal },
  ].filter(Boolean);
  const hasOverview = overviewItems.length > 0;
  const hasResults = project.stats.length > 0 || Boolean(project.result);

  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <ButtonLink href={homeHref} size="sm">
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
          <h1 className={styles.title}>{project.name}</h1>
          <span className={styles.tagline}>{project.tagline}</span>
        </div>
        <div className={styles.meta}>
          {metaItems.map((item) => (
            <InfoTile key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      {hasOverview && (
        <div className={styles.copyBlock}>
          <h2 className={styles.sectionHeading}>Overview</h2>
          <HighlightCard items={overviewItems} />
        </div>
      )}

      {project.process.length > 0 && (
        <div className={`${styles.copyBlock} ${styles.noTop}`}>
          <h2 className={styles.sectionHeading}>Process</h2>
          <div className={styles.processList}>
            {project.process.map((step, i) => (
              <ProcessStep key={i} {...step} />
            ))}
          </div>
        </div>
      )}

      {project.keyDecisions.length > 0 && (
        <div className={`${styles.copyBlock} ${styles.noTop}`}>
          <h2 className={styles.sectionHeading}>Key decisions</h2>
          <div className={styles.decisionsGrid}>
            {project.keyDecisions.map((decision, i) => (
              <KeyDecisionCard key={i} {...decision} />
            ))}
          </div>
        </div>
      )}

      {project.finalDesigns.length > 0 && (
        <>
          <div className={`${styles.copyBlock} ${styles.noTop} ${styles.noBottom}`}>
            <h2 className={styles.sectionHeading}>Final designs</h2>
          </div>
          <div className={styles.finalDesigns}>
            {project.finalDesigns.map((src, i) => (
              <div className={styles.finalDesignItem} key={src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.name} final design ${i + 1}`}
                  className={styles.finalDesignImage}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {hasResults && (
        <div className={`${styles.copyBlock} ${styles.noTop}`}>
          <h2 className={styles.sectionHeading}>Results</h2>
          {project.stats.length > 0 && (
            <div className={styles.statsRow}>
              {project.stats.map((stat, i) => (
                <StatTile key={i} {...stat} />
              ))}
            </div>
          )}
          {project.result && <span className={styles.body}>{project.result}</span>}
        </div>
      )}

      <div className={styles.next}>
        <span className={styles.nextLabel}>Next project</span>
        <a href={`/work/${next.slug}${nextQuery}`} className={styles.nextLink}>
          <h4 className={styles.nextName}>{next.name} →</h4>
        </a>
      </div>
    </div>
  );
}
