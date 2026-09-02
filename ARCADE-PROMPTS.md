# The Grit Trail's cabinet — the art that finishes it (ChatGPT prompts)

> **Status: the cabinet shipped in code on 2 Sep 2026; the drawings below
> are still to be made.** The Grit Trail's map, every challenge, the cheer,
> and the summit now sit on one game machine: a deep-blue shell with an
> ink edge and a hard shadow, a HUD strip on top, the screen inset behind
> its own bezel, and the buttons on a control bar underneath. Pressing
> Play changes what's on the screen, not where you are.
>
> Everything the code can draw, it draws. What it can't draw is Gritty's
> face changing, a real sky behind the dialog boxes, a real summit, and a
> few sprites — and each of those already has a **slot** in the code. Land a
> file under the name in the table and the slot fills on the next build.
> **No code changes.** Until then each slot shows a stand-in (the walker
> tile, a CSS sky, the flag).

The climb itself is now six stops (two switchbacks of three) rather
than every scenario Kim has written: a five-year-old reaches the summit
in one sitting, and each new climb rotates the next six scenarios onto
the trail, so nothing she writes is left off. That's code, not art —
`TRAIL_LEN` in `grit-zone.astro`.

This is the companion to `PIXEL-PROMPTS.md`, which made the seven map
pieces. Same style, same rules, same way of running the prompts. Blocks A
and B are repeated here so this file is paste-ready on its own.

## 1. How to run these

- **One prompt per message.** Paste block A (style lock) at the top of every
  message. Add block B (Gritty's model sheet) whenever Gritty appears.
  Then the asset prompt.
- **Attach the reference images the prompt names.** PNG copies of all of
  them, named by what they are, sit in `reference/chatgpt-refs/` — one
  folder to drag from. They also live at their original paths in this
  repo. The two that matter most: `site/public/images/grit-zone/walker.webp`
  (the portrait tile Gritty already wears on the map — every face must match
  it) and `reference/arcade-grit-zone.png` (the page as it looks now, so
  ChatGPT sees the machine the art will sit in).
- If ChatGPT refuses `.webp`, convert first:
  `sips -s format png site/public/images/grit-zone/walker.webp --out ~/Desktop/walker.png`
- Ask for **PNG** output. Sprites need a **transparent background**; say it
  twice if it comes back on a checkerboard.
- Check the result at 100% *and* zoomed out to phone width. Reject anything
  with soft edges, gradients, or "painterly" texture — the whole point is
  crisp, hand-placed pixels.

## 2. Block A — the style lock (paste at the top of every prompt)

```
STYLE: Genuine 16-bit pixel art in the spirit of a SNES-era overworld map
(think Super Mario World's map screen, Yoshi's Island, Kirby's Dream Land 3),
but an original children's-book world — do not draw any Nintendo character
or copyrighted asset.

Draw it as real pixel art on a small grid, then scale up with hard, crisp,
square pixels. No anti-aliasing, no blur, no gradients, no soft shading, no
photographic or painted texture, no "pixelate filter" look. Every shape has
a clean 1-pixel dark outline (#2A3238). Fills are flat with 2–3 tone
shading; dithering only in the sky.

Limited bright palette, about 32 colours, saturated the way a SNES screen
is. Anchor colours (use these and brighter neighbours of them):
sky #7CC4F0 and #BDD7E7, grass #8FD05A and #7FA86B, dark grass #4E7140,
rock #9AA5B1 and #5F6B78, snow #FFFFFF, dirt path #E9C97A, dirt edge #8A6414,
gold #F2C744 and #D9A93F, blue #2C5F8A and #1F4666, pink #FDB8B9,
sun #F2D48A, cloud white #FAF6EC, ink #2A3238.

Mood: bright, cheerful, bouncy, a little chunky — a game a five-year-old
wants to press start on.
```

## 3. Block B — Gritty's model sheet (add whenever he appears)

```
CHARACTER — Gritty the Goat: a small white goat with a big round head,
large black oval eyes with a white highlight, a black button nose, a happy
closed-mouth smile, two floppy brown ears with pink insides, two short
cream horns with tan stripes, a shaggy brown chest tuft, brown hooves and
a short white tail. Cute, confident, ready to climb. In pixel art keep his
silhouette simple and readable at small sizes.
```

## 4. The slots

Every file lands in `site/public/images/grit-zone/`.

| # | File | What it is | Ask ChatGPT for | Transparent? | Shown at | Stand-in until it lands |
|---|---|---|---|---|---|---|
| 1 | `face-think.webp` | Gritty's portrait while the question is open | 1024 × 1024, fill the square | no | 64px tile in the dialog box | `walker.webp` |
| 2 | `face-idea.webp` | his portrait after "Ask Gritty for an idea" | 1024 × 1024, fill the square | no | 64px tile | `walker.webp` |
| 3 | `face-oops.webp` | his portrait after a wrong pick | 1024 × 1024, fill the square | no | 64px tile | `walker.webp` |
| 4 | `face-cheer.webp` | his portrait after the grit choice | 1024 × 1024, fill the square | no | 64px tile | `walker.webp` |
| 5 | `stage-bg.webp` | sky and meadow behind the dialog boxes | 1536 × 1024 (3:2) | no | the challenge screen, ≈626px wide, cropped to fit | a flat CSS sky with a 4px checker and a grass strip |
| 6 | `cursor.webp` | the menu cursor beside the choice under the finger | 1024 × 1024 | **yes** | 20px | a CSS gold triangle |
| 7 | `summit.webp` | the view from the top, for "You climbed the whole trail!" | 1536 × 1024 (3:2) | no | the whole summit screen, ≈626px wide | the flag on a CSS sky |
| 8 | `tab-trail.webp` | the Grit Trail game button's icon | 1024 × 1024 | **yes** | 48px | the mountain emoji |
| 9 | `tab-yet.webp` | the Power of YET game button's icon | 1024 × 1024 | **yes** | 48px | the sparkles emoji |
| 10 | `tab-day.webp` | the My Grit Day game button's icon | 1024 × 1024 | **yes** | 48px | the yellow-heart emoji |

The cheer's gold coin is `stop-done.webp`, the same coin the map awards —
already drawn, nothing to make. The map's own pieces (trail-bg, walker,
flag, the three stops) are done too; they're listed in `PIXEL-PROMPTS.md`.

