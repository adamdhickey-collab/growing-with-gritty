# The icon system

> **Superseded, 1 Sep 2026.** The site now uses **Fluent Emoji Flat**
> (Microsoft, MIT) through Iconify — see §7. Everything above is the record of
> the hand-drawn attempt: the inventory in §1 is still the accurate map of
> every icon slot on the site, and §5's prompts still work if drawn art is
> ever wanted again.

# Emoji inventory → hand-drawn icon set

Every place the live site (`site/src`) currently renders a system emoji as an
icon, and the drawn replacement it maps to. The style tiles (`style-tile/v1`,
`v2`, `v3`) and the image chute page are frozen prototypes — their emoji are
deliberately left alone.

Target: **41 transparent PNGs**, one flat folder → `site/public/images/icons/`.

## 1. Where the emoji are

### Feelings — `site/src/pages/calming-corner.astro:12-17`, `mistake-maker.astro`
| Emoji | Used as | New file |
|---|---|---|
| 😡 | "Angry" feeling button | `feeling-angry.png` |
| 😢 | "Sad" feeling button | `feeling-sad.png` |
| 😟 | "Worried" feeling button | `feeling-worried.png` |
| 😩 | "Frustrated" feeling button | `feeling-frustrated.png` |
| 😴 | "Tired" feeling button | `feeling-tired.png` |
| 😬 | "Nervous" feeling button | `feeling-nervous.png` |
| 😜 | "Oops! I made a mistake" — `mistake-maker.astro:42,50,59,111` | `feeling-silly-oops.png` |

### Grit actions and values
| Emoji | Used as | New file |
|---|---|---|
| 🔄 / 🔁 | "Try Again" stamp `mistake-maker.astro:72`, "Trying again" `meet-gritty.astro:15`, "Kept trying" badge `grit-zone.astro:13`, "Play again" `grit-zone.astro:107` | `action-try-again.png` *(one icon covers all four)* |
| 💡 | "Learn From It" stamp, "Trying a new idea", "Learned from a mistake" badge, `mistake-maker.astro:43,125` | `action-idea.png` |
| 🤝 | "Ask for Help" stamp, "Asking for help", "Asked for help" badge | `action-ask-for-help.png` |
| 🧘 | "Take a Break" stamp, "Took a calming break" badge, Calming Corner `h1`, calm-down cards printable, `stretch-with-gritty.md` | `action-calm-break.png` |
| ✨ | "Tried something new" badge `grit-zone.astro:14` | `action-something-new.png` |
| 🧩 | "Trying something hard" `meet-gritty.astro:11` | `action-hard-thing.png` |
| 🧗 | "Keeping going" `meet-gritty.astro:12` | `action-keep-going.png` |
| 🧠 | Mistake Maker `h1`, YET brain line, links from `index.astro:76`, `grit-zone.astro:172` | `action-brain-grows.png` |
| 💪 | Grit Zone `h1`, link from `calming-corner.astro:104` | `action-strong.png` |
| ⛰️ | Multi-day streak line `grit-zone.astro:341` | `action-mountain-streak.png` |
| 🎉 | Finale "WOW! You showed grit today!" `grit-zone.astro:161` | `action-celebrate.png` |

### Hearts and stars
| Emoji | Used as | New file |
|---|---|---|
| ⭐ | Grit-choice marker `grit-zone.astro:46,50,90`, "Believed in myself" badge | `badge-star.png` |
| 🌟 | Finale burst `grit-zone.astro:97,102`, poster printable | `badge-star-burst.png` |
| 💛 | "Was kind" badge, `calming-corner.astro:143` | `heart-kind.png` |
| ❤️ | "Believing in yourself" `meet-gritty.astro:16` | `heart-believe.png` |
| 🫶 | "Helped someone" badge `grit-zone.astro:17` | `heart-hands-helped.png` |

### Calm strategies — `site/src/content/calm-strategies/*.md` frontmatter
| Emoji | Strategy | New file |
|---|---|---|
| 🌬️ | Five slow breaths (also the Breathe button, `calming-corner.astro:96,137`) | `calm-breathe.png` |
| 🖐️ | 5-4-3-2-1 senses | `calm-five-senses.png` |
| 💧 | Drink of water | `calm-water.png` |
| 🌸 | Flower and candle | `calm-flower-candle.png` |
| 💭 | Kind thought | `calm-kind-thought.png` |
| 🚶 | Movement break | `calm-movement.png` |
| 🗣️ | Talk to a grown-up | `calm-talk-grown-up.png` |
| 🌿 | Fallback when a strategy has no emoji `calming-corner.astro:71` | `calm-leaf.png` |

