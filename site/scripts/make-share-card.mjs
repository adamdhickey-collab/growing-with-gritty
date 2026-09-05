#!/usr/bin/env node
/**
 * Build the 1200×630 pictures that appear when the site is pasted into a
 * message, an email, a post, or an AI answer card:
 *
 *   public/share-card.jpg          the site
 *   public/share/books/<id>.jpg    one per book, its cover on brand ground
 *
 * Book pages need their own because a preview crawler will not render the
 * WebP the pages themselves use, and because a square cover crops badly at
 * the 1.91:1 every platform wants.
 *
 *   npm run share-card
 *
 * Why a script and not a hand-made image: the card carries brand colour and
 * brand lettering, and both are defined once in tokens.css and the Fontsource
 * packages. Drawing it by hand would fork them, and the fork would go stale
 * the first time a token moved. Nothing here invents a colour.
 *
 * The goat is Kim's own drawing, used as-is. Re-run this after changing
 * tokens, the wordmark, or the art.
 */
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import sharp from 'sharp';

const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(SITE, 'public/share-card.jpg');
/* Kim's cutout Gritty, used as drawn. He faces left, which is why the copy
   sits on the left and he stands to its right — he looks at the words, never
   away from them, and never a CSS mirror of a right-facing drawing. */
const ART = path.join(SITE, 'public/images/gritty-talking/gritty-standing.webp');

/* Facebook, LinkedIn, Slack, iMessage and the AI answer cards all expect
   1.91:1. 1200×630 is that ratio at the size everyone samples. */
const W = 1200;
const H = 630;

