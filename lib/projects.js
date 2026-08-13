import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

function loadProjects() {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md");

  const parsed = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data } = matter(raw);
    return { slug, ...data, gallery: data.gallery ?? [] };
  });

  parsed.sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));
  return parsed;
}

export const projects = loadProjects();

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