### Printables — `site/src/pages/grown-ups.astro:9-16`
| Emoji | Used as | New file |
|---|---|---|
| 🖍️ | Coloring page; also empty state `:46` and activity sheet button `books/[id].astro:42` | `printable-coloring-page.png` |
| 💬 | Discussion cards | `printable-discussion-cards.png` |
| 📓 | Grit journal | `printable-journal.png` |
| 🏆 | Certificate | `printable-certificate.png` |
| 📚 | Book guide | `printable-book-guide.png` |
| 🏫 | Classroom activity | `printable-classroom.png` |
| 🧘 | Calm-down cards | *reuses* `action-calm-break.png` |
| 🌟 | Poster | *reuses* `badge-star-burst.png` |

### Interface
| Emoji | Used as | New file |
|---|---|---|
| ⬇️ | "Download PDF" `grown-ups.astro:65` | `ui-download.png` |
| ➡️ | "Next challenge" / "Another one" `grit-zone.astro:97,139` | `ui-next-arrow.png` |
| 🛒 | "Buy the book" / "Order …" `books/[id].astro:41,65` | `ui-buy-cart.png` |
| 📖 | "Look inside" `books/[id].astro:52` | `ui-look-inside.png` |

### 🐐 — no new art needed
`meet-gritty.astro:68` (coming-soon portrait), `calming-corner.astro:93` (breath
circle), `books/[id].astro:91,105` (character chip fallback, grit-challenge
eyebrow). These should point at the Gritty art the site already ships —
`/images/gritty/gritty-face.webp` — rather than a new icon.

---

## 2. The prompt for ChatGPT

Paste everything between the lines as your **first** message. ChatGPT makes one
image per reply, so after it confirms, reply `next` (or `1`, `2`, …) and it will
work down the queue, giving you the exact filename to save each one as.

---

**Style lock — read once, apply to every image in this session.**

You are drawing a set of 41 icons for *Growing with Gritty*, a picture-book
website for children ages 4–10 by teacher, author, and illustrator Kim
Rekowski. The icons replace system emoji, so they must all look like they were
drawn by the same hand on the same afternoon.

**The look:** children's-book marker doodle. Confident, slightly wobbly black
ink outline of even weight (like a fine Sharpie), filled with flat
colored-pencil / marker color that shows a little grain and occasionally strays
a hair past the line. Rounded, friendly, chunky shapes. No gradients, no drop
shadows, no gloss, no 3D, no bevels, no glossy Apple-style emoji rendering, no
outer glow, no vector-flat corporate iconography, no text or letters anywhere in
the image.

**Palette — use only these:**
- ink outline `#2A3238`
- blue `#2C5F8A`
- soft sky `#BDD7E7`
- meadow green `#7FA86B`
- gold `#D9A93F`
- warm cream `#FAF6EC`
- goat tan/brown `#B98A55`
- rose/pink accent `#E8A0A8`
- true red for hearts `#D9534F`

**Format — every single image:**
- 1024 × 1024 square, **fully transparent background** (alpha, not white, not a
  checkerboard pattern drawn in)
- one subject, centered, filling about 84% of the canvas with even padding
- no background scenery, no ground shadow, no frame, no circle badge behind it
- readable when shrunk to 64 × 64 pixels — keep detail low and shapes big
- consistent apparent line weight across the whole set

**People:** where a person appears, draw a simple round-faced child with a
neutral light-tan skin tone, dot eyes and a simple curved mouth — the same child
each time. No hair or clothing detail beyond a simple shirt.

**How we work:** produce **one icon per reply**. After each image, print the
filename on its own line exactly as given below so I can save it correctly. Then
wait for me to say `next`. Do not batch images into a sheet. Do not add
captions, labels, or watermarks inside the artwork.

Confirm you've got the style lock, then generate #1.

**The queue:**

