# Growing with Gritty — Website Plan

*Build Grit. Grow Strong. Never Quit!*

A website for **Kim Rekowski** — elementary teacher, children's book author,
and illustrator — and her **Gritty the Goat** series (ages 4–10). Built on the
same foundation as Door County Found, because the thing that makes that site
easy to live with is exactly what Kim needs: she updates everything through a
simple web form, and the site itself stays a fast, hand-crafted static site
that looks like *her* watercolor world, not a theme.

Source material: Kim's planning doc (`Growing_with_Gritty_website.docx`),
distilled into `copy/` and `reference/` in this folder.

---

## 1. The recommendation in one paragraph

Build a custom static site with **Astro**, hosted free on **Cloudflare
Pages**, with **Pages CMS** as the editing interface — the proven Door County
Found stack. Kim signs in at app.pagescms.org with a GitHub account and edits
books, characters, printables, and even the interactive game content through
plain web forms; every save publishes in about two minutes. Total running
cost is the domain (~$12/yr). No plugins, no security updates, no WordPress
admin. And because all content is structured markdown/JSON in a git repo,
nothing is ever locked in — if the tooling changes later, the content moves
mechanically.

## 2. What this site is

Two jobs, in order:

1. **The author home** — showcase the four real books, introduce the
   characters, tell Kim's story, and give parents/teachers genuinely useful
   free material (coloring pages, discussion cards, posters). This is the
   part that sells books and earns return visits.
2. **Gritty's World** — a small, growing set of interactive activities where
   kids practice grit, growth mindset, and calm-down skills with Gritty as
   their guide. This is what makes the site feel like an experience instead
   of a brochure, and it's the part Kim was most excited about in the doc.

Kim's doc (via its ChatGPT brainstorm, which she endorsed) proposes twelve
sections. We build them in phases (§7) so the site ships early and never
feels half-finished — the doc itself suggests homepage, Grit Zone, Mistake
Maker, Calming Corner, and Books as the strong foundation.

## 3. What Kim asked for (requirements from the doc)

- ✅ **Likes the colors and feel** of the mockup —
  `reference/mockup-homepage-approved-feel.png`. Watercolor paper, deep
  blue lettering, soft greens, gold accents.
- ✅ **About the Author** section with her photo and goals — the finished
  copy is already written in the doc (`copy/about-the-author.md`).
- ✅ **Real book covers with links** — four real books: *Gritty the Goat*,
  *Gritty Grows a Garden*, *Gabby the Goat's Best Friend*, *Gritty Builds a
  Tree House*. (The mockup shows eight covers — four are AI-invented and
  must never appear on the site.)
- ✅ **Character introductions** — Gritty, Grandpa Goat, Gabby, Grandma
  Goat, and Gibby.
- ✅ **Printable Gritty coloring pages.**
- ✅ **"How did YOU have grit today?"** — interactive; Kim pictured kids'
  stories being visible with first name, age, and where they're from.
  See §4 for how we do this safely.
- ❌ **Not the thumbs-up, standing-on-two-legs Gritty.** Kim prefers her
  own hand-drawn, four-legged Gritty
  (`reference/gritty-hand-drawn-master.png`). Rule: **Kim's hand-drawn art
  is the only Gritty.** No generated character art, ever — same spirit as
  the Door County logo rule.

## 4. Kids online: the safety decisions (settled up front)

This site is *directed at children under 13*, which puts it under COPPA. The
clean way through is also the cheapest and simplest:

- **Collect nothing.** No accounts, no forms that kids fill in, no cookies,
  no third-party embeds, no ad networks. Analytics either omitted or
  Cloudflare Web Analytics only (cookieless, no personal data).
- **Interactive = on-device.** Every activity (scenarios, YET flips, badges,
  the private "tell Gritty" reflection) runs in the browser and saves — if
  it saves at all — to `localStorage` on the child's own device. Gritty
  responds instantly; nothing leaves the page. The doc itself landed here:
  "I would make this a private activity rather than a public message board."
