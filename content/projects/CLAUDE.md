# Project content system

This directory is the content store for the `/work/[slug]` project pages and
the homepage's featured/teaser cards. Project data is **not** in JS — it's
one Markdown file per project, all fields as YAML frontmatter, loaded at
build time by `lib/projects.js`.

## How it's wired up

- `lib/projects.js` reads every `*.md` file in this directory with Node `fs`
  at module scope (`fs.readdirSync` + `fs.readFileSync`), parses frontmatter
  with `gray-matter`, and exports `projects` / `getProject(slug)` /
  `getNextProject(slug)` — the same three exports the old hardcoded-array
  version exposed, so `app/page.js` and `app/work/[slug]/page.js` import it
  unchanged.
- The **filename** (minus `.md`) is the slug and becomes the route:
  `soulmates-ai.md` → `/work/soulmates-ai`.
- `README.md` in this folder is explicitly excluded from the loader (it's a
  human-facing doc, not a project) — if you add other non-project files here,
  extend that filter in `lib/projects.js` or they'll be treated as broken
  projects.
- The markdown **body** of every project file is unused — everything lives in
  frontmatter. There is no markdown-to-HTML rendering pipeline (no
  remark/rehype); `challenge`/`result` are plain frontmatter strings rendered
  as-is.

## Ordering

There's no reliable order from `fs.readdirSync` or filenames, so ordering is
explicit: every file has an `order: <number>` field. The loader sorts
ascending by `order` (ties broken by slug). That sort order is what drives:
- the homepage's featured project (lowest `order`) and its two teasers (next
  lowest),
- the "next project" link on each detail page (`getNextProject` walks the
  sorted array and wraps around).

## Gallery

The detail page has a fixed 2-slot gallery layout. `gallery` is an optional
frontmatter array of `/images/...` paths (0–2 used); the loader normalizes a
missing field to `[]`. Missing slots render `ImagePlaceholder` — see the
fallback logic in `app/work/[slug]/page.js`.

## Failure mode

Malformed YAML in any project file throws synchronously out of
`gray-matter` at module-load time, i.e. immediately in `next dev`/`next
build` with a stack trace pointing at the bad file. This is intentional —
there's no validation/try-catch layer, since content changes are infrequent
and a loud build-time failure is preferable to silently rendering broken
data.

## Adding/editing a project

See `README.md` in this same directory for the human-facing "how do I add a
project" instructions and the full field reference — don't duplicate that
here, keep this file as the technical/architecture note for future code
changes.