| # | Filename | Draw |
|---|---|---|
| 1 | `feeling-angry.png` | A child's face, brows down, cheeks flushed, mouth a firm zigzag — cross, not scary |
| 2 | `feeling-sad.png` | A child's face, brows up in the middle, downturned mouth, one small tear |
| 3 | `feeling-worried.png` | A child's face, wavy brows, small uncertain mouth, one hand near the cheek |
| 4 | `feeling-frustrated.png` | A child's face, eyes squeezed shut, gritted teeth, two tiny steam puffs at the temples |
| 5 | `feeling-tired.png` | A child's face, heavy half-closed eyes, small round yawn, three small sleep bubbles rising from the corner of the mouth (bubbles, never letters) |
| 6 | `feeling-nervous.png` | A child's face, wide eyes, wobbly flat mouth, one small sweat drop |
| 7 | `feeling-silly-oops.png` | A child's face grinning with tongue out and one eye winking — playful, "oops!" |
| 8 | `action-try-again.png` | Two thick arrows chasing each other in a circle, blue, with a small gold spark at the top |
| 9 | `action-idea.png` | A round light bulb lit gold, three short rays around it |
| 10 | `action-ask-for-help.png` | Two hands clasped in a handshake — one child-sized, one grown-up-sized |
| 11 | `action-calm-break.png` | A child sitting cross-legged, eyes closed, hands resting on knees, small calm smile |
| 12 | `action-something-new.png` | Three sparkles of different sizes, four-pointed, gold with a blue one behind |
| 13 | `action-hard-thing.png` | Two chunky jigsaw pieces, blue and green, just clicking together |
| 14 | `action-keep-going.png` | A child climbing a small rock face, one hand reaching up for the next hold |
| 15 | `action-brain-grows.png` | A friendly rounded brain, pink, with a tiny green sprout growing out the top |
| 16 | `action-strong.png` | A child's arm flexed to show a bicep, gold sleeve, two small motion marks |
| 17 | `action-mountain-streak.png` | A green-and-blue mountain with a gold flag planted on the summit |
| 18 | `action-celebrate.png` | A party popper bursting with confetti in blue, green, and gold |
| 19 | `badge-star.png` | One plump five-pointed gold star, solid fill |
| 20 | `badge-star-burst.png` | A plump gold star with three small sparkles radiating around it |
| 21 | `heart-kind.png` | One plump gold-yellow heart |
| 22 | `heart-believe.png` | One plump red heart |
| 23 | `heart-hands-helped.png` | Two hands cupped together forming a heart shape between them |
| 24 | `calm-breathe.png` | A curling blue puff of breath / wind swirl, soft and rounded |
| 25 | `calm-five-senses.png` | An open child's hand, palm forward, five fingers spread |
| 26 | `calm-water.png` | A glass of water, blue, with one drop falling above it |
| 27 | `calm-flower-candle.png` | A pink flower beside a short lit candle — the smell-the-flower, blow-the-candle pair |
| 28 | `calm-kind-thought.png` | A cloud-shaped thought bubble with a small gold heart inside it |
| 29 | `calm-movement.png` | A child mid-stride walking, arms swinging, two small motion marks behind |
| 30 | `calm-talk-grown-up.png` | A child's head looking up at a grown-up's head, one speech bubble shared between them |
| 31 | `calm-leaf.png` | A single rounded green leaf with a visible center vein |
| 32 | `printable-coloring-page.png` | Three crayons fanned out — blue, green, gold — one with its tip worn down |
| 33 | `printable-discussion-cards.png` | Two overlapping speech bubbles, blue and green, one with three dots |
| 34 | `printable-journal.png` | A closed notebook with a spiral binding and a pencil resting on it |
| 35 | `printable-certificate.png` | A trophy cup in gold with two handles and a small star on the front |
| 36 | `printable-book-guide.png` | A stack of three closed books, blue, green, and gold |
| 37 | `printable-classroom.png` | A simple schoolhouse with a peaked roof, one door, two windows, and a small flag |
| 38 | `ui-download.png` | A thick downward arrow above a short open tray line, blue |
| 39 | `ui-next-arrow.png` | A thick rightward arrow, blue, rounded tip |
| 40 | `ui-buy-cart.png` | A small shopping cart seen from the side, blue frame, gold wheels |
| 41 | `ui-look-inside.png` | An open book seen from above, pages curving up, a gold ribbon bookmark |

