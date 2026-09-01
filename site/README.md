# Growing with Gritty — the site

Astro 5 static site for Kim Rekowski's Gritty the Goat series.
Plan and design references: [`../PLAN.md`](../PLAN.md) ·
approved style tile: [`../style-tile.html`](../style-tile.html).

## Run it

```bash
npm install
npm run dev      # http://localhost:4321 (respects PORT)
npm run build    # → dist/
```

## What's here (Phases 1 & 2)

- **Design system** — `src/styles/tokens.css` (source of truth: the approved
  style tile), `global.css`, and the `Bubble` / `Stamp` / `BookCard`
  components.
- **Pages** — home, `/meet-gritty`, `/books` + four book pages, `/about`,
  `/grown-ups`, and Gritty's World: `/grit-zone` (scenario quiz, the Power
  of YET, the private "how did YOU have grit today?" check-in),
  `/mistake-maker`, `/calming-corner` (feeling picker, strategy cards,
  Breathe with Gritty).
- **The meadow hero** (`src/components/MeadowHero.astro`, from style tile
  V3 "Alive") — Gritty climbs out of the grass, kids tap him to chat and
  answer with reply chips, and his friends visit. His line boil is Kim's
  drawing re-inked as three frames (`public/images/gritty/`); when Kim
  draws a mood, drop its frames in as `gritty-<mood>-1.webp` `-2` `-3`
  (moods: happy, laugh, surprised, proud, thinking) and that mood starts
  using her art automatically. Seasons recolor the hills by month.
- **Content collections** (`src/content.config.ts`) — books, characters,
  printables (empty until Kim's PDFs arrive — the Grown-Ups page shows a
  friendly empty state), singleton pages, and the game content: scenarios,
  mistakes, yet-sentences, calm-strategies, meadow-chats (the hero
  conversations). Every optional field tolerates null: a half-filled CMS
  form must never break the build.
- **Interactivity** — vanilla JS per page, progressively enhanced: without
  JavaScript every game renders as a readable list. Game state (the grit
  check-in) lives in `localStorage` only, wrapped in try/catch.
- **Accessibility plumbing** — `Base.astro` carries one polite live region
  and every game announces through `src/lib/announce.ts` (never put
  `role="status"` on something you show and hide — it won't be read). The
  focus ring is `--gg-focus`; dark grounds re-set it. `MotionToggle.astro`
  ("Pause animations", in the meadow and the footer) sets
  `data-motion="calm"` on `<html>`, which `global.css` treats exactly like
  `prefers-reduced-motion` — check both (`isCalm()`) before any JS motion.
- **CMS config** — `.pages.yml`, field descriptions written for Kim.
  Never rename a schema field without updating `.pages.yml` and
  `KIM-GUIDE.md` in the same change.
- **Search** — `site.config.mjs` `indexable: false` drives a noindex tag on
  every page while the site is being built.
- **The image chute** — Adam's fast lane from desktop to repo, in three
  flavours. The hosted one is a real URL, from any machine:

  **<https://adamdhickey-collab.github.io/growing-with-gritty/chute/>**

  It converts in the browser and commits through the GitHub API (source:
  [`../chute/index.html`](../chute/index.html)), so it needs a fine-grained
  token with Contents: read/write on this repo, kept in that browser only.
  The local one needs no token but only runs here:

  ```
  npm run chute        # → http://localhost:4322
  ```

  Drop images (or paste one with ⌘V), pick the folder, and they land in
  `public/images/`. There is a one-liner for when you're already in the
  terminal:

  ```
  npm run add-image -- characters/gabby     # newest Desktop/Downloads image
  npm run add-image -- books/cover ~/Desktop/scan.png   # or name the file
  ```

  The two local routes share `scripts/lib/land-image.mjs`; the hosted page
  reimplements the same rules in the browser, and its comment says so —
  change one, change the other. Every route: webp, 1400px, camera metadata
  stripped, duplicates and accidental overwrites refused, `gritty/` off
  limits (those are the re-inked line-boil frames, a different process).
  The local routes write files and commit nothing; the hosted one commits
  directly, since that is the only way a static page can reach the repo.

  **Kim's route is neither of these:** the Pages CMS media uploader, a real
  URL with no token to manage, landing files in this same folder once the
  CMS is connected.
- **The image library** (`scripts/build-image-index.mjs`) — one page listing
  every image, grouped by folder, each saying which source files reference
  it, with anything unreferenced flagged:

  ```
  npm run library      # → site/.image-library/index.html
  ```

  The deploy regenerates it at
  [/library/](https://adamdhickey-collab.github.io/growing-with-gritty/library/),
  so it is never out of date. Two things are loaded by pattern rather than
  by name — the boil frames and the expression frames — and the script names
  them explicitly, because an image reported unused is an image someone
  eventually deletes.

## Hard rules

- **Kim's hand-drawn art is the only Gritty.** No generated character art,
  ever. Missing portraits show a "coming soon" frame, never a stand-in.
- **No data collection from kids.** No forms children can submit, no
  cookies, no third-party scripts or embeds (fonts are self-hosted).
  Future interactive features keep state in `localStorage` only.
- Small text floor and AA contrast per the tokens — the audience is
  4-year-olds and grandparents.

## Deploying (not yet done)

To go live (PLAN.md §10): connect Cloudflare Pages to this repo with
**root directory `site`** (build: `npm run build`, output: `dist`), then
point Pages CMS at the repo. One adjustment when activating the CMS:
Pages CMS reads `.pages.yml` from the **repo root**, so move this folder's
`.pages.yml` there and prefix every `path:` with `site/`
(e.g. `site/src/content/books`). `KIM-GUIDE.md` needs no changes.
