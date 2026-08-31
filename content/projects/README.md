# Adding a project

Each project on the site is one Markdown file in `content/projects/entries/`.
The filename (minus `.md`) becomes the project's URL —
`entries/soulmates-ai.md` → `/work/soulmates-ai`.

## To add a new project

1. Copy an existing `.md` file in `content/projects/entries/` and rename it
   to your new project's slug (lowercase, hyphenated, e.g. `acme-rebrand.md`).
2. Fill in the fields below.
3. Drop any images into `/public/images/` and reference them by path
   (e.g. `/images/acme-hero.png`) in `heroImage` / `thumbnail` / `finalDesigns`
   / per-`process`-step `image`.
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
| `problem` | string | yes | "The problem" box in the Overview section |
| `goal` | string | no | "The goal" box in the Overview section, shown next to `problem` with an arrow between them. Omit and only `problem` renders (no arrow) |
| `timeline` | string | no | Shown in the header meta row, e.g. `"1+ years, ongoing"` |
| `team` | string | no | Shown in the header meta row, e.g. `"2 designers, 5-7 developers, 1 PM"` |
| `platform` | string | no | Shown in the header meta row, e.g. `Web app` |
| `process` | list of objects | no | Numbered process steps — see shape below. Omit entirely to skip the Process section |
| `keyDecisions` | list of objects | no | Notable decisions — see shape below. Omit entirely to skip the Key Decisions section |
| `finalDesigns` | list of strings | no | Any number of `/images/...` paths, rendered as a gallery. Omit or leave empty to skip the Final Designs section |
| `stats` | list of objects | no | Result metrics — see shape below. Omit entirely to skip the stat tiles (the `result` paragraph still renders on its own) |
| `result` | string | yes | Summary paragraph in the Results section, shown below any `stats` tiles |

Multi-line text fields (`description`, `problem`, `goal`, `result`, and each
`process`/`keyDecisions` item's `description`) use YAML's folded block
style — start the value on the next line, indented, prefixed with `>-`:

```yaml
problem: >-
  First line of the paragraph continues here
  and here, all folded into one paragraph.
```

`process`, `keyDecisions`, and `stats` are lists of objects (unbounded —
use as many entries as the project needs):

```yaml
process:
  - title: Research & Discovery
    description: >-
      Deep-dived into the problem space and identified the primary
      audience through early interviews.
    image: /images/acme-process-1.png   # optional — omit the key for steps with no image
  - title: Design & Validation
    description: >-
      Mapped out flows, built designs, and tested with real users to
      validate and iterate.
keyDecisions:
  - title: Toolbar-based navigation
    description: >-
      Inspired by tools like Figma and Photoshop, this gave the app
      room to scale without breaking existing mental models.
stats:
  - value: "27%"
    label: Drop-off rate post-launch
  - value: "6"
    label: Enterprise users
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
timeline: 3 months
team: 1 designer, 1 developer
platform: Web app
heroImage: /images/acme-hero.png
thumbnail: /images/acme-thumb.png
problem: >-
  Acme's identity hadn't changed in twenty years and no longer matched
  the product line.
goal: >-
  Launch a refresh that felt current without losing what long-time
  customers recognized.
process:
  - title: Research & Discovery
    description: >-
      Audited the existing brand and interviewed long-time customers to
      find what was worth keeping.
  - title: Design & Validation
    description: >-
      Explored directions and tested the strongest ones with the sales
      team before committing.
    image: /images/acme-process-2.png
keyDecisions:
  - title: Kept the original wordmark
    description: >-
      Customer research showed strong recognition of the existing
      wordmark, so the refresh kept it and rebuilt everything around it.
finalDesigns:
  - /images/acme-final-1.png
  - /images/acme-final-2.png
stats:
  - value: "3x"
    label: Increase in inbound leads
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
