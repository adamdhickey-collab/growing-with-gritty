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