---

## 3. Bringing them back in

Save all 41 into one folder (e.g. `~/Downloads/gritty-icons`), keeping the exact
filenames, then:

```bash
cd site && for f in ~/Downloads/gritty-icons/*.png; do npm run add-image -- "icons/$(basename "$f" .png)" "$f"; done
```

Each lands as `site/public/images/icons/<name>.webp` — the chute resizes and
converts, and webp keeps the transparency. It refuses duplicates and refuses to
overwrite, so a re-run is safe. Then the emoji in the tables above get swapped
for `<img src={u('/images/icons/<name>.webp')} alt="" aria-hidden="true">`,
which is a code change, not an art one.

---

## 4. Status — first delivery, 1 Sep 2026

40 of 41 landed in `site/public/images/icons/`. Technically clean: true alpha
(every corner reads `0,0,0,0`), square, correctly named, and the sampled fills
hit the tokens exactly — `#D9A93F`, `#7FA86B`, `#2C5F8A`, `#BDD7E7`, `#D9534F`,
`#2A3238`, `#B98A55`, `#FAF6EC`. No duplicates: the chute compared all 40
converted files and refused none.

**Still to draw**

- `action-idea.png` — never arrived. It's one of the busiest icons on the site:
  the "Learn From It" stamp, "Trying a new idea", the "Learned from a mistake"
  badge, and the Mistake Maker's learned line.

**Worth redrawing — too faint or unreadable at 64px**

| File | Problem at icon size |
|---|---|
| `action-brain-grows` | Reads as a pink blossom cluster, not a brain |
| `calm-leaf` | Reads as a green stone — the vein disappears |
| `heart-kind` | Two gold circles over a V; reads as balloons, not a heart |
| `calm-breathe` | Thin pale blue lines, nearly invisible on cream |
| `calm-talk-grown-up` | Three small heads plus a bubble — mush below 96px |
| `action-strong` | The arm reads as a brown blob |
| `calm-kind-thought` | Cloud outline too light; the heart inside is lost |
| `action-celebrate` | Popper is thin and off to one side |

**Character consistency in the feelings set**

The brief asked for the same child every time. Three break it:
`feeling-angry` has noticeably paler skin than the other six;
`feeling-tired` and `feeling-worried` are blonde where the rest are brown-haired;
and `feeling-worried` is the only one drawn with shoulders and a shirt rather
than as a floating face.

When regenerating any of these, use the per-icon template in §2 and add:
*"Match this exactly: a round-faced child with mid-brown tousled hair, warm tan
skin, dot eyes, rosy round cheeks. Head only, no shoulders, no shirt."*

---

## 5½. Round two results — 1 Sep 2026, afternoon delivery

