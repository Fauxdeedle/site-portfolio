# Adding a project

Each project on the site is one Markdown file in `content/projects/entries/`.
The filename (minus `.md`) becomes the project's URL —
`entries/soulmates-ai.md` → `/work/soulmates-ai`.

## To add a new project

1. Copy an existing `.md` file in `content/projects/entries/` and rename it
   to your new project's slug (lowercase, hyphenated, e.g. `acme-rebrand.md`).
2. Fill in the fields below.
3. Drop any images into `/public/images/` and reference them by path
   (e.g. `/images/acme-hero.png`) in `heroImage` / `thumbnail` / `gallery`.
4. Commit and deploy.

**`order` is what controls where a project appears** — not filename or file
creation date. The project with the lowest `order` is the homepage's featured
project; the next two lowest are the homepage teasers; ties are broken
alphabetically by slug. Give your new project a unique `order` number.

**`portfolioOrder` controls the same thing for `/portfolio`** — the link-only
homepage used for job searching — independently of `order`. It's optional: a
project only shows up on `/portfolio` if it has a `portfolioOrder`, so you can
curate a different set (and different order) of projects for that page
without touching `order` or the main homepage.

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Project name |
| `order` | number | yes | Controls display order on the main homepage (`/`) |
| `portfolioOrder` | number | no | Controls display order on the link-only portfolio homepage (`/portfolio`); omit to leave the project off that page |
| `category` | string | yes | e.g. `branding`, `websites`, `print - branding` |
| `tagline` | string | yes | Short one-liner |
| `description` | string | yes | Used on the homepage featured card |
| `client` | string | yes | Use `"—"` if not applicable |
| `role` | string | yes | Use `"—"` if not applicable |
| `year` | string | yes | Quote it, e.g. `year: "2026"` |
| `heroImage` | string | no | `/images/...` path; the big image on the `/work/[slug]` detail page. Omit for a "coming soon" project |
| `thumbnail` | string | no | `/images/...` path; the image used for the homepage/portfolio card (featured + teaser). Falls back to `heroImage` if unset — only set this when you want a different image on the homepage than on the detail page |
| `gallery` | list of strings | no | 0–2 `/images/...` paths; the detail page has two gallery slots — any missing slot shows a placeholder |
| `challenge` | string | yes | "The challenge" section copy |
| `result` | string | yes | "The result" section copy |

Multi-line text fields (`description`, `challenge`, `result`) use YAML's
folded block style — start the value on the next line, indented, prefixed
with `>-`:

```yaml
challenge: >-
  First line of the paragraph continues here
  and here, all folded into one paragraph.
```

## Full example

```yaml
---
name: Acme Co Rebrand
order: 4
portfolioOrder: 1
category: branding
tagline: A full identity refresh for a 20-year-old hardware brand
description: >-
  A ground-up identity refresh — logo, packaging, and a new site.
client: Acme Co
role: Branding + Web
year: "2026"
heroImage: /images/acme-hero.png
thumbnail: /images/acme-thumb.png
gallery:
  - /images/acme-gallery-1.png
  - /images/acme-gallery-2.png
challenge: >-
  Acme's identity hadn't changed in twenty years and no longer matched
  the product line. They needed a refresh that felt current without
  losing what long-time customers recognized.
result: >-
  The new identity rolled out across packaging, the website, and trade
  show materials within a single quarter.
---
```

## Careful with YAML

A syntax error in any of these files (bad indentation, an unquoted value
with a colon in it, etc.) will make `next dev` / `next build` fail
immediately with a parse error pointing at the file — that's expected, fix
the file and it'll pick back up.
