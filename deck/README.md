# The deck for Kim

`Growing-with-Gritty-for-Kim.pptx` — 11 slides, with speaker notes on every
slide. `.pdf` is the same thing for presenting or emailing.

Covers: what's been done · the three style tile versions side by side · why
V3 (the research that changed the design) · the evidence · bringing her
drawing to life and the art ask · what's already built · how she updates the
site herself · what's needed from her · the domain · next steps.

## Rebuilding it

`build-deck.js` generates the deck with pptxgenjs. It expects the image
files beside it (screenshots of the three tiles, plus `gritty.png`), which
are regenerated from the live style tiles rather than stored here.

```bash
npm install pptxgenjs
node build-deck.js
```

Companion doc for the domain slide: [../DOMAIN-SETUP.md](../DOMAIN-SETUP.md).