/* Colours come out of tokens.css, the same source the style guide reads. */
const tokens = {};
const css = fs.readFileSync(path.join(SITE, 'src/styles/tokens.css'), 'utf8');
for (const m of css.matchAll(/--gg-([\w-]+):\s*(#[0-9A-Fa-f]{6})\b/g)) {
  tokens[m[1]] = m[2];
}
const need = (name) => {
  const v = tokens[name];
  if (!v) throw new Error(`tokens.css has no --gg-${name} — has it been renamed?`);
  return v;
};

/* The font is inlined as a data URI rather than linked with file://.
   Headless Chromium silently refused the file:// form here and fell back to
   a system script face, which is the kind of failure you only catch by
   looking at the picture. Inlining cannot fail quietly. */
function fontFace(family, file, weight) {
  const buf = fs.readFileSync(path.join(SITE, 'node_modules', file));
  const url = `data:font/woff2;base64,${buf.toString('base64')}`;
  return `@font-face{font-family:'${family}';src:url('${url}') format('woff2');`
       + `font-weight:${weight};font-display:block;}`;
}

const dataUri = (file, mime) =>
  `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;

function html() {
  const fonts = [
    fontFace('Fredoka Card', '@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2', '300 700'),
    fontFace('Nunito Card', '@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2', '200 1000'),
  ].join('');

  return `<!doctype html><meta charset="utf-8"><style>
    ${fonts}
    html, body { margin: 0; padding: 0; }
    .card {
      width: ${W}px; height: ${H}px; box-sizing: border-box;
      display: flex; align-items: center; gap: 40px;
      padding: 64px 72px;
      background: ${need('paper')};
      /* the meadow, exactly as the hero wears it */
      background-image: linear-gradient(${need('sky-high')} 0%, ${need('sky-low')} 46%, ${need('paper')} 46.001%);
      font-family: 'Nunito Card', sans-serif;
      overflow: hidden;
    }
    .copy { flex: 1 1 auto; min-width: 0; }
    .wordmark {
      font-family: 'Fredoka Card', cursive;
      font-weight: 600; font-size: 76px; line-height: 1.02;
      color: ${need('blue')}; margin: 0 0 18px;
      letter-spacing: -0.01em;
    }
    .wordmark em { font-style: italic; font-weight: 400; }
    .tagline {
      font-family: 'Fredoka Card', cursive;
      font-weight: 500; font-size: 30px; line-height: 1.25;
      color: ${need('green-ink')}; margin: 0 0 26px;
    }
    .byline {
      font-size: 23px; font-weight: 700; line-height: 1.35;
      color: ${need('ink-soft')}; margin: 0;
    }
    .art { flex: 0 0 340px; display: flex; align-items: flex-end; justify-content: center; height: 100%; }
    .art img { max-width: 100%; max-height: 108%; object-fit: contain; display: block; }
  </style>
  <div class="card">
    <div class="copy">
      <p class="wordmark">Growing <em>with</em> Gritty</p>
      <p class="tagline">Build Grit. Grow Strong. Never Quit!</p>
      <p class="byline">Picture books and free activities for kids,<br>by teacher and author Kim Rekowski.</p>
    </div>
    <div class="art"><img src="${dataUri(ART, 'image/webp')}" alt=""></div>
  </div>`;
}

/** One book: its cover standing on brand ground, with the series wordmark. */
function bookHtml(book) {
  const fonts = [
    fontFace('Fredoka Card', '@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2', '300 700'),
    fontFace('Nunito Card', '@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2', '200 1000'),
  ].join('');

  return `<!doctype html><meta charset="utf-8"><style>
    ${fonts}
    html, body { margin: 0; padding: 0; }
    .card {
      width: ${W}px; height: ${H}px; box-sizing: border-box;
      display: flex; align-items: center; gap: 56px;
      padding: 58px 72px;
      background: ${need('paper')};
      background-image: linear-gradient(${need('sky-high')} 0%, ${need('sky-low')} 46%, ${need('paper')} 46.001%);
      font-family: 'Nunito Card', sans-serif;
      overflow: hidden;
    }
    .cover { flex: 0 0 auto; height: 100%; display: flex; align-items: center; }
    .cover img {
      height: 100%; width: auto; display: block; border-radius: 10px;
      box-shadow: 0 14px 30px -12px rgba(42,50,56,.45);
    }
    .copy { flex: 1 1 auto; min-width: 0; }
    .series {
      font-family: 'Nunito Card', sans-serif;
      font-size: 20px; font-weight: 800; letter-spacing: .12em;
      text-transform: uppercase; color: ${need('ink-soft')}; margin: 0 0 14px;
    }
    .title {
      font-family: 'Fredoka Card', cursive;
      font-weight: 600; font-size: 60px; line-height: 1.06;
      color: ${need('blue')}; margin: 0 0 18px;
    }
    .tagline {
      font-family: 'Fredoka Card', cursive;
      font-weight: 500; font-size: 27px; line-height: 1.3;
      color: ${need('green-ink')}; margin: 0 0 20px;
    }
    .byline { font-size: 21px; font-weight: 700; color: ${need('ink-soft')}; margin: 0; }
  </style>
  <div class="card">
    <div class="cover"><img src="${dataUri(path.join(SITE, 'public', book.cover), 'image/webp')}" alt=""></div>
    <div class="copy">
      <p class="series">Growing with Gritty · Ages ${book.ages}</p>
      <p class="title">${book.title}</p>
      <p class="tagline">${book.tagline}</p>
      <p class="byline">by Kim Rekowski</p>
    </div>
  </div>`;
}

/** Read the book collection's frontmatter without pulling in Astro. */
function readBooks() {
  const dir = path.join(SITE, 'src/content/books');
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const fm = raw.split('---')[1] ?? '';
    const field = (k) => (fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1] ?? '').trim();
    return {
      id: path.basename(f, '.md'),
      title: field('title'),
      cover: field('cover'),
      ages: field('ages'),
      tagline: field('tagline'),
    };
  });
}

const written = [];
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await page.setContent(html(), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  /* A share card in the wrong typeface is still a valid JPEG, so the build
     has to assert the brand face actually rendered rather than trust it. */
  const brandFontLoaded = await page.evaluate(
    () => document.fonts.check("600 76px 'Fredoka Card'"));
  if (!brandFontLoaded) throw new Error('Fredoka did not load — the card would ship in a fallback face.');
  const png = await page.screenshot({ type: 'png' });
  /* JPEG, not WebP: some crawlers and older mail clients still will not
     render WebP, and a share card that fails to render is worse than none. */
  await sharp(png).resize(W, H).jpeg({ quality: 88, mozjpeg: true }).toFile(OUT);
  written.push(path.relative(SITE, OUT));

  const bookDir = path.join(SITE, 'public/share/books');
  fs.mkdirSync(bookDir, { recursive: true });
  for (const b of readBooks()) {
    await page.setContent(bookHtml(b), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const shot = await page.screenshot({ type: 'png' });
    const out = path.join(bookDir, `${b.id}.jpg`);
    await sharp(shot).resize(W, H).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
    written.push(path.relative(SITE, out));
  }
} finally {
  await browser.close();
}

console.log('');
for (const f of written) {
  const kb = (fs.statSync(path.join(SITE, f)).size / 1024).toFixed(0);
  console.log(`  ${f.padEnd(42)} ${W}×${H}  ${kb} KB`);
}
console.log('');