- **The Grit Wall is parent-submitted, Kim-published.** Kim still gets the
  shared "how kids had grit" feature she wanted, without collecting data
  from children: a clearly grown-ups-only form (mailto or a simple form
  service to Kim's email) invites parents/teachers to share a story. Kim
  adds the ones she loves through the CMS — first name, age, state, one
  sentence. Editorially curated content, not user data collection. She can
  seed it with her own students' (anonymized) stories from day one.
- **Certificates and badges print or persist locally** — nothing uploads.

These are hard rules on the level of "no lodging section" in Door County
Found: they go in the eventual `CLAUDE.md` for the repo.

## 5. The elegant part: interactivity is just content

The trick that keeps the "Grit World" simple: **every interactive activity
is a CMS collection.** The game shells are built once, in plain
HTML/CSS/vanilla JS, and they read their content from structured entries Kim
edits in the exact same forms she uses for books:

| Kim edits… | …and the site's game uses it |
| --- | --- |
| A **scenario** (situation, three choices, which shows grit, Gritty's cheer) | Grit Zone "Can you help Gritty?" quiz |
| A **mistake** (Gritty's funny oops + the lesson) | The Mistake Maker button |
| A **YET sentence** ("I can't tie my shoes…") | The Power of YET flip |
| A **kindness challenge** (one mission) | Kindness Corner's daily challenge |
| A **calm strategy** (name, emoji, steps) | Calming Corner's strategy picker |
| A **grit story** (first name, age, state, sentence) | The Grit Wall |

So "add a new challenge to the website" is Kim filling in a four-field form —
no developer involved. New scenarios appear in the game two minutes later.
This is the Door County Found philosophy applied to games instead of places:
structure in the schema, voice in the fields, zero code for the editor.

## 6. Content model

Collections (folders of markdown/JSON entries, one file each, schema in
`src/content.config.ts`, forms in `.pages.yml`):

- **books** — title, cover image, order in series, ages, blurb (Kim's copy is
  written already), what-Gritty-learned, characters featured, buy link
  (Amazon), linked activity sheets. Each gets a page:
  Read-the-story intro · Meet the characters · What did Gritty learn? ·
  Grit challenge · Activity sheet · Buy the book.
- **characters** — name, portrait (Kim's art), role, a friendly first-person
  hello, which books they appear in.
- **printables** — title, kind (coloring page, discussion cards, calm-down
  cards, poster, journal, certificate, book guide, classroom activity),
  audience (kids / parents / teachers), PDF upload, thumbnail. Powers both
  the Coloring Pages section and the Grown-Up Grit Guide tabs.
- **scenarios**, **mistakes**, **yet-sentences**, **kindness-challenges**,
  **calm-strategies**, **grit-stories** — the game content from §5. Small
  schemas, 3–6 fields each.
- **homepage** and **about** — single `file` entries (one form each, like
  Door County Found's homepage), covering the hero, the "I have grit! I
  don't quit!" line, section links, and the About the Author page.

Schema rule carried over verbatim from Door County Found: **every optional
field tolerates null/omitted** — a half-filled CMS form must never break the
build.

## 7. Site structure & build phases

Navigation stays simple and visual (per the doc):
**🏠 Home · 🐐 Meet Gritty · 📚 Books · 💪 Grit Zone · 🧠 Mistake Maker ·
🧘 Calming Corner · 👨‍👩‍👧 Grown-Ups**
(Power of YET lives inside Grit Zone; Kindness Corner and Be YOU join the nav
when they ship in Phase 3 — seven top-level items is already the ceiling for
a six-year-old.)

### Phase 1 — The author home (ship this first)
- Design system: tokens, type, paper texture, Gritty speech-bubble component.
- **Home** — hand-drawn Gritty front and center with clickable areas around
  him (the mockup's layout), the motto, the four real books, the four value
  stamps (Be Determined · Be Kind · Believe in Yourself · Never Give Up).
- **Meet Gritty & Friends** — Gritty's animated-feeling intro ("Hi, friend!
  I'm Gritty…") + the five character cards + "What is grit?" picture row.
- **Books** — landing page + four book pages, buy links.
- **About the Author** — copy from the doc, Kim's photos (the
  reading-with-real-goats photo is gold: `reference/kim-reading-with-goats.png`).
- **Grown-Up Grit Guide** — Parents / Teachers / Free Activities tabs over
  the printables collection; coloring pages live here *and* get a kid-facing
  entry point.
- CMS config, `KIM-GUIDE.md` (the SISTER-GUIDE analog), seeded content.

### Phase 2 — Gritty's World (the interactive core)
- **Grit Zone** — 5–10 scenario challenges + **The Power of YET** flip
  (signature feature: kid clicks the big YET button, the sentence transforms).
- **The Mistake Maker** — "Oops! I made a mistake!" button → funny mistake →
  "Turn my OOPS into I LEARNED!"
- **Calming Corner** — feeling picker → strategy picker → **Breathe with
  Gritty** (pure-CSS breathing animation, `prefers-reduced-motion` honored).
- **"How did YOU have grit today?"** — the private on-device version: checklist
  ("Today I… kept trying / asked for help / …"), Gritty celebrates, saves
  locally so kids can see their own streak.

### Phase 3 — Signature extras
- **Kindness Corner** — daily challenge + local kindness tracker with stars.
- **Be YOU!** — "My Superpowers" picker, picture-first for younger kids.
- **Grit Badges** — earned across activities (localStorage), leading to the
  printable **Grit Champion certificate** signed by Gritty the Goat 🐐.
- **The Grit Wall** — parent-submitted, Kim-moderated (§4).
- The recurring **"What would Gritty do?"** framing threaded through every
  section — the doc's best single idea, and it costs nothing: it's a copy
  pattern, not a feature.

## 8. Design system

From the approved mockup and the doc's own palette words:

| Token | Proposal | Use |
| --- | --- | --- |
| Paper Cream | `#FAF6EC` | Page background — watercolor paper, never pure white |
| Gritty Blue | `#2C5F8A` | Headings, nav, the motto lettering (deep blue → trust) |
| Meadow Green | `#7FA86B` | Growth accents, banners, garden motifs |
| Gold Star | `#D9A93F` | Achievement: badges, stars, celebrations |
| Sky Wash | `#BDD7E7` | Soft section washes, sky bands |
| Ink | `#2A3238` | Body text (AA on cream at body sizes — verify before build) |

- **Art direction:** Kim's hand-drawn watercolor art is the entire visual
  identity — Gritty as the guide on every page, watercolor washes and
  leaf/star/heart accents as texture. Decorative images are `alt=""
  aria-hidden` texture, never content. No generated imagery presented as
  Kim's art; no stock characters.
- **Type:** a rounded, friendly display face (e.g. **Fredoka**) for headings,
  a highly readable body face (e.g. **Nunito** or **Andika**) for text, and
  at most one handwritten accent face scoped to speech bubbles only — the
  Caveat lesson from Door County Found: one face, one job.
- **Kid-scale interaction:** big tap targets (48px+), one idea per screen,
  short lines, generous type sizes — many visitors are ages 4–10 *or*
  grandparents. Everything keyboard-reachable; every game playable without
  sound; reduced-motion kills all animation globally.
- **Emoji as iconography** (the doc uses them throughout) — free, friendly,
  consistent with Kim's voice, no icon set to maintain.

## 9. What we need from Kim (asset checklist)

- [ ] High-resolution book cover files, all four (the doc copies are small).
- [ ] Scans of her Gritty/character art — the more poses the better; ideally
      a few on transparent or white backgrounds (we can cut them out).
- [ ] Grandpa Goat, Gabby, Grandma Goat, Gibby art for character cards.
- [ ] Author photos (the two in the doc are already good).
- [ ] Coloring page PDFs (or art to turn into them) — even two to start.
- [ ] Amazon (or preferred) buy links for each book.
- [ ] Blessing on the palette + font direction (one look at a style tile).
- [ ] A logo/wordmark if one exists; otherwise we set "Growing with Gritty"
      in the display face over a watercolor banner, like the mockup.

## 10. Tech & operations

- **Framework:** Astro 5 static site. `npm run dev` / `npm run build`.
- **This folder** holds the plan, source copy, and reference assets. **The
  site gets its own repo** (`adamdhickey-collab/growing-with-gritty`) when
  the build starts — same split as Door County Found and for the same
  reasons: Pages CMS and Cloudflare Pages both bind to a repo, "push =
  deploy" needs to be true, and Kim gets collaborator access to her site
  and nothing else. This folder then gets the one-line pointer treatment
  like the other self-contained projects.
- **Hosting:** Cloudflare Pages, auto-deploy on push to `main`. Domain:
  growingwithgritty.com (check availability early).
- **While building:** reuse the Door County Found patterns wholesale —
  the `?peek=` coming-soon middleware curtain, the `indexable` flag in
  `site.config.mjs` driving noindex/sitemap, self-hosted fonts via
  Fontsource, `Photo.astro` + the derivative ladder for any photography.
- **Editing:** `.pages.yml` with descriptions written *for Kim* in plain
  language (the Door County config is the model — every field description
  tells the editor what the field does on the page). `KIM-GUIDE.md` as the
  quick reference. Never rename a schema field without updating
  `.pages.yml` and the guide in the same change.
- **Safety posture** (§4) enforced in code review: no forms kids can
  submit, no third-party scripts, no cookies.

## 11. Lessons imported from Door County Found

- Optional schema fields tolerate null — CMS half-saves must never break builds.
- First photo/feature image conventions get their own labeled CMS field, not
  a position-in-a-list rule the editor has to remember.
- Small type floor (~0.79rem) and AA contrast checked against the real
  cream background, not white.
- One handwritten font, scoped to one job.
- Placeholder/stand-in imagery is dev-only and gitignored — nothing
  generated ever ships as if it were Kim's art.
- Editor uploads land in one predictable folder; brand assets live in
  organized `public/brand/` folders with per-folder READMEs.

## 12. Immediate next steps

1. Kim reviews this plan — especially the §4 safety approach to "How did
   YOU have grit today?" (it changes her original public-board idea) and
   the §7 phasing.
2. Collect the §9 assets.
3. Style tile: one page — palette, type, a Gritty speech bubble, a book
   card, a scenario card — screenshotted for Kim's sign-off before any
   page is built.
4. Spin up the `growing-with-gritty` repo from this plan: Astro scaffold,
   tokens, content collections, `.pages.yml`, seeded with the four books,
   five characters, and the copy in `copy/`.
5. Phase 1 build → curtain up on a staging URL → Kim starts editing.
