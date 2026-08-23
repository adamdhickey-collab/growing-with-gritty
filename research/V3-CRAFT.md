# V3 research: the craft of making it genuinely fun

Round two. [Round one](FINDINGS.md) answered *how to structure* a kids' book
site — nav, content model, audience split. This round asks what actually
makes one delightful, and it found things that **change the design**, not
just decorate it.

Five sweeps: game feel · character animation · award-winning web craft ·
motivation psychology &amp; sound · picture books on screen.

*Evidence note: the sandbox proxy blocked most direct page fetches again, so
site-specific notes come from search extracts. The academic findings below
are the exception — those are well-known published studies whose numbers the
agents reported consistently, and they are the ones driving design changes.*

---

## 1. What the research says we got WRONG in V2

This is the headline. Three of V2's choices are actively counterproductive:

### ❌ The sticker shelf pre-announces its rewards

V2 shows three grey ghost slots labeled with what you must do to fill them
("Solve the Tower Challenge"). That is an **expected, tangible,
contingent reward** — exactly the configuration
[Deci, Koestner &amp; Ryan's 1999 meta-analysis of 128 experiments](https://home.ubalt.edu/tmitch/642/articles%20syllabus/Deci%20Koestner%20Ryan%20meta%20IM%20psy%20bull%2099.pdf)
found *undermines* intrinsic motivation (engagement-contingent d ≈ −0.40,
performance-contingent d ≈ −0.28). Ghost slots manufacture an
"incomplete set" pressure and convert a souvenir into a contract.

**The fix.** A sticker is a **souvenir, not a wage**. Show only what's been
earned — never the empty slots, never a counter, never "2 more to go."
Award for *participation and exploration*, not correctness (task-
noncontingent rewards are the class that shows no undermining). Add
autonomy: let kids drag stickers around, and give them a "clear my shelf"
button — a collection a child can freely destroy is demonstrably not a
hostage.

### ❌ Pressing YET earns a sticker

The moment encouragement pays out, it becomes a transaction. **YET must
award nothing.** Its payoff is purely expressive.

### ❌ "YET!" alone is textbook *false* growth mindset

Dweck's own [2015 correction](https://www.edweek.org/leadership/opinion-carol-dweck-revisits-the-growth-mindset/2015/09)
names the failure mode: effort praised *without strategy or progress* is
empty, and "keep trying and you'll get it" is a misuse — it promises an
outcome and, to a child who has been trying, reads as blame.

**The fix.** YET has to do real work: the child names the thing ("reading",
"cartwheels", "tying laces"), Gritty says it back — *"You can't tie your
laces… yet"* — and then offers **one concrete strategy** ("try the
bunny-ears way instead"; "do the easy part first"; "ask someone to show
you"). A different way is not cheating. It's strategy.

---

## 2. The praise language rules (highest-stakes copy on the site)

The site's whole theme is grit, so wrong praise language would quietly
undermine the books.
[Mueller &amp; Dweck (1998)](https://www.columbia.edu/cu/psychology/courses/3615/Readings/Mueller_Dweck.pdf):
children praised for intelligence later avoided challenge, persisted less,
and performed worse.
[Brummelman et al.](https://pubmed.ncbi.nlm.nih.gov/24434235/): *inflated*
praise ("that's not just good — that's AMAZING!") predicted **lower**
self-esteem 18 months on, and pushed low-self-esteem kids away from
challenge. A website never knows which child it's talking to, so it must
always assume the vulnerable one.

**Rules:** name a specific action · link it to strategy or progress · never
a trait · no intensifiers · no promises · under ~12 words · 1st–2nd grade.

| ✅ Gritty says | ❌ Gritty never says |
| --- | --- |
| "You tried a different way. That's a good move." | "You're so smart!" *(trait praise)* |
| "You came back to the hard one. Gritty saw that." | "That's not just good — that's AMAZING!!!" *(inflated)* |
| "That one was tricky. What could you try next?" | "Keep trying and you'll get it!" *(false growth mindset — a promise, no strategy)* |
| "You can't do it yet. Yet is a good word." | "Wrong! Try again." / a buzzer / a red X |
| "You picked the kind thing. That helps someone feel safe." | "Only 2 more stickers to unlock the Gold Shelf!" |
| "You stopped and took a breath. That's a real skill." | |

**Tone:** warm and slightly *understated*, never hyped. Kids over ~7 can
tell the difference, and a site that says "AMAZING!" to every click has
said nothing.

**One more caution:** [Credé et al.'s meta-analysis](https://gwern.net/doc/psychology/personality/conscientiousness/2016-crede.pdf)
finds grit correlates with conscientiousness at ρ ≈ .84 — near construct
redundancy. So sell perseverance as *a story about a character* (lovely,
uncontroversial); never make empirical claims that grit predicts success.

---

## 3. Making Kim's one drawing feel alive

Her drawing turns out to be unusually riggable: **the beard hides the neck
joint**, the fringe hides the horn roots, the ear roots vanish under the
head oval, and a white body means a seam fails invisibly (white-on-white).

**Ranked by life-per-drawing:**

| Technique | New art needed | Effect |
| --- | --- | --- |
| **Line boil** — 3 near-identical frames cycled at ~8fps | 0 (baked from her PNG) | The whole character shimmers like hand-inked cel animation |
| **Blink** — stepped opacity swap, randomized ~15/min, 170ms | **1 small drawing** (closed eyes) | The single strongest life signal there is |
| **Breathing** — scaleY 1→1.012 from the hoof line, 3.7s | 0 | He's never perfectly still |
| **Ear twitch / tail flick** — small rotations on prime-numbered periods | 0 (needs layer slicing) | Non-mechanical, never repeats |
| **Paint-on reveal** — animated gradient `mask-position` | 0 | Reads as watercolor bleeding across the page |

**The critical performance catch:** live `feTurbulence` SVG filters
**repaint every frame** and will jank phones. I prototyped the boil filter
on Kim's art (it looks great at `scale: 2`, distorts past 4) and then
**baked it to 3 static frames** — identical look, compositor-only cost.
Same rule for texture: cap the rendered character at ~420px, or eleven
full-canvas layers at DPR 2 costs ~165MB of GPU texture.

**Historical note worth heeding:** limited-animation studios deliberately
dropped arms and legs so the budget could go into **animating the eyes**,
because that's what makes a character look alive. If Kim draws exactly one
thing, it should be closed eyes.

---

## 4. Game feel: the craft of a satisfying tap

- **Squash &amp; stretch, area-conserving.** The trap is a single `scale()` —
  that's a balloon inflating. Animate `scaleX`/`scaleY` in *opposition*
  (crush wide+short → overshoot tall+thin → settle), ~420ms.
  `transform-origin: bottom center` for anything standing on ground.
- **Hit stop.** A deliberate **60–120ms pause between the press and the
  payoff**, sized to the event's significance. Borrowed from fighting
  games; it's what makes a reward feel *earned* rather than automatic.
- **Follow-through** = `animation-delay: 70ms` on child layers. Two lines,
  and it's the difference between a moving image and an animated one.
- **Permanence** — Vlambeer's "dead enemies stay visible" rule. Something
  must *remain* after the animation ends, or it wasn't a reward.
- **True springs in pure CSS** via `linear()`: sample a damped harmonic
  oscillator at authoring time. `cubic-bezier` mathematically cannot bounce
  more than once. (Curves precomputed — see V3's stylesheet.)
- **Reduced motion is replacement, not deletion.** The celebration must
  still *read* — color change, the sticker simply being there — or you've
  removed the delight for exactly the kids who can't get it back.

---

## 5. Award-winning craft worth stealing

- **Awwwards scores Design 40% / Usability 30% / Creativity 20% /
  Content 10%.** Creativity sits *on top of* the 70%, never in place of it.
- **Design a storyline, not sections.** The strongest illustrated sites
  build one continuous scroll sequence rather than stacked blocks.
- **Make the ornament out of the content** — crop real watercolor paper
  edges and brush ends from Kim's books for dividers and bullets, so the
  site's furniture is literally made of the art it sells.
- **50 milliseconds.** [Lindgaard et al. (2006)](https://scispace.com/papers/attention-web-designers-you-have-50-milliseconds-to-make-a-3axej7ku89)
  found visual-appeal judgments at 50ms correlate highly with considered
  ones — and they halo onto credibility. Consequence: **the hero must not
  fade in.** Animating the first screen delays the impression you're being
  judged on. Ambient life starts *after* first paint.
- **Never scrolljack.** [NN/g](https://www.nngroup.com/articles/scrolljacking-101/):
  most test participants became disoriented; some read it as a bug.
  `position: sticky` scenes give the effect with graceful degradation.
- **Seasonal change is the honest return mechanic** — a `data-season`
  attribute recoloring the meadow costs ~15 lines and tells a returning
  visitor the place is alive.

---

## 6. Sound: yes — opt-in, default OFF, under 50KB

- **No background music, ever.** The [seductive-details effect](https://files.eric.ed.gov/fulltext/ED562189.pdf):
  looped music and decorative sound during narrated material produced
  significantly *worse* retention and transfer.
- **~6 short functional cues** (sticker, YET, tap tick, breathing in/out),
  soft attacks, ≤300ms, as one lazily-loaded audio sprite ≈ 35–50KB —
  less than a single photograph.
- **Default OFF is non-negotiable**, for three converging reasons:
  [WCAG 2.2 SC 1.4.2](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html)
  is Level A and autoplayed audio talks over screen readers; **Kim is a
  teacher — this site will open on 25 Chromebooks at once**, and a noisy
  site gets banned from the room it was built for; and browser autoplay
  policy already requires a gesture, so opt-in is the *easier* build.
- **The breathing corner is the strongest case for audio on the whole
  site** — an audible rise-and-fall lets a dysregulated child close their
  eyes, which a visual pacer cannot.
- **Read-aloud is evidence-supported**, not decoration, and gets its own
  separate control so a teacher can run a silent room with narration on
  headphones. In Kim's own voice it's the site's most distinctive asset.

---

## 6b. Picture books on screen — the strongest structural finding

**Interactivity during a story measurably does not help, and sometimes
hurts.** A 2025 meta-analysis (*Early Education and Development*, 22 studies,
1,978 children aged 2–8) found the pooled effect of interactive features on
story comprehension was **g = 0.01 — effectively zero**. Breaking it down:
**mini-games negatively affected comprehension**; hotspots and questions
bought nothing (both "introduce pauses that disrupt the natural flow of
story processing"); only **actions aligned with the protagonist's own
action** helped.

[Takacs, Swart &amp; Bus (2015)](https://journals.sagepub.com/doi/10.3102/0034654314566989)
(43 studies, 2,147 children) found the same split — *multimedia* features
(motion, sound, music) helped (g+ ≈ 0.17–0.20) while *interactive* ones
distracted — and, critically, that **the harm fell hardest on children
"disadvantaged because of less stimulating family environments."**
[Furenes et al. (2021)](https://journals.sagepub.com/doi/10.3102/0034654321998074)
adds that **adult mediation of a print book beat digital enhancements read
independently** — so read-aloud should be positioned as a model for the
grown-up, not a babysitter.

**The design consequence: hard-separate Story Mode from Play Mode.**
Nothing to tap while a story runs; all play lives after it, where
interruption costs nothing. And this is a *marketing asset* — Kim can say
on her About page, in her own voice as a teacher, "there's nothing to tap
during the story, and here's the research why." Teachers forward that.

**Look inside is the highest-value feature on a book site.** For a picture
book the interior art *is* the product and the cover can't show it. Build a
**spread rail** (horizontal scroll-snap, real spreads, selectable HTML
captions) — never a 3D page-flip, which breaks on phones and for screen
readers. Dosage: 3–4 spreads of ~14, never the last three, ending on a hard
stop card that points at the book. *Costs Kim about a day of exporting; no
new art.*

**Selling:** [Bookshop.org's affiliate program pays 10%](https://www.indiebound.org/bookshop-affiliate-program)
versus Amazon's 4.5%, and aligns with indie bookstores. But **signed copies
direct from Kim** are the one thing no retailer can offer, at 2–3× the
margin. And school visits are the highest-yield channel in this category —
schools commonly commit to 25+ copies — which is Kim's unfair advantage:
she is already *inside* the teacher and librarian word-of-mouth network
every other self-published author is trying to buy into.

**Do not build:** a 3D page-flip; tap-to-discover hotspots inside a story;
mini-games attached to reading; a stateful character world with accounts
(Scholastic couldn't keep Planet Pilkey's servers alive past 2019); or a
book trailer (a documented money pit with no evidence of sales impact).

## 7. Reading level

Write everything a child reads at **1st–2nd grade (Spache ≈ 2.0–2.5)**:
5–10 word sentences, concrete nouns, one idea each. Assume a 4-year-old
**cannot read the interface at all** — every control legible by icon,
color, and position, with text as reinforcement. "Perseverance" and "growth
mindset" are adult words; Gritty says *"keep going," "one more try," "a
different way," "not yet."*

Touch targets ~2cm with real spacing — a 5-year-old mis-tapping and getting
a "wrong" response is a *motor* failure being read to them as a character
failure.

---

## 8. What V3 builds

1. **Line boil on Gritty** — baked 3-frame shimmer, his linework re-inked.
2. **The rebuilt shelf** — souvenirs only, no ghost slots, no counter,
   participation-based, draggable, clearable, printable, with a
   child-readable note about where stickers live.
3. **YET that does real work** — name the thing, hear it back, get one
   concrete strategy. Awards nothing.
4. **Reflective scenarios** — no right/wrong, no buzzer; every choice gets
   a consequence-narrative and an invitation to try another.
5. **Real game feel** — hit stop, area-conserving squash, spring `linear()`
   curves, follow-through, permanence.
6. **Sound, opt-in and off by default** — the toggle framed as Gritty's
   own ("Gritty's ears: ON/OFF").
7. **Seasonal meadow** — automatic, cosmetic, nothing to unlock.
8. **"There's no hurry. Gritty will be here."**

## The art ask for Kim (unchanged in size, sharper in aim)

1. **Closed eyes** — just the two eye shapes closed, her marker weight.
   *One small drawing, and it's the highest-value thing on this list.*
2. **Two retraces of Gritty** — trace her own drawing twice, deviating as
   little as possible, for a true hand-drawn line boil. *(V3 ships a baked
   approximation meanwhile — her exact art displaced ~2px, disclosed
   below.)*
3. Optional: half-closed eyes (makes the blink read as drawn, not cut).

**Disclosure:** V3's boil frames are generated by displacing Kim's own PNG
by ~2 pixels of noise — the same drawing, re-inked, not new artwork. If
that crosses a line for her, it comes out and waits for her real retraces.