### Reference images, and which prompt they go with

| Attach | Path | Use in prompts |
|---|---|---|
| The walker tile — Gritty's portrait as it is on the map | `site/public/images/grit-zone/walker.webp` | 1–4, 6, 7 (say *match this exactly*) |
| The page as it looks now (the cabinet, HUD, dialog box, buttons) | `reference/arcade-grit-zone.png` | 5, 6, 8–10 (say *this is the screen it lives on*) |
| The map backdrop — the palette and the dither | `site/public/images/grit-zone/trail-bg.webp` | 5, 7 |
| The trailhead — the meadow Gritty set out from | `site/public/images/grit-zone/trailhead.webp` | 7 (this is what he looks back down on) |
| The summit flag sprite | `site/public/images/grit-zone/flag.webp` | 7, 8 |
| The earned-star coin | `site/public/images/grit-zone/stop-done.webp` | 6, 10 (the gold, the outline weight) |
| Kim's master drawing of Gritty | `reference/gritty-hand-drawn-master.png` | 1–4, 7 (the character, not the style) |
| Kim's expression studies | `reference/gritty-face-thinking.jpg`, `gritty-face-surprised.jpg`, `gritty-face-laugh.jpg`, `gritty-face-proud-wink.jpg` | 1 (thinking), 2 (surprised), 3 (surprised), 4 (laugh + proud wink) |

For prompt 5 a screenshot of the challenge screen itself helps more than
the page shot: open `/grit-zone`, press **Play the glowing challenge**, and
screenshot the blue screen with the boxes on it. The boxes are what the
backdrop has to stay out of the way of.

## 5. The prompts

### Prompts 1–4 · the four faces — *attach `walker.webp`, the master drawing, and the matching expression study*

The same base prompt four times, with the last paragraph swapped. Each
one is a **portrait tile**: it must sit next to the walker tile and look
like the same drawing with a different mood. Same framing, same size of
head, same colours.

