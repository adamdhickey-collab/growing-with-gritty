# "Breathe with Gritty" — a full-width backdrop, drawn by ChatGPT

> **Status: landed, 2 Sep 2026 — second round.** ChatGPT hit the brief on the
> first try (crayon-weight line, 2172 x 724) and again on the second, softer
> and more watercolour; Adam picked the second. Shipped as
> `site/public/images/scenery/breathe-pond.webp` behind `.band-pond`, with
> the sitting Gritty in the breathing circle.
>
> Two departures from section 6 below. The band uses `cover`, not a
> full-width strip: laying the art in at full width left a phone with 80%
> flat sky and a visible join along the top of the paint. And the shipped
> file is **2172 x 1640, not 724 tall** — the painting's top 200 rows are
> dissolved into flat `#7BB8E4` and the canvas extended upward, so what
> `cover` crops is that manufactured sky rather than the flower and the
> candle, which in this round sit much closer to the edges (x 3–8% and
> 89–91%) than in the first. Whole painting down to 768px; below that a
> phone gets the quiet middle. Kept below for the record and for any redo.

The Calming Corner's last band (`.band-deep`, `calming-corner.astro:99`) is
flat paper-deep `#F3EBD9` behind the breathing circle. It's the one place on
the site where a child is asked to *stop* and stay for fifty seconds, and it
currently looks like the least considered band on the page. This brief gets
it a blue, calm, full-width backdrop in Kim's colored-pencil style.

## 1. The concept — "the still pond"

A wide, quiet pond at the blue end of the afternoon, drawn the way
`scenery/meadow-panorama.webp` is drawn: soft colored-pencil texture, gentle
ink outline, nothing sharp.

The picture says the same two things the copy says — *smell the flower… blow
out the candle* — and it says them **left to right, in that order, at the two
edges**, because the middle of the band belongs to Gritty and his circle:

- **Left edge** — a tall daisy and one dandelion clock leaning in from the
  frame, with three or four seeds already loose and drifting toward the
  centre. That's the in-breath.
- **Right edge** — a candle in a jar on a flat stone, flame small and steady,
  and a slow curl of smoke leaving the top of the frame. That's the
  out-breath.
- **Centre** — open pale sky. Nothing but two or three wide, slow
  concentric ripple rings on the water, centred exactly where the breathing
  circle sits, spreading outward. The circle grows to 218px and shrinks
  back; the rings make the whole band look like it is breathing with it,
  without a single moving pixel in the file.
- **Bottom** — the near edge of the water with a few reeds and lily pads
  along the very bottom, and daisies at the two corners.

Why this and not a sky of clouds: the section already has one round pale-blue
thing pulsing in the middle of it. Ripple rings are the only motif that reads
as *the same breath* rather than as competing decoration, and water is the
one backdrop that can go blue without going dark.

**Contrast is the hard constraint.** The heading and the cue line are
`--gg-blue` (`#2C5F8A`) and the note is `--gg-ink-soft`, all of it directly on
this image. So the centre must stay a *pale* wash — the deep blues live at the
top corners and in the water at the far left and right, and the middle 60%
never gets darker than about `#D6E8F4`. The prompt says so twice. I'll measure
the real ratios once the file lands and re-ink the band if anything falls
short of AA.

## 2. What to ask for

| Lands at | Ask ChatGPT for | Transparent? | Shown at |
|---|---|---|---|
| `site/public/images/scenery/breathe-pond.webp` | 1536 × 1024 landscape PNG | no | full-bleed behind the band, ~600px tall at any width up to 2560 |

The band is edge to edge but its content is capped at 1120px, so the image is
used `background-size: cover; background-position: center bottom` — the top of
the drawing is the first thing cropped on a wide screen. Keep the sky simple
up there and nothing important above the top 15%.

## 3. Reference images to attach

Attach **all three** in the same message, and label them the way they're
labelled here — ChatGPT holds the style far better from Kim's own files than
from any description of them.

1. `site/public/images/scenery/meadow-panorama.webp` — **the style and format
   reference.** Same wide backdrop job, same medium, and it shows how a scene
   in this world handles a long horizon.
2. `site/public/images/scenes/gritty-calm.webp` — **the mood and line
   reference.** Kim's own calm scene; the pencil texture and the weight of the
   outline are the target.
3. `site/public/images/scenery/daisies.webp` — **the flower vocabulary**, so
   the daisies at the edges are the site's daisies.

Gritty is **not** in this picture — he's already standing in the circle in
front of it. Say so in the prompt; it comes back with a goat in it otherwise.

`.webp` is often refused. Convert first:

```bash
cd /Users/adamhickey/Projects/growing-with-gritty/site/public/images && sips -s format png scenery/meadow-panorama.webp --out ~/Desktop/ref-meadow-panorama.png && sips -s format png scenes/gritty-calm.webp --out ~/Desktop/ref-gritty-calm.png && sips -s format png scenery/daisies.webp --out ~/Desktop/ref-daisies.png
```

## 4. The prompt — paste all of it

> I've attached three reference images from a children's picture-book world.
> Image 1 (the wide meadow panorama) is the STYLE and FORMAT reference. Image
> 2 (the goat sitting cross-legged) is the MOOD and LINE reference. Image 3
> (the daisies) is the flower vocabulary. Draw a new image in exactly that
> style — do not copy their content.
>
> STYLE: hand-drawn children's-book illustration in colored pencil and soft
> watercolor wash, visible pencil texture, clean but gentle black ink
> outlines, flat cheerful colors, no gradients that look digital, no 3D, no
> photographic texture, no glow effects, no text or lettering anywhere.
>
> SUBJECT: a wide, calm, very still pond on a quiet blue afternoon, seen
> straight on from the near bank. Nothing dramatic is happening. This is a
> background image for a page that asks a small child to take five slow
> breaths, so it must feel quiet, soft and safe.
>
> COMPOSITION — this matters more than the subject, please follow it exactly:
> - The CENTRE of the image, a tall column about 60% of the width running top
>   to bottom, must stay almost EMPTY: pale open sky above, pale open water
>   below. No objects, no clouds, no detail, nothing dark. Text will be placed
>   over this area and it has to stay readable.
> - In that empty centre, on the water only, draw two or three wide
>   concentric ripple rings, as if one drop landed dead centre. Thin, soft,
>   pale-blue-and-white pencil lines. Calm and spreading, not splashy.
> - LEFT EDGE: a tall white daisy and one round dandelion seed head leaning in
>   from the frame, with three or four seeds floating loose, drifting gently
>   toward the centre of the picture.
> - RIGHT EDGE: a small candle inside a clear glass jar, sitting on a flat
>   grey stone at the water's edge. One small steady warm flame and a single
>   thin curl of smoke rising out of the top of the frame.
> - BOTTOM EDGE: the near bank — a few soft green reeds, two lily pads, and a
>   scatter of small daisies in the bottom left and bottom right corners only.
> - TOP: plain open sky with at most two small, round, slow, faraway clouds,
>   placed in the top left and top right corners. The top 15% of the image may
>   be cropped, so nothing important goes there.
>
> LIGHT AND COLOR: blue, but LIGHT. The palette runs from a deeper sky blue
> #2C5F8A in the top corners, through #7CC4F0, down to a very pale sky wash
> #BDD7E7 and near-white #EAF4FA through the whole middle of the picture. Water
> is pale blue-green. Accents only: daisy white, soft green reeds #7FA86B, warm
> candle gold #F2D48A, one or two pink flowers #FDB8B9. Ink lines #2A3238.
>
> CRITICAL: the middle of the image must stay pale enough that dark blue text
> printed over it is easy to read. Do NOT darken the centre. Do NOT put a
> vignette, a sunset, a dusk sky, or a dark border on it.
>
> Also: no animals, no goat, no people, no sun with a face, no rainbow, no
> butterflies, no text, no watermark, no frame or border. The picture is
> completely empty of characters.
>
> Output: 1536 × 1024 landscape PNG, full-bleed, filling the whole canvas edge
> to edge with no white margin.

## 5. If it comes back wrong

- **Too busy / centre crowded.** Reply: *"Keep everything, but clear the
  middle 60% completely — move all the detail to the far left and far right
  edges. The centre should be almost empty pale sky and pale water."*
- **Too dark.** Reply: *"Lighten the whole image by about 30%, especially the
  centre. Keep the deep blue only in the top two corners."*
- **A goat appeared.** Reply: *"Remove the animal completely. This is an empty
  landscape."*
- **Variant B, if the pond fights the circle.** Same style lock and same
  composition rules, but sky only: *"a wide pale-blue sky with three or four
  soft round clouds drifting from the left edge toward the centre and out at
  the right, dandelion seeds floating across on the breeze, a strip of green
  meadow along the very bottom edge, empty pale sky through the whole
  middle."* Simpler, less literal, and it can't crowd the circle — the
  fallback if the pond version reads as too much.

## 6. When the file lands

Drop it at `site/public/images/scenery/breathe-pond.webp` (convert:
`cwebp -q 82 breathe-pond.png -o breathe-pond.webp`), and the band becomes
its own class rather than `.band-deep` — a `background-image` over a
`--gg-sky` fallback color, `cover`, centred on the bottom, with the paper
noise layer still on top. Two things get checked before it ships: the real
contrast ratio of `--gg-blue` on the palest and darkest pixels the heading
can land on, and how the band crops at 360px and at 2560px.
