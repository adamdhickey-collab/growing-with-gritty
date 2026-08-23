# Style Tile V2 — the research-driven "wow" version

V1 (live at [/style-tile/](https://adamdhickey-collab.github.io/growing-with-gritty/style-tile/))
was designed from Kim's doc and mockup alone. V2 is built the opposite way:
study the best comparable sites first, extract what makes them feel alive,
then design a second direction — so Kim chooses between two real options
instead of approving the first idea she sees.

## What "wow" is allowed to mean (and what it isn't)

Carried over from PLAN.md no matter what the research says:

- **Kim's hand-drawn art is the only Gritty.** Motion is allowed (her cutout
  can bounce, tilt, peek in from an edge) but no generated or redrawn
  character art. If a pattern needs new poses, that becomes an *ask to Kim*
  (e.g. "draw Gritty waving"), never something we fabricate.
- **COPPA stance unchanged** — no accounts, no data collection, no
  third-party embeds. A "wow" that needs a YouTube embed or a sound CDN gets
  rebuilt self-hosted or dropped.
- **Kim can still edit everything** through the same simple CMS. No pattern
  that requires her to touch code survives synthesis.
- Accessibility floors stay: reduced-motion fallback for every animation,
  48px targets, AA contrast, sound (if any) strictly opt-in and off by default.

## Phase R1 — Research sweep

Four categories, each answering a different question:

| Category | Who (candidates) | What we're extracting |
| --- | --- | --- |
| **Character-brand sites** — the gold standard of "a character's world" | Pigeon Presents (Mo Willems), Seussville, Gruffalo.com, Bluey.tv, World of Eric Carle, Roald Dahl | The "wow" mechanic on arrival; how the character guides navigation; how motion/scene-setting works |
| **Working children's-author sites** — honest scale comparisons | Best-of lists (Rocket Expansion's 24 children's author sites, sitebuilderreport author roundup) → pick 5–6 actually-good indie ones | What a one-author site can sustain; book merchandising; newsletter/school-visit patterns |
| **Kids' education & mindset brands** — the content model | PBS Kids, GoNoodle, Big Life Journal (growth-mindset printables business), Character Lab (Duckworth — grit itself), ClassDojo Big Ideas, Storyline Online | How kid/grown-up audiences split; how printables & activities are organized and merchandised; teacher-facing patterns |
| **Kids' interaction patterns** — how play feels | Toca Boca, Sago Mini, Highlights Kids | Touch-first play patterns; reward/celebration moments; sound & motion etiquette for young kids |

Method & constraints (this environment): live **WebSearch + page-reading
work** from the session; **screenshots of external sites don't** (sandbox
network policy). So evidence lands as an annotated pattern write-up with
links — and for the 3–4 sites that emerge as most relevant, Adam clicks
through and (optionally) grabs screenshots for the record.

Per site, capture the same six notes so findings are comparable:

1. First 5 seconds — what makes it feel alive on arrival?
2. How do kids and grown-ups each find their path?
3. How are books/products presented and sold?
4. How are activities/printables organized?
5. Motion & sound — what's used, what's restrained, what's annoying?
6. **Steal one thing / avoid one thing.**

## Phase R2 — Synthesis

- `research/FINDINGS.md` in this repo: the notes above, then a pattern
  library where every pattern is mapped to Gritty specifically —
  *"Pigeon Presents does X → for Gritty that means Y"* — and sorted into
  **adopt / adapt / avoid**.
- Out of that, pick **three "wow" bets** for V2 (candidates going in, to be
  confirmed or killed by the research: an illustrated meadow *scene* as the
  homepage rather than a page layout; Gritty as a reactive guide who
  responds to what you do; a sticker/stamp-collecting metaphor unifying the
  activities). Three, not ten — V1's virtue is restraint and V2 shouldn't
  lose it.
- A one-page inspiration brief for Kim in plain language: what we looked
  at, what we're borrowing, what we're deliberately not doing.

## Phase R3 — Build style tile V2

- Same skeleton as V1 — palette, lettering, Gritty's voice, book card,
  scenario card, stamps, one working interaction — so the two tiles compare
  cleanly, section for section.
- Plus whatever the three bets demand (a hero scene mock, a motion demo, a
  second lettering direction if research says V1's type is too tame).
- Ships to **/style-tile/v2/** with V1 untouched at /style-tile/, and a tiny
  chooser page linking both. Kim gets one URL and votes.

## Phase R4 — Decide and fold in

- Kim picks a direction (or a mix — "V2's hero, V1's calm everywhere else"
  is a fine answer).
- The winning tokens/components get folded into `site/` as the real design
  system. The losing tile stays in the repo as a record of the road not
  taken.

## Open questions for Adam (answer before R3, not before R1)

1. **Motion budget** — is gentle-but-present motion (parallax scene, Gritty
   reacting) the right "wow", or should V2 chase it through richer
   illustration/layout instead? (Research will inform this, but it's
   ultimately taste — yours and Kim's.)
2. **Sound** — even opt-in, is it on the table? (Goat bleat on the YET
   button is either the best or worst idea in this document.)
3. **Asks to Kim** — V2 may generate a short wishlist of new drawings
   (Gritty waving, Gritty peeking, a meadow background). Is she up for
   drawing 2–3 new pieces if the direction needs them?

## Sources already in hand

- [Rocket Expansion — 24 children's author websites](https://rocketexpansion.com/childrens-author-websites/)
- [Site Builder Report — author website examples](https://www.sitebuilderreport.com/inspiration/author-websites)
- [Picture Book Brain — best children's author websites](https://www.picturebookbrain.com/best-childrens-author-websites/)