```
[Block A] [Block B]

A PORTRAIT TILE for a game's dialog box, 1024×1024, filling the whole
square, flat sky-blue background (#BDD7E7) edge to edge — no border, no
frame, no transparency, no ground (the website adds the frame).

Match the attached portrait tile exactly: the same drawing of Gritty's
head and shoulders, the same crop (head fills about 70% of the height,
the top of the horns near the top edge, the chest tuft at the bottom),
the same colours and line weight. This is the same character in a
different mood, not a redraw. Big simple shapes: it will be shown at 64
pixels, so the eyes, nose and mouth must read at that size. Crisp
1-pixel outlines, flat fills, no shading finer than 3 tones.

MOOD — see below.
```

Then, one per message:

- **1 · `face-think.webp`** —
  `MOOD: Thinking. Gritty looks slightly up and to the right, one eyebrow
  raised, mouth a small flat line, one hoof raised to his chin. Curious,
  not worried.`
- **2 · `face-idea.webp`** —
  `MOOD: An idea! Eyes wide and bright, eyebrows up, an open happy mouth,
  ears lifted. A small yellow pixel lightbulb (#F2C744, 1-pixel ink
  outline) floats at the top right corner of the tile.`
- **3 · `face-oops.webp`** —
  `MOOD: Oops. A sheepish smile with the mouth pulled to one side, eyes
  looking down and sideways, one ear flopped lower than the other, a
  single small sweat drop (#7CC4F0) beside his head. Gentle — never sad,
  never scared. This is the face for "hmm, try another one".`
- **4 · `face-cheer.webp`** —
  `MOOD: Cheering. Eyes squeezed into happy arcs, a big open smile, both
  ears up, one hoof raised in a fist. Two small white pixel sparkles in
  the top corners.`

### Prompt 5 · `stage-bg.webp` — *attach `trail-bg.webp` and the challenge-screen screenshot*

```
[Block A]

A BACKDROP for a game's dialog screen. Landscape 3:2, 1536×1024. No
transparency.

The same world as the attached mountain backdrop, seen from a meadow
partway up the trail: bright blue sky filling the top 80% of the frame
with horizontal dither bands (the exact banding of the attached backdrop),
2–3 chunky white clouds high up and small, a smiling pixel sun in the top
right, and a strip of bright green meadow along the bottom 20% with a
dark-grass edge line, a few tiny pixel flowers and one small grey rock.

This is a BACKDROP: leave the middle 70% of the frame EMPTY sky, because
the website prints white dialog boxes on top of it (see the screenshot).
No path, no characters, no signs, no text, no flag. Nothing interesting
in the centre. Flat, outlined, crisp. The website crops it to fit, anchored
at the bottom, so keep the horizon in the bottom fifth at every width.
```

### Prompt 6 · `cursor.webp` — *attach `stop-done.webp` and the page screenshot*

```
[Block A]

A single game sprite on a TRANSPARENT background, 1024×1024 PNG.

A menu cursor: a chunky right-pointing arrow, the kind that sits beside
the highlighted choice in a game menu. Flat gold (#F2C744) with a darker
gold (#D9A93F) lower edge, a single white pixel highlight at the top
left, and a 1-pixel dark outline. The arrow fills most of the square and
points RIGHT. Big simple shape — it will be shown at 20 pixels, so no
detail at all beyond the outline and the two tones. No shadow, no glow.
Transparent everywhere except the arrow.
```

### Prompt 7 · `summit.webp` — *attach `walker.webp`, `flag.webp`, `trail-bg.webp`, `trailhead.webp`, and the master drawing*

This is the screen a child sees when the climb is done, so it is the one
picture in the set that gets to be a *view*. It fills the cabinet's screen
edge to edge with the words underneath it, so nothing needs to be left
empty for text.

