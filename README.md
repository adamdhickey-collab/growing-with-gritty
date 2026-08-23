# Growing with Gritty

Website project for **Kim Rekowski's Gritty the Goat** children's book
series (ages 4–10): author home + "Gritty's World" activities, built on the
Door County Found model — Astro · Pages CMS · Cloudflare Pages — so Kim
edits everything through simple web forms.

| | |
| --- | --- |
| 📋 [PLAN.md](PLAN.md) | The full plan: stack, kids-safety decisions, content model, phases |
| 🎨 [style-tile/](style-tile/) | The approved look, served at **[adamdhickey-collab.github.io/growing-with-gritty/style-tile](https://adamdhickey-collab.github.io/growing-with-gritty/style-tile/)** |
| 🌱 [site/](site/) | The Astro site (Phase 1 built) — see [site/README.md](site/README.md) |
| ✍️ [copy/](copy/) | Kim's finished prose + seed content for the interactive sections |
| 🖼 [reference/](reference/) | Kim's art, book covers, photos, the approved-feel mockup |

## Status

- **Phase 1 built**: design system, home, Meet Gritty, four book pages,
  About, Grown-Up Grit Guide, Pages CMS config, KIM-GUIDE.
- **Not yet connected**: Cloudflare Pages + domain + Pages CMS (PLAN.md §10).
  GitHub Pages here serves *only* the style tile for review — the real site
  deploys via Cloudflare when it goes live.

## Working on it

```bash
cd site && npm install && npm run dev
```

Hard rules (details in [site/README.md](site/README.md) and PLAN.md §4):
Kim's hand-drawn art is the only Gritty — never generated art; and the site
collects nothing from kids — no forms, no cookies, no third-party requests.
