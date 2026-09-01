# Scene art, round two — four distinct backdrops

> **Status: all four landed, 1 Sep 2026.** Read (gold), Make (green walls),
> and Calming Corner (rose) came back as straight edits of Kim's scenes; Play
> became a new scene, `gritty-climbing.webp` (see prompt 2). Kept for the
> record and for any future redo.

The homepage's "Where do you want to go?" grid uses Kim's four activity
scenes (`site/public/images/scenes/`), and three of them — Read, Play, and
Calming Corner — sit on the identical pale-sky-over-green-grass backdrop, so
the row reads as one repeated card. Two changes, both flagged 1 Sep 2026:

1. **Each card gets its own clear, bright background accent** so the four
   destinations are tellable apart at a glance.
2. **The Play scene's face gets redrawn.** Gritty's brows are angled down and
   in — he reads as cross with his own tower. Kim called this one herself when
   she delivered the scenes: *concentrating, not mad.*

The accents come from the site's own art palette (same hexes as the icon set —
tokens are law, for art too):

| Card | File | Accent | Why |
|---|---|---|---|
| Read | `gritty-reading.png` | warm gold `#D9A93F`, lightened toward cream | story-time sunshine; makes the blue book pop |
| Play | `gritty-building-blocks.png` | clear bright sky blue, `#BDD7E7` deepened toward `#2C5F8A` | Play keeps blue, but saturated enough to read as *chosen*, not leftover |
| Make | `gritty-coloring.png` | meadow green `#7FA86B`, lightened | the room's walls go green; the only indoor scene stays indoor |
| Calming Corner | `gritty-calm.png` | rose `#E8A0A8`, lightened | soft sunset-pink — the calm one at a glance |

The green ground stays green in all three outdoor scenes — the accent is the
sky/backdrop, so the row still reads as one world.

## The prompts

Same working method as the icon redraws: **one prompt per message, attach the
current image to each**, and ask for an edit, not a fresh drawing — that's
what keeps Kim's character on-model. The current files to attach are in
`site/public/images/scenes/` (`.webp` — if ChatGPT refuses the format, convert
first: `sips -s format png gritty-reading.webp --out gritty-reading.png`).

**1 · `gritty-reading.png`** — *attach `gritty-reading.webp`*

> Edit the attached illustration. Change ONLY the background: replace the pale
> blue sky with a warm, bright golden-yellow wash — gold #D9A93F lightened
> toward cream, like story-time sunshine. Keep the soft green ground exactly
> as it is. Keep the goat, the blue book, the pose, the expression, the line
> work, and the colored-pencil texture EXACTLY as in the attached image. Flat
> color wash — no gradients, no sun, no clouds, no added scenery, no text.
> Square image, same size as the attached.

**2 · ~~`gritty-building-blocks.png`~~ — done, differently.** Landed 1 Sep as
`gritty-climbing.webp`: rather than editing the blocks scene, Play got a new
scene — Gritty happily climbing a trail toward a summit flag on the bright
saturated blue from this brief. Fits the card's destination (the Grit Zone's
main game is the Grit Trail). The blocks scene stays in the library unused.
The original prompt, kept for reference:

*attach `gritty-building-blocks.webp`*

> Edit the attached illustration. Two changes only.
> ONE: replace the pale washed-out sky with a clear, bright, saturated sky
> blue — #BDD7E7 deepened toward #2C5F8A — a confident flat wash. Keep the
> green ground exactly as it is.
> TWO: redraw the goat's expression. Right now his eyebrows angle down and
> inward and he looks cross. He should look happily focused on placing the top
> block: soft rounded eyebrows lifted slightly (like the attached goat's usual
> friendly face), eyes looking at the block in his hooves, a small open smile
> of concentration. Concentrating and delighted — NOT angry, NOT frowning.
> Keep everything else — the blocks, the tower, the pose, the line work, the
> colored-pencil texture — EXACTLY as in the attached image. No gradients, no
> clouds, no added scenery, no text. Square image, same size as the attached.

**3 · `gritty-coloring.png`** — *attach `gritty-coloring.webp`*

> Edit the attached illustration. Change ONLY the wall color: the blue room
> walls become a fresh meadow green — #7FA86B lightened to a soft bright wall
> paint. Keep the poster, the window and its view, the desk, the crayons, the
> goat, his happy expression, the coloring page, the line work, and the
> colored-pencil texture EXACTLY as in the attached image. Flat wall color —
> no gradients, no new decorations, no added text anywhere. Same size and
> framing as the attached.

**4 · `gritty-calm.png`** — *attach `gritty-calm.webp`*

> Edit the attached illustration. Change ONLY the background: replace the pale
> blue sky with a soft rose-pink wash — #E8A0A8 lightened, like a calm sunset.
> Keep the green ground exactly as it is. Keep the goat, the cross-legged
> pose, the peaceful expression, the line work, and the colored-pencil texture
> EXACTLY as in the attached image. Flat color wash — no gradients, no sun, no
> clouds, no added scenery, no text. Square image, same size as the attached.

## Landing them

Save the four with the exact filenames above (e.g. into
`~/Downloads/gritty-scenes-2/`), then:

```bash
cd site && for f in ~/Downloads/gritty-scenes-2/*.png; do npm run add-image -- "scenes/$(basename "$f" .png)" "$f" --replace; done
```

`--replace` overwrites the current four in `site/public/images/scenes/`. No
code changes needed — the homepage cards pick up the new art as-is.
(`gritty-backpack.webp` is the fifth scene in that folder and isn't part of
this round.)

---

# Scene art, round three — the whole herd

> **Status: all five landed, 1 Sep 2026**, as `meet-*.webp` in
> `site/public/images/scenes/`. The Meet Gritty cards read them from a new
> `scene` field on each character; `portrait` (the cutout) stays for the
> small avatars on the book pages.

The "Gritty's family & friends" cards on Meet Gritty sat on white with Kim's
cutout portraits. This round gives each goat the homepage treatment: the same
drawing, untouched, on its own brand color with a green grass strip and one
object at its feet.

| Character | File | Background | Object | Why |
|---|---|---|---|---|
| Gritty | `meet-gritty.webp` | Meadow Green `#7FA86B` | blue school backpack | first day of school; the meadow he stands in |
| Grandpa Goat | `meet-grandpa-goat.webp` | Gritty Blue `#2C5F8A` | wooden "I have GRIT! I don't quit!" sign | his words started it all |
| Gabby | `meet-gabby.webp` | Blush Pink `#FDB8B9` (`--gg-pink`) | daisies tied with pink gingham | the friendship expert; matches her flower and bow |
| Grandma Goat | `meet-grandma-goat.webp` | Sun `#F2D48A` | wicker snack basket | "don't forget a good snack"; her straw hat |
| Gibby | `meet-gibby.webp` | Sky `#A7CBE3` | toolbox, hammer, boards | the tree house he learned patience building |

`--gg-pink` was added to `tokens.css` for this round, sampled from the calm
tile so the two pinks match.

## The prompts

Working method: **one prompt per message, attach the cutout portrait from
`site/public/images/characters/`**, and paste the shared block above each
prompt every time.

> Use the attached goat drawing as the exact character reference. Keep the
> goat EXACTLY as drawn: same pose, same proportions, same facial expression,
> same colors, same thick black hand-inked outlines, same colored-pencil
> shading, same accessories. Do not redraw, restyle, add to, or remove
> anything on the goat. Only add a background and one object.
>
> Style: hand-drawn children's picture book illustration, colored pencil and
> crayon texture, thick black outlines, flat saturated background with soft
> pencil grain, square 1:1 image. The goat stands centered on a strip of green
> grass along the bottom (about the bottom quarter). Place the object on the
> grass at the goat's feet, small enough that the goat stays the focus. No
> other scenery, no extra characters, no text unless the prompt says so.

**1 · Gritty** — *attach `gritty-standing.webp`* (the red-backpack take was
generated too; the blue one landed)

> Background: a flat meadow green, hex #7FA86B, filling the whole image behind
> the goat. Grass strip along the bottom in a slightly darker green, hex
> #6E9A5C, with a few simple crayon grass tufts.
> Object: a small blue school backpack sitting on the grass beside Gritty's
> front hooves, straps open, zipper pull showing, drawn in the same
> thick-outline crayon style.

**2 · Grandpa Goat** — *attach `grandpa-goat.webp`*

> Background: a flat Gritty Blue, hex #2C5F8A, filling the whole image behind
> the goat. Green grass strip along the bottom, hex #7FA86B, with a few simple
> crayon grass tufts.
> Object: a hand-painted wooden sign on a short post planted in the grass next
> to Grandpa Goat, reading "I have GRIT! I don't quit!" in bold, friendly
> hand-lettered letters, in the same thick-outline crayon style.

**3 · Gabby** — *attach `gabby.webp`*

> Background: a flat soft pink, hex #FDB8B9, filling the whole image behind
> the goat. Green grass strip along the bottom, hex #7FA86B, with a few simple
> crayon grass tufts.
> Object: a small bunch of white daisies with yellow centers, tied together
> with a pink gingham ribbon that matches Gabby's bow, lying on the grass
> beside her front hooves, in the same thick-outline crayon style.

**4 · Grandma Goat** — *attach `grandma-goat.webp`*

> Background: a flat warm sun yellow, hex #F2D48A, filling the whole image
> behind the goat. Green grass strip along the bottom, hex #7FA86B, with a few
> simple crayon grass tufts.
> Object: a small wicker picnic basket on the grass beside Grandma Goat, with
> a pink gingham cloth peeking out and a couple of red apples and a cookie
> visible on top, in the same thick-outline crayon style.

**5 · Gibby** — *attach `gibby.webp`*

> Background: a flat light sky blue, hex #A7CBE3, filling the whole image
> behind the goat. Green grass strip along the bottom, hex #7FA86B, with a few
> simple crayon grass tufts.
> Object: a small wooden toolbox on the grass beside Gibby with a hammer
> handle sticking out, and two or three short wooden boards leaning against
> it, in the same thick-outline crayon style.

## Landing them

```bash
cd site && for n in meet-gritty meet-grandpa-goat meet-gabby meet-grandma-goat meet-gibby; do npm run add-image -- "scenes/$n" ~/Downloads/$n.png --replace; done
```
