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
  `/mistake-maker`, `/calm-corner` (feeling picker, strategy cards,
  Breathe with Gritty).
- **Content collections** (`src/content.config.ts`) — books, characters,
  printables (empty until Kim's PDFs arrive — the Grown-Ups page shows a
  friendly empty state), singleton pages, and the game content: scenarios,
  mistakes, yet-sentences, calm-strategies. Every optional field
  tolerates null: a half-filled CMS form must never break the build.
- **Interactivity** — vanilla JS per page, progressively enhanced: without
  JavaScript every game renders as a readable list. Game state (the grit
  check-in) lives in `localStorage` only, wrapped in try/catch.
- **CMS config** — `.pages.yml`, field descriptions written for Kim.
  Never rename a schema field without updating `.pages.yml` and
  `KIM-GUIDE.md` in the same change.
- **Search** — `site.config.mjs` `indexable: false` drives a noindex tag on
  every page while the site is being built.

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
