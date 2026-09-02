# The Grit Trail's cabinet — the art that finishes it (ChatGPT prompts)

> **Status: all ten drawings landed on 2 Sep 2026**, the same day the
> cabinet shipped in code. Every slot below is filled; the prompts stay
> for the record and for any redo. Kept as written: the cabinet The Grit Trail's map, every challenge, the cheer,
> and the summit sit on one game machine: a deep-blue shell with an
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

## 6. Round two — the summit redo, the sky redo, and a logo

Adam's notes after the first set landed (2 Sep, evening): the summit's
Gritty is drawn on a coarser grid than the walker tile and reads rough
beside it; the challenge sky's meadow strip is scattered single pixels
rather than drawn grass; and the game wants a title logo. The slot for
the logo is already in the code: `logo.webp` lands on a **marquee** above
the HUD on the map, every challenge, and the summit — the way an arcade
cabinet names its game above the screen. Until it lands the HUD carries
the words.

More reference files were added to `reference/chatgpt-refs/` for these:
`summit-current.png`, `stage-bg-current.png` (the drawings being redone),
`face-cheer-tile.png` (a second look at the tile grid), `tab-trail-icon.png`.

| # | File | Ask ChatGPT for | Transparent? | Shown at |
|---|---|---|---|---|
| 11 | `summit.webp` (replace) | 1536 × 1024 (3:2) | no | the whole summit screen, ≈626px wide |
| 12 | `stage-bg.webp` (replace) | 1536 × 1024 (3:2) | no | the challenge screen, ≈626px wide, cropped to fit |
| 13 | `logo.webp` (new) | 1536 × 1024 (3:2) | **yes** | 92px tall on the map's marquee, 64px on the others, over the deep-blue shell |

### Prompt 11 · `summit.webp` redo — *attach `summit-current.png`, `walker-tile.png`, `face-cheer-tile.png`, `flag-sprite.png`, `map-backdrop.png`*

```
[Block A] [Block B]

REDRAW the attached summit scene. Landscape 3:2, 1536×1024, no
transparency. Keep its composition exactly: Gritty on the snowy peak at
the lower left beside the red flag, seen from behind and a little to the
side, one hoof raised to shade his eyes, looking out and down to the
right over the meadow far below — the hills, the winding path, the pond,
the fence and the tiny signpost, clouds below the peak, the sun top
right. Keep all of that.

What changes is GRITTY. Redraw him to match the two attached portrait
tiles exactly: the same pixel grid and line weight, the same big round
head, the same large black oval eyes with a white highlight, the same
floppy brown ears with pink insides, the same short striped cream horns,
the same shaggy brown chest tuft, the same brown hooves, the same small
brown backpack. He is the tile character standing up, turned away from
us three-quarters, so we see one ear, one horn, the back of his head,
his backpack, and the edge of his smile. He is about a third of the
frame's height and drawn at the tiles' level of detail — no chunkier
pixels than the mountains around him, no simplified blob head. If in
doubt, make him look more like the tiles, not less.
```

### Prompt 12 · `stage-bg.webp` redo — *attach `stage-bg-current.png`, `map-backdrop.png`, `page-now.png`*

```
[Block A]

REDRAW the attached backdrop. Landscape 3:2, 1536×1024, no transparency.
Keep its layout exactly: bright blue sky over the top 80% with the same
horizontal dither bands, the same three chunky white clouds high up, the
smiling sun at the top right, the horizon at the same height, and the
middle 70% of the frame EMPTY sky (the website prints dialog boxes there
— see the screenshot). No path, no characters, no signs, no text.

What changes is the MEADOW STRIP along the bottom. Right now it is
scattered single dark pixels. Redraw it the way the grass is drawn on the
attached map backdrop: flat bright green (#8FD05A) with a darker green
band along the horizon edge, round outlined bushes in small clusters of
two and three, a handful of outlined flowers (pink and white with yellow
centres, the same flowers as the map), two grey outlined rocks, a few
short grass tufts, and a short brown wooden fence at the right edge.
Every mark is an outlined shape with a flat fill — nothing is a lone
pixel. Keep the strip calm and low: nothing taller than the fence, so a
dialog box sitting on the horizon never covers anything important.
```

### Prompt 13 · `logo.webp` — the game's title — *attach `page-now.png`, `tab-trail-icon.png`, `flag-sprite.png`, `star-coin.png`*

```
[Block A]

A GAME TITLE LOGO on a TRANSPARENT background, 1536×1024 PNG. This is
the lit marquee above an arcade cabinet's screen (see the screenshot:
it sits on the deep-blue shell above the map), so it must read from
across the room.

The words are exactly: THE GRIT TRAIL — spell them exactly, no other
text. "THE" small, centred, on top; "GRIT TRAIL" big beneath it on one
line, filling the frame's width, in chunky 16-bit game-title lettering
like a SNES title screen: fat rounded capitals, gold (#F2C744) faces with
a darker gold (#D9A93F) bevel on the bottom and right of every letter, a
2-pixel ink (#2A3238) outline around all of it, and a white pixel
highlight at the upper left of each letter. Let the baseline bounce a
little — the letters can sit on a gentle upward arc, playful but still
easy to read.

Behind the lettering: a small green mountain with a grey rocky top and a
snowy peak (matching the attached mountain icon) rising up behind the
middle of "TRAIL", with the attached red flag planted on the peak and
poking above the letters. Two small gold four-point sparkles float near
the top corners. Everything crisp, flat, outlined, no gradients, no
glow, no drop shadow. Transparent everywhere except the logo.
```

