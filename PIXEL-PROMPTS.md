# The Grit Trail, drawn as a 16-bit game — ChatGPT prompts

> **Status: the seven Grit Trail pieces landed, 1 Sep 2026.** ChatGPT
> returned the set in one round; every file replaced its crayon predecessor
> under the same name in `site/public/images/grit-zone/`, and the
> summit-peak, flag-pole, and sign-board constants in
> `site/src/pages/grit-zone.astro` were re-measured off the new pixels.
> The homepage Play card (prompt 8) was generated but **kept crayon** — Adam
> decided the same day to leave that row as Kim's scenes for now. Kept for
> the record and for any redo.

The crayon set stays in the repo history; the pixel-filter look was tried
on 1 Sep and rejected because a filter over crayon art blurs into mush. This
set is drawn **as** pixel art from the start, which is the only way it
reads right.

## 1. How to run these

- **One prompt per message.** Paste block A (style lock) at the top of every
  message. Add block B (Gritty's model sheet) whenever Gritty appears.
  Then the asset prompt.
- **Attach the current crayon file** for anything that is a scene (trailhead,
  trail backdrop, climbing card) and say *redraw this composition*. That is
  what kept Kim's character on-model in the icon and scene rounds, and it
  keeps the layout the code expects. Sprites don't need a reference.
- If ChatGPT refuses `.webp`, convert first:
  `sips -s format png site/public/images/grit-zone/trailhead.webp --out ~/Desktop/trailhead.png`
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

## 4. The assets

| # | File (lands at) | Ask ChatGPT for | Transparent? | Shown at |
|---|---|---|---|---|
| 1 | `grit-zone/trailhead.webp` | 1536 × 1024 (3:2) | no | the Grit Zone hero, ~460px wide |
| 2 | `grit-zone/trail-bg.webp` | 1024 × 1536 portrait, cropped to 1024 × 1290 | no | the map panel, 620px wide |
| 3 | `grit-zone/walker.webp` | 1024 × 1024 | no (fill the square) | 64px portrait tile that hops stop to stop |
| 4 | `grit-zone/flag.webp` | 1024 × 1024 | **yes** | ~90px on the summit |
| 5 | `grit-zone/stop-ahead.webp` | 1024 × 1024 | **yes** | 34–46px, the locked stops |
| 6 | `grit-zone/stop-current.webp` | 1024 × 1024 | **yes** | 64–79px, the glowing stop |
| 7 | `grit-zone/stop-done.webp` | 1024 × 1024 | **yes** | 48–60px, the earned star |
| 8 | `scenes/gritty-climbing.webp` | 1024 × 1024 | no | homepage "Play" card |

Sizes grow with the row because the code scales stops up the mountain
(`--row` in `site/src/pages/grit-zone.astro`). Sprites are tiny on screen,
so give them **big, simple shapes** — detail below ~8 grid pixels vanishes.

The unused `sun.webp` and `cloud.webp` in `grit-zone/` can stay or go; the
backdrop draws its own sun and clouds.

### Prompt 1 · `trailhead.webp` — *attach the current `trailhead.webp`*

```
[Block A] [Block B]

Redraw the attached scene in this style. Landscape 3:2, 1536×1024.

Gritty stands at the bottom-left of a wide green meadow, wearing a small
brown backpack, looking up and to the right with a determined smile. Beside
him, a little right of centre-left, a wooden arrow signpost points right
toward the mountain. THE SIGN BOARD MUST BE COMPLETELY BLANK — no letters,
no symbols, just flat wood planks with a dark outline (the website prints
the words onto it).

A sandy dirt path with dark edges winds from Gritty's hooves across the
meadow and up a big green mountain on the right, switchbacking in visible
zig-zags, to a snowy grey peak with a red flag on a pole. Bright blue sky
with 2–3 chunky white clouds and a smiling yellow pixel sun at top right.
A few tiny pixel flowers in the grass, a short wooden fence in the
foreground. Everything is flat, outlined, and crisp.
```

### Prompt 2 · `trail-bg.webp` — *attach the current `trail-bg.webp`*

```
[Block A]

Redraw the attached mountain backdrop in this style. Portrait, 1024×1536.

This is a BACKDROP for a game map, so leave it EMPTY of props: NO path,
NO trail, NO numbers, NO signs, NO characters, NO flag, NO text — the game
draws all of those on top.

One big green mountain fills the frame from the bottom edge to its peak,
which sits slightly right of centre and about one-fifth of the way down from
the top (leave clear sky above it). The peak is grey pixel rock with a
white snow cap. The mountain face is bright pixel-art grass in 2–3 greens
with a scattering of flat bushes and a few tiny flowers — busy enough to
be fun, plain enough that white paths and gold stars will read on top of
it. Two smaller green hills peek in from the lower left and right edges.

Bright blue sky with flat dithered bands, 3–4 chunky white outlined clouds,
and a smiling yellow pixel sun in the upper right. No vignette, no
gradients, no blur. The bottom edge is grass, not a horizon.
```

### Prompt 3 · `walker.webp` — Gritty's map token

```
[Block A] [Block B]

A square 1024×1024 portrait tile of Gritty for a game map token. Fill the
whole square with a flat bright sky-blue background (#7CC4F0) — no
transparency, no circle, no frame (the website adds its own frame).

Gritty from the shoulders up, facing slightly right, big happy face, horns
and floppy ears fully inside the frame with a little breathing room on all
sides. Very large, simple shapes: this will be shown at 64 pixels, so his
eyes, nose and smile must still read at that size. Crisp 1-pixel outlines,
flat fills, no shading finer than 3 tones.
```

### Prompt 4 · `flag.webp` — the summit flag

```
[Block A]

A single game sprite on a TRANSPARENT background, 1024×1024 PNG.

A summit flag: a straight brown wooden pole standing vertically, its base
about one-third of the way in from the left edge and near the bottom of
the frame, with a bright red triangular pennant flying to the right from
the top of the pole (the pennant takes up most of the width). A tiny tuft
of grass at the pole's base. Big simple pixel shapes, 1-pixel dark
outlines, flat red with one darker red fold line. No shadow, no ground, no
sky — transparent everywhere except the flag and pole.
```

### Prompt 5 · `stop-ahead.webp` — a locked stop

```
[Block A]

A single game sprite on a TRANSPARENT background, 1024×1024 PNG.

A round grey stepping stone seen from slightly above, filling most of the
square: flat mid-grey top with a lighter highlight arc at the upper left,
a darker grey side band along the bottom, and a 1-pixel dark outline. Calm
and quiet — this is the "not yet" stop, so no glow, no colour, no face.
Big simple shapes; it will be shown at 34–46 pixels.
```

### Prompt 6 · `stop-current.webp` — the glowing stop

```
[Block A]

A single game sprite on a TRANSPARENT background, 1024×1024 PNG.

The "you are here" stop on a game map: a round white stepping stone (flat
white top, light grey side band, 1-pixel dark outline) sitting inside a
thick bright gold ring (#F2C744) that has 8 short chunky gold rays sticking
out around it like a pixel sunburst. The ring and rays are what makes it
glow — no soft glow, no blur, no gradient. Leave the centre of the stone
plain white and empty; the game prints a number on it. Big simple shapes;
it will be shown at 64–79 pixels.
```

### Prompt 7 · `stop-done.webp` — the earned star

```
[Block A]

A single game sprite on a TRANSPARENT background, 1024×1024 PNG.

A gold coin with a star on it, filling most of the square: a round flat
gold coin (#F2C744) with a darker gold rim (#D9A93F) and a 1-pixel dark
outline, a bright five-point yellow-white star stamped in the centre, and
one small white pixel sparkle at the upper left. Chunky, proud,
collectible — the kind of coin a game counts up with a chime. Big simple
shapes; it will be shown at 48–60 pixels.
```

### Prompt 8 · `scenes/gritty-climbing.webp` — *attach the current file*

Only if the homepage "Play" card should join the pixel set. Heads-up: the
other three homepage cards (Read, Make, Calming Corner) are Kim's crayon
scenes, so a pixel Play card will stand out in that row. That may be
exactly right for the game door — Adam and Kim's call.

```
[Block A] [Block B]

Redraw the attached scene in this style. Square, 1024×1024.

Gritty climbs a steep sandy path up a grey rocky mountain that rises from
the bottom-left to a grassy summit at the upper right, where a red flag on
a pole marks the top. He is mid-stride, leaning into the climb, front
hooves up on the slope, big determined smile, looking up at the flag.
Bright blue sky behind. Tufts of pixel grass on the ledges. Big, readable
shapes with crisp outlines — this is a card, not a sprite, so it can carry
more detail than the map pieces.
```

## 5. Landing the art

The image chute converts to `.webp` and keeps alpha. From the repo root:

```
cd site
npm run add-image -- grit-zone/trailhead    ~/Downloads/trailhead.png    --replace
npm run add-image -- grit-zone/trail-bg     ~/Downloads/trail-bg.png     --replace
npm run add-image -- grit-zone/walker       ~/Downloads/walker.png       --replace --width 512
npm run add-image -- grit-zone/flag         ~/Downloads/flag.png         --replace --width 512
npm run add-image -- grit-zone/stop-ahead   ~/Downloads/stop-ahead.png   --replace --width 512
npm run add-image -- grit-zone/stop-current ~/Downloads/stop-current.png --replace --width 512
npm run add-image -- grit-zone/stop-done    ~/Downloads/stop-done.png    --replace --width 512
```

Then two constants in `site/src/pages/grit-zone.astro` need re-measuring
against the new drawings — ask Claude to do it, or eyeball:

- `BG` — the backdrop's size and where its snow cap sits (`peakX`, `peakY`
  as fractions). Crop the 1024×1536 result to 1024×1290 first (top-anchored,
  so the sky stays) or update `BG.h` to 1536 and the scene grows taller.
- `.trailhead-sign` — `left`/`top`/`rotate` for the blank sign board, in
  percentages of the trailhead drawing.

The flag sprite's pole position (38.5% in, 85% down, in the `FLAG` block)
may also shift a little; same fix.