```
[Block A] [Block B]

A SCENE. Landscape 3:2, 1536×1024, no transparency.

The view from the top of the mountain. Gritty stands on the snowy summit
in the lower left of the frame, seen from behind and a little to the
side (three-quarter back view), wearing his small brown backpack, one
front hoof raised to shade his eyes, looking out and down to the right.
The attached red flag on its pole stands just beside him. We can see one
ear, one horn, and the edge of his smile — he is happy and proud.

Beyond and below him, far, far down: the whole meadow he set out from,
seen from high above — rolling bright-green hills with darker-green
hedges, a sandy path winding down through them (the trail he climbed,
switchbacking away into the distance), tiny pixel trees, a scatter of
tiny pink and yellow flowers, a little wooden fence, a small blue pond,
and the trailhead signpost tiny in the distance. The hills fade to a
paler green toward the horizon. Two or three chunky white clouds sit
BELOW the peak, out over the meadow, to show how high up he is, and the
sky above is bright blue with horizontal dither bands and a smiling
pixel sun at the top right. Calm, wide, beautiful — the reward view.

Gritty is drawn to match the attached portrait tile (same colours, ears,
horns, line weight), about a third of the frame's height. Crisp 1-pixel
outlines, flat fills, dithering only in the sky and the far hills. The
picture is shown about 626 pixels wide, so the meadow can carry small
detail, but every shape must still read as a shape, not a texture.
```

### Prompts 8–10 · the three game-button icons — *attach the page screenshot; for 8 also `flag.webp`, for 10 also `stop-done.webp`*

Three sprites, one per message. They replace the emoji on the three big
buttons above the machine (see the screenshot), so they must read as a set:
same outline weight, same fill style, each a single bold object.

```
[Block A]

A single game sprite on a TRANSPARENT background, 1024×1024 PNG. One
bold object filling most of the square, 1-pixel dark outline, flat fills
in 2–3 tones, no shadow, no ground, no text. It will be shown at 48
pixels, so nothing smaller than a big simple shape. Transparent
everywhere except the object.

OBJECT — see below.
```

- **8 · `tab-trail.webp`** —
  `OBJECT: A small green mountain with a grey rocky top and a white snow
  cap, and the attached red flag planted on the peak. Grass green
  #8FD05A, rock #9AA5B1.`
- **9 · `tab-yet.webp`** —
  `OBJECT: A four-point sparkle star in gold (#F2C744) with a smaller
  white four-point sparkle overlapping its upper right — the "magic word"
  burst. Chunky and bright.`
- **10 · `tab-day.webp`** —
  `OBJECT: A big gold heart (#F2C744) with a darker gold (#D9A93F) lower
  half and one white pixel highlight at the upper left, matching the
  attached coin's gold and outline weight.`

## 6. Landing the art

The image chute converts to `.webp` and keeps alpha. From the repo root:

```
cd site
npm run add-image -- grit-zone/face-think  ~/Downloads/face-think.png  --width 512
npm run add-image -- grit-zone/face-idea   ~/Downloads/face-idea.png   --width 512
npm run add-image -- grit-zone/face-oops   ~/Downloads/face-oops.png   --width 512
npm run add-image -- grit-zone/face-cheer  ~/Downloads/face-cheer.png  --width 512
npm run add-image -- grit-zone/stage-bg    ~/Downloads/stage-bg.png
npm run add-image -- grit-zone/cursor      ~/Downloads/cursor.png      --width 256
npm run add-image -- grit-zone/summit      ~/Downloads/summit.png
npm run add-image -- grit-zone/tab-trail   ~/Downloads/tab-trail.png   --width 256
npm run add-image -- grit-zone/tab-yet     ~/Downloads/tab-yet.png     --width 256
npm run add-image -- grit-zone/tab-day     ~/Downloads/tab-day.png     --width 256
```

Then `npm run build` (or just push — the review build does it). Each slot
checks for its file at build time, in `site/src/pages/grit-zone.astro`
under *Art that hasn't landed yet*, and swaps the stand-in out. Any one
file can land on its own; the others keep their stand-ins.

Every file that lands also gets a row in the style guide's provenance
table (`site/src/pages/style-guide.astro`, the *Whose art is what*
section), in the same commit: these are made from Kim's drawing, so they
say so, and never "hand-drawn".

Nothing needs re-measuring. The one thing to eyeball after `stage-bg`
lands: the meadow strip should show under the lowest dialog box on a
phone. If it doesn't, the horizon in the drawing is too high — ask for a
redo with the meadow in the bottom fifth, don't fix it in code.
