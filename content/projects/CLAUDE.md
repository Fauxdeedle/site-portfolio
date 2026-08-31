# Project content system

This directory is the content store for the `/work/[slug]` project pages and
the homepage's featured/teaser cards. Project data is **not** in JS — it's
one Markdown file per project, all fields as YAML frontmatter, loaded at
build time by `lib/projects.js`.

## How it's wired up

- Project files live in `content/projects/entries/`, one Markdown file per
  project. This subfolder is deliberately separate from directory docs
  (`README.md`, this `CLAUDE.md`) — the loader reads *every* `.md` file it
  finds there, so nothing but real project files can go in `entries/`. (This
  used to be a flat folder with a filename blocklist that excluded
  `README.md`; a stray `CLAUDE.md` slipped past the blocklist and got loaded
  as a broken project, which is why the split exists now.)
- `lib/projects.js` reads every `*.md` file in `content/projects/entries/`
  with Node `fs` at module scope (`fs.readdirSync` + `fs.readFileSync`),
  parses frontmatter with `gray-matter`, and exports `projects` /
  `getProject(slug)` / `getNextProject(slug)` — the same three exports the
  old hardcoded-array version exposed, so `app/page.js` and
  `app/work/[slug]/page.js` import it unchanged.
- The **filename** (minus `.md`) is the slug and becomes the route:
  `entries/soulmates-ai.md` → `/work/soulmates-ai`.
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

`portfolioOrder: <number>` is the same idea for `/portfolio`, the link-only
homepage used for job searching (see `app/portfolio/page.js`). It's optional
and independent of `order` — `portfolioProjects` (exported alongside
`projects`) filters to only projects that set it, then sorts ascending by it
(ties broken by slug). A project with no `portfolioOrder` simply doesn't
appear on `/portfolio`; `getNextProject` is unaffected and still walks the
full `order`-sorted list regardless of which homepage a visitor arrived
from.

## Thumbnail vs hero image

`heroImage` is the big image on the `/work/[slug]` detail page. `thumbnail`
(optional) is the image used for the homepage/portfolio card (both the
featured card and the two teaser cards, in `app/page.js` and
`app/portfolio/page.js`). The `thumbnail ?? heroImage` fallback is normalized
once in `lib/projects.js` (`thumbnail: data.thumbnail ?? data.heroImage`), so
every call site just reads `project.thumbnail` directly — most projects only
need to set `heroImage`; `thumbnail` is only needed when the homepage image
should differ from the detail-page hero.

## Unbounded list fields

`finalDesigns` (image gallery, replaces the old fixed 2-slot `gallery`),
`process` (steps, each `{ title, description, image? }`), `keyDecisions`
(each `{ title, description }`), and `stats` (each `{ value, label }`) are
all optional frontmatter arrays; the loader normalizes a missing field to
`[]` for each. `app/work/[slug]/page.js` renders each section only when its
array is non-empty (or, for the Overview section, when `problem`/`goal` is
set) — a project with none of these set simply shows fewer sections, no
placeholder chrome. There's no per-item validation on the nested object
shapes, consistent with this file's failure-mode philosophy below: a
malformed entry (e.g. a `process` item missing `title`) renders `undefined`
rather than throwing, since these are infrequent hand-authored edits, not
user input.

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