**Landed 2 Sep 2026.** The wide banner version — Gritty's head over the
sign, the mountain, the sun, the star coin, a fence and a grass base —
sits on the marquee, sized by width (460px on the map, 340px on the
challenge and summit screens) because a height cap alone left it
stranded in the middle of the shell. With the logo present the HUD drops
its "The Grit Trail" label and keeps only the stop tile. A taller 3:2
version was generated the same evening and not used; it is in Downloads
if the wide one ever needs replacing.

**Where it goes.** The marquee, on all three Grit Trail cabinets (map,
challenge, summit) — nothing to place by hand, the slot is wired. Two
more homes worth trying once it exists: the Play card on the home page
(over the climbing scene, bottom left), and across the top of the
certificate printable. Both are a separate change; ask when the logo is
in hand.

## 7. Round three — the summit, once more

The second summit fixed the meadow but not Gritty: he is drawn on a much
coarser grid than the landscape behind him, the three-quarter BACK view
turns his head into a lump, the backpack is a plain brown square, and his
legs are stubby white sticks. A band of sky dither at the horizon on the
left also reads as ocean.

The fix is a different reference and a different pose. **`trailhead.webp`
already contains a full-body pixel Gritty with his backpack, on-model and
at the right resolution** — that drawing is the model sheet for this one,
not the walker tile alone. And he turns around: a three-quarter FRONT view
looking out to the right shows the face a child recognises, and is far
easier to draw well than a back view.

### Prompt 14 · `summit.webp` redo, round three — *attach `trailhead-meadow.png`, `summit-current.png`, `walker-tile.png`, `face-cheer-tile.png`, `map-backdrop.png`*

```
[Block A] [Block B]

REDRAW the attached summit scene (summit-current). Landscape 3:2,
1536×1024, no transparency.

KEEP, almost exactly as they are: the whole right two-thirds of the
picture — the green meadow seen from high above, its bushes, flowers,
rocks, the winding sandy path with its fence and signpost, the little
blue pond, the clouds sitting below the peak, and the smiling sun at the
top right. That half is good. Keep the rocky grey peak at the lower left
and the red flag on its pole.

FIX THE SKY: the top third is plain blue with two dither bands. Make the
dither fade smoothly downward — a dense band high up, thinning as it
nears the horizon, the way the attached map backdrop does it. Remove the
flat blue-grey band at the far left horizon; it reads as ocean. The
horizon behind the hills is sky, not sea.

REDRAW GRITTY COMPLETELY. He is the problem: right now he is built from
much bigger pixels than everything around him, his head is a shapeless
lump, his backpack is a plain square and his legs are stubs.

Use the goat in the attached trailhead picture as the model sheet — that
is Gritty drawn correctly at this resolution, with his backpack. Copy
that drawing's pixel size, line weight, proportions, colours and the way
the backpack's straps and buckle are drawn. His head and face must match
the attached portrait tiles: big round head, large black oval eyes with a
white highlight, black button nose, closed happy smile, two floppy brown
ears with pink insides, two short striped cream horns, shaggy brown chest
tuft, brown hooves.

NEW POSE: he stands on the snowy peak at the lower left, in three-quarter
view FACING RIGHT and slightly toward us, so we see his whole face — both
eyes, the nose, the smile. His front left hoof is raised to his brow,
shading his eyes as he looks out over the meadow. His back legs are
planted, his tail up. Proud, happy, taking in the view. He stands beside
the flag, roughly a third of the frame's height, and every one of his
pixels is the same size as the pixels in the meadow behind him. If he
looks chunkier or simpler than the bushes and flowers, he is wrong.
```

**How to judge the result before landing it.** Put the new picture beside
the trailhead drawing. If Gritty looks like the same goat drawn by the
same hand, it is right. If he looks like a bigger, blockier cousin, ask
for another pass with the same prompt and the line *"his pixels are still
larger than the meadow's — draw him at the trailhead goat's resolution."*

## 8. Landing the art

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

Round two — the two redos overwrite on purpose, the logo is new:

```
cd site
npm run add-image -- grit-zone/summit    ~/Downloads/summit.png    --replace
npm run add-image -- grit-zone/stage-bg  ~/Downloads/stage-bg.png  --replace
npm run add-image -- grit-zone/logo      ~/Downloads/logo.png      --width 960
```

Round three — the summit again:

```
cd site
npm run add-image -- grit-zone/summit ~/Downloads/summit.png --replace
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
