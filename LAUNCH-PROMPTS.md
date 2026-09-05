# The launch picture — ChatGPT prompts

One image, for the email Kim sends her colleagues and students to introduce
**grittythegoat.com**. Wide, sunny, and readable at 600 pixels, because that
is all the width an email client gives a picture.

Same working method as every other art round here: **attach Kim's own
drawing** (`reference/gritty-hand-drawn-master.png`) and ask for a scene
*around* that goat — every Gritty starts from Kim's drawing, and a launch
picture is no exception.

## The prompt (blank sign — recommended)

> Use the attached drawing as the character. Keep this exact goat: his face,
> his proportions, his eyes, his ears, his horns, his brown chest tuft, his
> line work. Do not redesign him, do not restyle him, do not make him
> realistic. Draw the scene around him.
>
> STYLE: children's-picture-book illustration — a confident black marker
> outline of even weight, filled with flat colored-pencil colour that shows a
> little grain and sometimes strays a hair past the line. Rounded, chunky,
> friendly shapes. Hand-drawn and warm. NO gradients, NO drop shadows, NO
> glow, NO gloss, NO 3D, NO vector-flat corporate look, NO photographic
> texture.
>
> COLOURS, only these: ink #2A3238, cream #FAF6EC, blue #2C5F8A, sky #BDD7E7,
> meadow green #7FA86B, deep green #4E7140, gold #D9A93F, tan/brown #B98A55,
> pink #E8A0A8.
>
> SCENE: a wide sunny meadow, landscape 1536 x 1024.
>
> Gritty stands in the lower left, side-on and facing RIGHT, wearing a small
> brown backpack, one front hoof lifted mid-step onto a sandy path, head
> turned slightly toward us with a big happy closed-mouth smile. HIS EYES
> LOOK RIGHT, toward the signpost — not at the viewer.
>
> To his right, planted in the grass at centre-right, a wooden signpost with
> TWO BLANK PLANK BOARDS, one above the other, on a simple post. THE BOARDS
> MUST BE COMPLETELY EMPTY — no letters, no words, no symbols, no squiggles,
> just flat wood grain with a dark outline. No text anywhere else in the
> picture either.
>
> Behind them: soft rolling green hills, one gentle mountain on the far right
> with a tiny gold flag on top, a pale blue sky with three chunky white
> clouds, a warm gold sun in the top right corner, a scatter of small white
> daisies and a few tufts of grass in the foreground.
>
> Bright, welcoming, first-day-of-school cheerful. Keep the top-left corner
> and the bottom strip calm and open — the sky and grass there should be
> plain, with nothing important in them, so words can be laid over later.
> Nothing may touch or crowd the edges of the canvas.

**Why the sign is blank:** image models garble small lettering, and this
picture carries a web address. Hand the blank one back and the words go on in
the site's own display font (Fredoka, `--gg-blue` on the cream) — sharp,
correctly spelled, and on brand.

## If you want ChatGPT to letter it anyway

Same prompt, with the signpost paragraph swapped for this:

> To his right, planted in the grass at centre-right, a wooden signpost on a
> simple post with TWO plank boards. The upper, larger board reads exactly
> `GRITTY THE GOAT`. The narrower board below it reads exactly
> `grittythegoat.com`. Hand-lettered in a friendly, rounded, chunky
> children's-book capital letters, dark ink #2A3238 on the wood. Spell both
> lines EXACTLY as written — no extra words, no missing letters, no other
> text anywhere in the picture.

Then read every letter back at 100%. Models drop and double letters in a
domain name more often than they get it right; a near miss is worse than a
blank board, because it is an address that does not work.

## What to check before it goes in an email

- **The goat is Kim's goat.** Same face, same ears, same tuft. If ChatGPT
  gave him a new nose or realistic fur, reject and re-attach.
- **His eyes point at the sign**, not out at the reader.
- **His hooves are on the ground** — no floating, no hovering.
- **It reads at 600 pixels wide.** Shrink it before sending. If the daisies
  turn to mud, ask for fewer, bigger shapes.
- **No stray text.** Sign, hills, clouds, corners — all clean.

## Sizing it for email

Ask for 1536 x 1024, then crop to a 2:1 strip through the middle band if the
picture eats too much of the message. Keep the file under about 200 KB so it
does not land in a spam filter:

```bash
sips -Z 1200 ~/Downloads/gritty-launch.png --out ~/Downloads/gritty-launch-email.png
```
