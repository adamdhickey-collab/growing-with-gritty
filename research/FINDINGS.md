# V2 Research Findings

Phase R1–R2 of [V2-PLAN.md](../V2-PLAN.md). Four parallel research sweeps
(character-brand sites · working author sites · mindset/education brands ·
kids' interaction patterns), synthesized into patterns mapped to Gritty and
three "wow" bets for style tile V2.

## Read this first: evidence quality

This environment's network proxy blocked direct fetches of nearly every
studied site, so **almost all site-specific notes are secondhand** —
assembled from search snippets, indexed URLs/page titles, the sites' own
help/privacy pages, and third-party reviews, with every claim labeled by
the researcher that gathered it. The children's-UX guidelines are the
best-sourced material (NN/g research + practitioner writeups, links below).

**Before building V2, Adam: spend 15 minutes clicking through the top four
sites yourself** — bluey.tv, biglifejournal.com/pages/freebies,
storylineonline.net (any book page), and highlightskids.com (Hidden
Pictures) — to sanity-check the patterns we're borrowing. Raw category
write-ups with all per-site notes: agent outputs are summarized here;
this file is the record.

## The pattern library — mapped to Gritty

### ADOPT (obvious wins, low risk — go straight into V2 and the site)

| # | Pattern | Seen at | For Gritty this means |
| --- | --- | --- | --- |
| A1 | **Verb-based nav + quarantined Grown-Ups zone.** Kid sections named for actions; ALL commerce, email, and educator material corralled in one labeled adult area | Bluey (Watch/Play/Make/Grown-ups), PBS (two-site split), Toca Boca (/kids) | Nav becomes **Read · Play · Make · Grown-Ups**. Buy buttons, newsletter, teacher guides live only under Grown-Ups. Makes the COPPA story legible at a glance |
| A2 | **Story-anchored activity naming.** Every printable named after a scene/character, never generic | Roald Dahl ("Mr Twit's beard" not "beard craft"), Gruffalo, Pigeon Presents | "Gritty's Tower Challenge," "Grandpa Goat's Garden Maze" — every download quietly markets a specific book |
| A3 | **The author's hand as a feature.** Creator teaches kids to make the art | Mo Willems (learn to draw the Pigeon — his signature printable), Eric Carle (tissue-collage technique page) | A **"Learn to draw Gritty with Kim"** page: her step-by-step drawing sheets + a note on how she paints. Cheapest, most differentiating asset a hand-drawn self-published brand can ship |
| A4 | **The paired resource unit.** One kid-facing piece bonded to one matching grown-up guide | Storyline Online (teacher guide + parent guide per book), ClassDojo (Mojo video + discussion guide), Character Lab playbooks | Every Gritty kid activity ships with its grown-up talk-guide — same theme, same page, two audiences |
| A5 | **Playbook-per-value.** One strength, one page: what it means / try at home / try in class | Character Lab (Heart-Mind-Will taxonomy; **shut down 2024 — the grit-parents hub is gone, real opening for Gritty**) | Four value pages (Be Determined / Be Kind / Believe in Yourself / Never Give Up), each a mini-playbook feeding the Grown-Up Grit Guide |
| A6 | **Named place, not nav label.** The play area is a location in the story world | Gruffalo ("the Deep Dark Wood") | Gritty's World sections become places: **Gritty's Meadow** (play), **The Calm Corner** (already named), **Grandpa's Barn** (make/printables) |
| A7 | **Spec-sheet school visits page.** Length, format, grade band, group size — pre-answers a principal's questions | Drew Daywalt, Traci Sorell | Kim is a working teacher — she can write this better than anyone. One page, no email back-and-forth |
| A8 | **Age-banded, ungated downloads hub** | Traci Sorell (free resources by ages 4+/7+/MG), PBS Activity Finder (age/topic/format filters) | Grown-Up Grit Guide gets simple filters: age band + type + book. No signup wall on printables |

### ADAPT (good ideas that need reshaping for a one-teacher, static, COPPA-safe site)

| # | Pattern | Seen at | The adaptation |
| --- | --- | --- | --- |
| B1 | **The animated world-homepage.** Praised at Seussville ("lush animated environments") but heavy, slow, agency-maintained (Jeffers' time-of-day cinematic homepage) | Seussville, Oliver Jeffers | Keep the *feeling*, drop the weight: a lightweight watercolor **scene band** (sky, hills, meadow, Gritty) in CSS/SVG — a place, not a page, that loads instantly |
| B2 | **Collection as reward — never points, timers, or fail states** | Toca Boca ("Post Office has a gift for you"; "no levels, no winning or losing"), Sago Mini, Highlights (finding objects unlocks more) | Sticker/badge collecting in localStorage: **"Gritty left something for you"** after activities. No streaks, no scores, nothing to lose |
| B3 | **Freebies page + named-promise newsletter** | Big Life Journal (freebies + instant "Parent's Guide" welcome gift), Jeffers ("first Tuesday of each month"), Ballow ("free welcome bundle") | Phase-later, adults only, inside Grown-Ups: "Kim's classroom note, first Monday each month" + a welcome printable. Never on kid pages; skip entirely until Kim wants the commitment |
| B4 | **Character-page-as-hub** | Pigeon Presents /pals/ (books reached through character pages) | Meet Gritty already exists; V2 strengthens it — each character card links to "their" books and activities |
| B5 | **Pictures-or-words answer modes** | Highlights Hidden Pictures (picture list for pre-readers, word list for readers; hints always available; kid picks the pressure level) | Grit Zone quizzes get icon+text answer buttons readable both ways, and Gritty always offers a hint — never a fail |

### AVOID (deliberate no's, with reasons)

- **Heavy exploratory homepage / autoplay video** (Seussville's load-time criticism; Jeffers' agency-run cinema) — a slow wow is an anti-wow on a static budget.
- **Account walls on kid content** (GoNoodle, ClassDojo) — being login-free is Gritty's competitive advantage; state it proudly.
- **Ads or interstitials of any kind, even house ads** (Highlights' weak spot per reviews) — erodes the safety story that is Gritty's core trust asset.
- **Activities as dated blog posts** (Ballow's blog treadmill, with a live typo'd slug) — evergreen pages at owned URLs instead.
- **Endless paginated activity lists** (Gruffalo's 11 pages) — filter, don't paginate.
- **Pun-branded nav** (Pigeon's "Vid-e-mos") — works only with fame; Gritty's labels stay plain.
- **Video read-alouds as the core resource** (Numeroff) — production-heavy for one person; printables are Kim's sustainable format.
- **Upsell/bundle-percentage merchandising tone** (Big Life Journal's "Save 10%" framing) — reads pushy on a one-author warmth brand.

## The children's-UX spec (best-sourced findings — bake into V2 as rules)

1. **Touch targets ~2cm × 2cm** with generous gaps for young kids (≈4× adult minimums); no drag, double-tap, or multi-touch for under-7s. ([NN/g physical development](https://www.nngroup.com/articles/children-ux-physical-development/))
2. **Icon + text on every important control** — pre-readers navigate by picture; readers by words. Never text-only. ([AufaitUX](https://www.aufaitux.com/blog/ui-ux-designing-for-children/))
3. **Feedback must be instant and theatrical** — under-6s completely miss subtle acknowledgment; a successful tap should visibly bounce/glow/react within a beat. ([NN/g kids' cognition](https://www.nngroup.com/articles/kids-cognition/))
4. **State the goal in one plain sentence** at the top of every activity. (NN/g)
5. **A 4-year-old and an 8-year-old are different users** — offer format switches (B5), not one middle setting. ([NN/g children's UX report](https://www.nngroup.com/reports/children-on-the-web/))
6. **Pressure-free by design** — no timers, scores, or lose-states anywhere (Toca/Sago philosophy, consistent with all of B2).

## The three "wow" bets for style tile V2

Confirmed, killed, or reshaped by the research:

1. **The Meadow** *(reshaped from "illustrated scene homepage")* — the V2
   homepage is a place: a lightweight layered watercolor scene band (sky,
   hills, meadow) with Kim's Gritty standing in it, gentle parallax on
   scroll, sections named as locations (A6). CSS/SVG only, instant load,
   full reduced-motion fallback. *The research killed the heavy version
   and endorsed the light one.*
2. **Gritty Reacts** — Gritty is a presence, not a picture: he watches,
   bounces when you tap him, celebrates theatrically when a kid answers a
   Grit Zone question or presses YET (UX rule 3), offers hints (B5).
   *Needs 3–4 new poses from Kim* — waving, cheering, thinking, peeking
   from a page edge — which becomes the drawing wishlist.
3. **Gritty's Gifts** — the collection system (B2): activities leave a
   sticker in the kid's meadow (localStorage), framed as "Gritty left
   something for you." No accounts, no scores, nothing to lose.

Plus one structural change that isn't a bet because the research made it
unanimous: **Read · Play · Make · Grown-Ups** navigation with the
quarantined adult zone (A1).

## Drawing wishlist for Kim (only if V2 direction wins)

1. Gritty waving hello · 2. Gritty cheering (arms up) · 3. Gritty
thinking/pondering · 4. Gritty peeking in from an edge · 5. (nice to have)
a simple meadow/hills background wash, any size — the site can extend it.

## Sources

Roundups & reviews reachable from this environment:
[Rocket Expansion children's author sites](https://rocketexpansion.com/childrens-author-websites/) ·
[Picture Book Brain best author sites](https://www.picturebookbrain.com/best-childrens-author-websites/) ·
[NN/g children's UX](https://www.nngroup.com/articles/kids-cognition/) ·
[Common Sense Media](https://www.commonsensemedia.org/website-reviews/highlights-kids) ·
EdWeek Market Brief (Character Lab closure, Feb 2024).
Studied sites (mostly via search/snippets — see evidence note):
pigeonpresents.com · seussville.com · gruffalo.com · bluey.tv ·
eric-carle.com · roalddahl.com · jenniferballowauthor.com ·
tracisorell.com · lauranumeroff.com · drewdaywalt.com · oliverjeffers.com ·
pbskids.org · gonoodle.com · biglifejournal.com · characterlab.org ·
classdojo.com · storylineonline.net · tocaboca.com · sagomini.com ·
highlightskids.com
