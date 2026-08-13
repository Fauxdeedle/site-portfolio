---
name: add-project
description: Use when the user wants to add a new project to the portfolio site's /work section — e.g. "add a project", "new project page", "set up a project page for X", or when they hand over rough notes/images for a project that should become one of the site's case studies. Walks through drafting copy, placing images, and writing the content/projects/<slug>.md file that lib/projects.js loads.
user-invocable: true
---

# Add a project page

Produces a new `content/projects/<slug>.md` file for this portfolio site,
plus the images it references in `public/images/`. Read
`content/projects/README.md` first — it's the authoritative field reference
and YAML style guide; this skill doesn't repeat it, only the workflow around
it. `content/projects/CLAUDE.md` has the ordering/gallery/failure-mode
mechanics if anything here is ambiguous.

## Workflow

1. **Gather inputs.** From the user's message plus whatever you ask for,
   collect: project name, client, role, year, and rough notes on the
   challenge and result (bullet points are fine — you're drafting the prose,
   not transcribing it). For `category`, check the existing values across
   `content/projects/*.md` first (`grep -h '^category:' content/projects/*.md`)
   and reuse one if it fits; only introduce a new category if the user's
   project genuinely doesn't match any existing one, and say so. Ask for
   image file paths (a hero image, plus up to 2 gallery images) if not
   already given — this skill expects paths to files already on disk, not
   pasted images.

2. **Draft the copy.** Write `tagline`, `description`, `challenge`, `result`
   in the site's existing voice — short, concrete, outcome-focused. Match the
   tone of `content/projects/soulmates-ai.md` (read it as a live example) and
   the README's Acme example: state the situation, the specific tension/gap,
   and the concrete outcome — no generic marketing filler. Show the drafted
   copy to the user before writing anything to disk; revise on their
   feedback. Don't skip this approval step even if the user's notes were
   detailed.

3. **Resolve the slug.** Kebab-case the project name (lowercase, hyphenated).
   Check `content/projects/` for a collision; if one exists, ask the user how
   to disambiguate rather than overwriting silently.

4. **Resolve `order`.** Read every `order:` value from
   `content/projects/*.md` and default the new project to `max + 1` (appends
   to the end — doesn't touch the homepage's featured/teaser slots). Only use
   a different value (e.g. `order: 1` to feature it) if the user explicitly
   asks for that placement.

5. **Place images.** For each path the user gave you:
   - Read it first (vision) — sanity-check it's a normal web image at a
     reasonable resolution, not e.g. a multi-page PDF, a screenshot of a
     screenshot, or something absurdly large. Flag anything that looks off
     and ask before proceeding rather than silently placing it.
   - Copy (don't move, unless the source is obviously a scratch/download
     location the user won't miss it from) into `public/images/` as
     `<slug>-hero.<ext>`, `<slug>-gallery-1.<ext>`, `<slug>-gallery-2.<ext>` —
     matching the flat, descriptive naming already used there
     (`work-sample-soulmates.png`, `about-photo.png`).
   - The gallery has exactly 2 slots. If the user gives more than 2 gallery
     images, ask which 2 to use. If they give 0 or 1, that's fine — missing
     slots render a placeholder on the live page, no field needed for them.

6. **Write `content/projects/<slug>.md`.** Follow the field list, order, and
   YAML style in `content/projects/README.md` exactly — folded `>-` block
   style for `description`/`challenge`/`result`, `year` quoted as a string,
   `heroImage`/`gallery` as `/images/...` paths. No markdown body content;
   this system only reads frontmatter.

7. **Verify.** Run `next build` (or at minimum load the new file through
   `gray-matter` in a one-off Node script) to catch YAML errors immediately —
   a bad frontmatter file throws synchronously at module load and breaks
   every page, by design (see `content/projects/CLAUDE.md`'s failure-mode
   note), so catching it now beats leaving it for the user. Then start
   `next dev` (use the `run` skill's pattern if one applies to this project)
   and open the new page (`/work/<slug>`) plus the homepage to confirm the
   images render and the project lands where expected — not placeholders.

8. **Report** the new file path, the resulting URL (`/work/<slug>`), which
   images were placed, and the `order` value / where it landed relative to
   other projects.

## Notes

- This is a small, fixed content system — resist adding new frontmatter
  fields, a markdown-body rendering path, or other structural changes as
  part of this skill. If the user wants the schema itself extended, that's a
  separate, explicit task.
- Never delete or reorder existing project files as a side effect of adding
  a new one.