Eleven came back (`feeling-angry` wasn't in the zip). Six passed QC, landed,
and their emoji were swapped for icons in the pages:

- **Landed:** `action-idea` (ray tips clip the canvas edge — usable, but worth
  a polish redo someday), `calm-leaf`, `heart-kind`, `calm-breathe`,
  `calm-kind-thought`, `action-celebrate`.
- **Bounced — still owed for round three:**

| File | Why it bounced |
|---|---|
| `feeling-tired` | A different child entirely: ink-zigzag helmet hair, flat vector face — nothing like `ref-icon-child` |
| `feeling-worried` | Same wrong child and rendering |
| `feeling-angry` | Not in the delivery |
| `calm-talk-grown-up` | Faceless heads with detached floating hair — unsettling, unreadable |
| `action-strong` | Still a brown blob; no improvement on round one |
| `action-brain-grows` | Angular crumple reads as a squashed apple, not a brain |

The whole afternoon batch rendered harder-edged than round one — flat
polygonal vector rather than wobbly ink and pencil grain. Since group A runs
on words only (see below), round three should bolt this onto each prompt:
*"Curves must be round and hand-wobbly, never faceted or polygonal. Fills
show colored-pencil grain. This is a child's-book doodle, NOT geometric
vector iconography."* The six that landed got away with it; the five that
bounced didn't.

The solid blue/gold buttons (Breathe, Visit the Grit Zone, Visit the Mistake
Maker, the Oops/Turn machine buttons) keep their emoji on purpose —
ink-on-transparent art goes muddy on those grounds (see Icon.astro's header
note).

## 5. Round two — 11 prompts

**Group A takes no attachment.** Tried on 1 Sep: attaching `ref-icon-style.png`
got all eight of its icons redrawn instead of the subjects asked for — ten
duplicates and nothing from the queue. An attached image reads as "make this,"
not "match this." Round one's forty came back on-style from the written block
alone, so group A runs on words only.

Group B attaches **`ref-icon-child.png`** (in `reference/`), because matching a
specific child is the whole job there — with the do-not-redraw line that opens
the block. Check what comes back is the expression asked for, not another copy
of the reference.

One prompt per message, one image back each time. Don't paste them as a list.

`feeling-angry` was dropped from this round: its skin is paler than the other
six, but on the live buttons it reads fine, and it isn't worth a generation.

### Group A — nine objects and symbols · no attachment

**A1 · `action-idea.png`** — *missing from the first batch*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: a single round light bulb. Glass in cream
> #FAF6EC with gold #D9A93F filling the lower half like a lit glow, a short
> grey-blue screw base beneath it, and four short straight gold rays radiating
> from the top and upper sides. The bulb fills most of the canvas.
> SAVE AS: action-idea.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A2 · `action-brain-grows.png`** — *last one read as a pink blossom cluster*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: a brain as ONE rounded mass with three or
> four bold, widely spaced curved fold lines in ink across its surface — not a
> cluster of small lobes or petals. Soft pink #E8A0A8 fill. A single small green
> sprout with two leaves rising from the top centre. Few folds, thick and far
> apart, so they survive at 64px.
> SAVE AS: action-brain-grows.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A3 · `calm-leaf.png`** — *last one read as a green stone*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: one leaf with a clearly pointed tip and a
> curved, asymmetric outline — not a rounded blob or a hexagon. Green #7FA86B
> fill, one thick ink centre vein running the full length, three short side
> veins branching off it, and a short curving stem at the base so the leaf's
> direction is obvious.
> SAVE AS: calm-leaf.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A4 · `heart-kind.png`** — *last one read as two balloons on a wedge*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: ONE heart drawn as a single continuous
> outline — two rounded lobes at the top meeting in a shallow V dip, tapering to
> a point at the bottom. Gold #D9A93F fill. The lobes must join into one solid
> shape; do NOT draw them as two separate circles sitting on a wedge.
> SAVE AS: heart-kind.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A5 · `calm-breathe.png`** — *last one was thin pale lines, invisible on cream*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: one bold ribbon of breath — a single thick
> ink-outlined band curling from the lower left up into a loose spiral at the
> upper right, filled with sky blue #BDD7E7, with two small round outlined puffs
> trailing behind it. One ribbon only, with the same heavy ink outline as every
> other icon — not thin unoutlined strokes.
> SAVE AS: calm-breathe.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A6 · `calm-talk-grown-up.png`** — *last one was a muddle of small heads*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: TWO heads only, both large, in profile
> facing each other — a small child's head on the left, a taller grown-up's head
> on the right, shoulders just visible at the bottom edge. One single cream
> speech bubble with an ink outline floats between and slightly above them. No
> extra faces, no extra bubbles, no small floating heads.
> SAVE AS: calm-talk-grown-up.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A7 · `action-strong.png`** — *last one read as a brown blob*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: one arm flexed to show a bicep, seen from
> the side — a horizontal forearm along the bottom, elbow at the right, upper arm
> rising to the left with a big rounded bicep bulge on top. Tan #B98A55 skin, a
> blue #2C5F8A shirt cuff at the shoulder end, and a clenched fist with visible
> ink knuckle lines. The bicep bulge and the fist must each read as their own
> clear shape.
> SAVE AS: action-strong.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A8 · `calm-kind-thought.png`** — *last one's outline was too light to survive*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: a thought cloud as one bold bumpy outline
> in heavy ink, filled solid with cream #FAF6EC so it reads as a shape and not an
> outline. One plump gold #D9A93F heart sits large in the centre, filling about
> half the cloud's width. Two small round trailing bubbles below and to the left,
> both ink-outlined.
> SAVE AS: calm-kind-thought.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

**A9 · `action-celebrate.png`** — *last one was thin and off to one side*

> Draw ONE icon. No reference image is provided; draw from this description
> alone.
> SUBJECT: a party popper centred in the canvas, its
> cone pointing up and to the right from the lower left — a fat cone with bold
> diagonal gold and blue stripes, mouth wide open, with six or seven chunky
> confetti pieces bursting out: short curls, fat dots, and small stars in gold,
> green, and blue. Thick cone, large confetti.
> SAVE AS: action-celebrate.png
> STYLE: children's-book marker doodle — a confident, slightly wobbly black ink
> outline of even weight, filled with flat colored-pencil colour with visible
> grain. Rounded, chunky, friendly shapes.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> CANVAS: 1024x1024 square, fully transparent background — no backdrop, no
> colour wash, no circle or badge behind the subject.
> MUST READ AT 64 PIXELS: few shapes, thick lines, generous spacing.
> NEVER: gradients, glows, drop shadows, 3D, gloss, Apple-emoji rendering, any
> text or letters anywhere, more than one icon, a grid, a border.

### Group B — two feelings · attach `ref-icon-child.png`

Both faces drifted off-model. These are match-the-reference jobs, so the
character comes first and the expression second.

**B1 · `feeling-tired.png`** — *last one was blonde*

> Draw ONE icon. The attached image is a STYLE AND CHARACTER REFERENCE ONLY.
> Do NOT redraw it and do NOT copy either face in it — those two icons already
> exist. Draw the ONE new expression named below, on the same child.
> Match that child EXACTLY: the same round face, mid-brown tousled hair, warm
> tan skin, dot-and-highlight eyes, rosy round cheeks, same ink weight and
> pencil grain. Head only, floating — no neck, no shoulders, no clothing.
> EXPRESSION: heavy half-closed eyes, a small round open yawn, three small
> ink-outlined sleep bubbles rising from the upper right. Hair must be the same
> mid-brown as the reference — not blonde.
> SAVE AS: feeling-tired.png
> CANVAS: 1024x1024 square, fully transparent background, no backdrop or badge.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> NEVER: gradients, glows, drop shadows, 3D, gloss, any text, more than one icon.

**B2 · `feeling-worried.png`** — *last one was blonde and had shoulders and a shirt*

> Draw ONE icon. The attached image is a STYLE AND CHARACTER REFERENCE ONLY.
> Do NOT redraw it and do NOT copy either face in it — those two icons already
> exist. Draw the ONE new expression named below, on the same child.
> Match that child EXACTLY: the same round face, mid-brown tousled hair, warm
> tan skin, dot-and-highlight eyes, rosy round cheeks, same ink weight and
> pencil grain. Head only, floating — no neck, no shoulders, no clothing.
> EXPRESSION: wavy raised brows, wide eyes, a small uncertain wavy mouth, one
> small blue sweat drop at the temple. It must be clearly DIFFERENT from the
> nervous face in the reference: brows higher and more arched, mouth wavier,
> and one hand is NOT shown. Hair must be the same mid-brown — not blonde.
> Head only: no shoulders, no shirt.
> SAVE AS: feeling-worried.png
> CANVAS: 1024x1024 square, fully transparent background, no backdrop or badge.
> COLOURS, only these: ink #2A3238, blue #2C5F8A, sky #BDD7E7, green #7FA86B,
> gold #D9A93F, cream #FAF6EC, tan #B98A55, pink #E8A0A8, red #D9534F.
> NEVER: gradients, glows, drop shadows, 3D, gloss, any text, more than one icon.

### Landing them

Same loop as before — `--replace` is what lets the ten redraws overwrite the
versions already in `public/images/icons/`:

```bash
cd site && for f in ~/Downloads/gritty-icons-2/*.png; do npm run add-image -- "icons/$(basename "$f" .png)" "$f" --replace; done
```

`action-idea.png` is new, so it lands with or without the flag. The chute
resizes to 256px on the way in, so full-size exports are fine.

## 6. The code swap — done for the solid 32

`components/Icon.astro` is the one place that knows where the art lives.
Decorative by contract (`alt=""`, `aria-hidden`), sized in `em` so it scales
with the type beside it, and the word next to it always carries the meaning.

**Wired up**

| Page | Now drawn |
|---|---|
| Calming Corner | all six feeling faces, the `h1`, five of the eight calm strategies |
| Grit Zone | six of eight check-in coins, two of three tabs, trail stop stars, the cheer star, the finale burst, the YET "another one" arrow, the streak line |
| Mistake Maker | the oops face (list, machine, and the ghost button), three of four stamps |
| Meet Gritty | five of six "what is grit" cards |
| Grown-Ups | all eight printable kinds, the empty-state crayon, the "Bring Gritty home" eyebrow |
| Book page | "Look inside", the activity-sheet button |

Content keeps `emoji` as the fallback and gains an optional `icon`, so Kim's
CMS field still works and the four printable kinds she hasn't uploaded yet
already have their art waiting.

**Left as emoji, on purpose**

- The nine still to draw (§4) — `💡 🧠 🌿 💛 🌬️ 🗣️ 💪 💭 🎉`.
- `🐐` in four spots. These should point at `gritty-face.webp`, which the site
  already ships — a separate change, not an icon one.
- The `⭐` in the noscript block: one is inside a CSS `content:` string, which
  can't hold an image.
- Anything sitting on a **solid blue or gold button** — `⬇️ Download PDF`,
  `😜 Oops!`, `🔄 Turn my OOPS`, `🔁 Start a new climb`, `⛰️ Back to the trail`,
  `⬅️ Back to the trail`. The art is ink-on-transparent and goes muddy on a
  saturated ground; `ui-buy-cart` was tried on the gold buy button and shrank
  to a dark speck, so `IconCart` keeps its `currentColor` SVG.

`ui-download.webp` is the one solid icon with nowhere to go — its only slot is
a blue button, and it's a blue arrow. It needs either a cream-ink variant or
that button restyled to `btn-ghost`.

**Two things fixed along the way**

- The icons landed at 1024–1254px (40–290KB) for slots that display at 26–34px.
  Re-run through the chute at 256px: **4.1MB → 684KB**, largest now 20KB, in
  line with the 128px nav icons.
- Mistake Maker had the same `[hidden]` bug grit-zone documents at its line
  661: a class's `display` beats the UA's `[hidden]`, so the no-JS list, the
  machine stage, and the "Another mistake" button were all on screen from first
  paint. Invisible before because the leaking elements were empty; the drawn
  icon inside them made it obvious. Fixed the way grit-zone does.

---

## 7. The library switch — Fluent Emoji Flat

The hand-drawn set was inconsistent from one icon to the next, which is what a
freehand set does across 41 drawings. Replaced with a real system.

**How it works.** `astro-icon` + `@iconify-json/fluent-emoji-flat`, configured
in `astro.config.mjs`. SVGs are **inlined at build time** — nothing is fetched
at runtime, so there is no CDN, no CSP problem, and no extra request per icon.
Being vector, they stay sharp at any size and fill their box, which is why
everything now reads larger even where the number barely changed: the drawn
PNGs carried ~15% internal padding.

**`components/Icon.astro` is still the only file that knows.** Call sites ask
for a meaning — `<Icon name="action-idea" />` — and the map inside translates
to Fluent's vocabulary. Every page kept working through the swap without an
edit. An unknown name throws at build time rather than shipping a hole.

**Kept as Kim's own art, untouched:** the seven header nav icons, and the two
big welcome buttons under the hero.

**Sizes, roughly doubled where they were smallest:** feelings 3.6rem, calm
strategies 3rem, grit cards 3.6rem, check-in coins 3.4rem, tabs 2.9rem, stamps
66px, finale 4.5rem, inline default 1.3em. Several wrapper spans had a
`font-size` that clipped a taller inline SVG; they now size to their contents.

**Everything is an icon again**, including the spots the drawn set couldn't
hold: full-colour glyphs read fine on the solid blue and gold buttons where
ink-on-transparent art went muddy, so `ui-download`, the cart, and the Grit
Trail's own controls are all wired now.

**Licence:** MIT (Microsoft). No attribution requirement.

### Two loose ends

- The 41 drawn `.webp` files in `public/images/icons/` are now unreferenced
  (~630KB). Left in place deliberately — they're committed, and they may still
  be wanted for print or a future pass. Safe to delete whenever.
- Four `🐐` remain, standing in for Gritty: the Meet Gritty portrait
  placeholder, the Calming Corner breath circle, and two spots on a book page.
  A stock library goat would be wrong for him — these should point at
  `gritty-face.webp`, which the site already ships.
