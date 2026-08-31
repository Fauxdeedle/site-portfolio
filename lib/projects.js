import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects/entries");

function loadProjects() {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const parsed = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      ...data,
      process: data.process ?? [],
      keyDecisions: data.keyDecisions ?? [],
      finalDesigns: data.finalDesigns ?? [],
      stats: data.stats ?? [],
      thumbnail: data.thumbnail ?? data.heroImage,
    };
  });

  parsed.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
  return parsed;
}

export const projects = loadProjects();

export const portfolioProjects = projects
  .filter((p) => p.portfolioOrder != null)
  .sort((a, b) => a.portfolioOrder - b.portfolioOrder || a.slug.localeCompare(b.slug));

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
