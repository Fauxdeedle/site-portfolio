export const projects = [
  {
    slug: "soulmates-ai",
    name: "Soulmates.ai",
    category: "print - branding",
    tagline: "A dating app rebrand — print, branding, and launch website",
    description:
      "A dating app rebrand — full visual identity, print collateral, and launch website.",
    client: "Soulmates.ai",
    role: "Branding + Print",
    year: "2026",
    challenge:
      "Soulmates.ai had a name and a product, but no visual identity to match its ambition. They needed a brand system that felt warm and human rather than clinical — plus a launch website and print collateral for their first investor event.",
    result:
      "The new identity launched alongside their seed round — investor materials, the website, and printed collateral all shipped from one consistent system. The founders now use the brand kit to spin up new marketing pieces on their own.",
    heroImage: "/images/work-sample-soulmates.png",
  },
  {
    slug: "project-two",
    name: "Project Two",
    category: "branding",
    tagline: "Project details coming soon",
    description: "Case study write-up in progress.",
    client: "—",
    role: "—",
    year: "2026",
    challenge: "Case study write-up in progress — check back soon for the full story.",
    result: "Case study write-up in progress — check back soon for the full story.",
    heroImage: null,
  },
  {
    slug: "project-three",
    name: "Project Three",
    category: "websites",
    tagline: "Project details coming soon",
    description: "Case study write-up in progress.",
    client: "—",
    role: "—",
    year: "2026",
    challenge: "Case study write-up in progress — check back soon for the full story.",
    result: "Case study write-up in progress — check back soon for the full story.",
    heroImage: null,
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length];
}
