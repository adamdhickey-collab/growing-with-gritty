# What we need from Kim

Three asks, in the order they matter. Written for Kim, not for the code —
each one says what it's for and why, and nothing here needs her to touch a
file she doesn't want to.

Raised 2 Sep 2026, out of a design critique of the whole site.

---

## 1. The printables — the one real gap on the site

**This is the most important item on the list, and it isn't a drawing.**

The homepage shows four doors into Gritty's World: Read, Play, Make,
Breathe. Three of them open onto something a child can do right now. The
fourth — **Make**, the card with Gritty and his crayons, promising
*"Coloring sheets and bookmarks to print at home"* — opens onto the
Grown-Up Grit Guide, which currently has **nothing to download**. The page
says "The first printables are on their way!"

So one door in four is a dead end, and it's the one a child is most likely
to pick, because it's the one that promises scissors and crayons.

We deliberately have **not** papered over this by re-labelling the card or
re-pointing the link. The door is fine — there just needs to be something
behind it.

**What would fix it, smallest first:**

| # | What | Why this one |
|---|---|---|
| 1 | **One colouring page.** A single line-art Gritty, letter-size, black on white. | Unblocks the door on its own. One is enough to stop the dead end. |
| 2 | A bookmark sheet — 3–4 to a page, with the motto. | Cheap to make from art that already exists, and parents actually print these. |
| 3 | "My Grit Day" chart — the eight badges from the Grit Zone, as a paper version. | Ties the site's game to something on the fridge. |

PDF or high-res PNG both work. Drop them in through the CMS under
Printables — title, who it's for (kids / parents / teachers / everyone),
and the file. The page builds its own sections from what's there, so the
empty state disappears by itself the moment the first one lands.

---

## 2. Six feeling faces — the biggest thing we could do for the brand

Right now the Calming Corner asks a child *"How are you feeling?"* and
offers six faces to choose from: **Angry, Sad, Worried, Frustrated, Tired,
Nervous**.

Those six faces are Microsoft emoji.

Everywhere else on this site, Gritty is Kim's. It's written into the style
guide — *every Gritty starts from Kim's drawing* — and it's the thing that
makes the site feel made rather than assembled. But on the page where a
child is invited to say *I feel sad*, the sadness belongs to Microsoft.

Six drawings would change that. Not fifty — the site uses about forty
icons and most of them are furniture (arrows, a download, a shopping cart)
that nobody needs Kim's hand for. **These six are different**, because
they're the page's whole emotional vocabulary, and because a child picking
a face is doing the most personal thing the site asks of anyone.

**What each one needs to say** — Gritty's face only, no body needed:

| Feeling | What the face is doing | Note |
|---|---|---|
| **Angry** | Brows down and in, mouth set. Cross, not frightening. | The one to be most careful with — a child who is angry should feel *recognised*, not judged. |
| **Sad** | Eyes down, ears down, mouth turned. Quiet. | No tears needed. Wistful reads better than distraught. |
| **Worried** | Eyes wide, brows up in the middle, small mouth. | Worry is *anticipating*, so he should look at something off to the side. |
| **Frustrated** | Teeth showing a little, brows pinched, maybe one ear back. | This is the "I'm doing something HARD" face — effort, not defeat. |
| **Tired** | Eyes half-closed, ears drooping. | Sleepy, not sad — the two get confused easily. |
| **Nervous** | Small smile that isn't quite a smile, eyes a bit too wide. | The "about to go on stage" face. |

**How to deliver:** square-ish, transparent background, at least 512px,
PNG or the original scan. Names — `feeling-angry.png`, `feeling-sad.png`,
`feeling-worried.png`, `feeling-frustrated.png`, `feeling-tired.png`,
`feeling-nervous.png`. (These are the names `ICONS.md` §1 already reserved
for them.) Send them however is easiest; the wiring is a small job on our
side once they exist.

**If only two are ever drawn:** Angry and Sad. They're the two a child in
real distress reaches for.

---

## 3. A teaching question, not a design one

The Calming Corner offers eight calm-down ideas, and tells the child:

> *They all work for every feeling — pick whichever sounds good right now.*

That's a kind sentence and it may well be the correct one. But the page
also just asked the child how they feel, and then does nothing with the
answer — a child who taps **Angry** sees the same eight ideas in the same
order as a child who taps **Tired**.

**The question for Kim:** should the ideas re-order themselves to suit the
feeling that was chosen — movement and water nearer the top for Angry, the
quiet ones for Tired — or is "they all work, you choose" the deliberate
teaching position?

This is genuinely her call and not ours. There's a real argument for
leaving it exactly as it is: handing a dysregulated child a choice, rather
than a diagnosis, is a defensible thing to do on purpose. We only want to
know it *is* on purpose.

If she wants the re-ordering, we need one thing from her: which two or
three ideas go first for each of the six feelings. Nothing more.

---

### Smaller things, only if she's drawing anyway

- **"Talk to a trusted grown-up"** currently uses a dark purple speaking-head
  emoji. It's the heaviest, darkest thing among the eight calm-down cards, so
  the eye goes straight to it — probably not the intended order of
  importance. A drawn version would fix the weight as well as the style.
- The **four "moves"** on the Mistake Maker (Try Again, Learn From It, Ask
  for Help, Take a Break) are the next-best candidates after the six faces,
  for the same reason: they're Gritty's own vocabulary, in someone else's
  hand.

Neither is urgent. The six faces are the ask that matters.
