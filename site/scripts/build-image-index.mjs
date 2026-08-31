#!/usr/bin/env node
/**
 * Builds the image library: one page listing every picture the site holds,
 * grouped by folder, saying where each one is actually used.
 *
 *   npm run library                       → site/.image-library/index.html
 *   node scripts/build-image-index.mjs --out ../_pages/library/index.html \
 *        --base ../site/images            (what the deploy runs)
 *
 * "Where is it used" is answered by searching src/ for the image's own URL,
 * which catches every literal reference — a book cover in a markdown front
 * matter, a portrait in a character file, a hard-coded src in a component.
 * Two things are loaded without a literal path and are named here instead,
 * because a file reported as unused is a file someone eventually deletes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const IMAGES = path.join(SITE, 'public/images');
const SRC = path.join(SITE, 'src');

const argv = process.argv.slice(2);
const argOf = (flag, fallback) => {
  const i = argv.indexOf(flag);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};
const OUT = path.resolve(argOf('--out', path.join(SITE, '.image-library/index.html')));
const BASE = argOf('--base', null); // URL prefix for the thumbnails

/* Files loaded by pattern rather than by name — the only two places a path
   is assembled at runtime. Keep this in step with MeadowHero.astro. */
const DYNAMIC = [
  { test: /^gritty\/gritty-boil-\d\.webp$/,
    why: 'The meadow hero — the three-frame line boil, always on screen.' },
  { test: /^gritty\/gritty-(happy|laugh|surprised|proud|thinking)-\d\.webp$/,
    why: 'The meadow hero — Gritty wears this face when a reply has that mood.' },
];

/* ── every image, and every source file that might name one ── */
function walk(dir, base = '') {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const rel = base ? `${base}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else if (/\.(webp|png|jpe?g|gif|svg|avif)$/i.test(e.name)) out.push(rel);
  }
  return out;
}

function sourceFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...sourceFiles(p));
    else if (/\.(astro|ts|js|mjs|md|json|yml|yaml|css)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const images = walk(IMAGES);
const sources = sourceFiles(SRC).map((f) => ({
  rel: path.relative(SITE, f),
  text: fs.readFileSync(f, 'utf8'),
}));

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const entries = await Promise.all(images.map(async (rel) => {
  const abs = path.join(IMAGES, rel);
  const url = `/images/${rel}`;
  let meta = {};
  try { meta = await sharp(abs).metadata(); } catch { /* unreadable is still worth listing */ }
  const used = sources.filter((s) => s.text.includes(url)).map((s) => s.rel);
  const dynamic = DYNAMIC.find((d) => d.test.test(rel));
  return {
    rel, url,
    folder: rel.includes('/') ? rel.split('/')[0] : '(loose)',
    name: rel.split('/').pop(),
    width: meta.width, height: meta.height,
    format: meta.format,
    bytes: fs.statSync(abs).size,
    used, dynamicWhy: dynamic ? dynamic.why : null,
  };
}));

const folders = [...new Set(entries.map((e) => e.folder))].sort();
const LABELS = {
  gritty: 'Gritty', characters: 'Characters', books: 'Book covers',
  scenes: 'Scenes', spreads: 'Book spreads',
  photos: 'Photos', '(loose)': 'Loose files',
};
const NOTES = {
  gritty: 'His animation frames. The three boil frames are always on screen; each expression plays when a reply carries that mood.',
  characters: 'Portraits. A character shows a "coming soon" circle until one lands here.',
  books: 'One cover per book, named to match the book\'s file.',
  scenes: 'Kim\'s scene art — Gritty mid-activity, meant for the section buttons (Read, Play, Make, Calm Corner) and the hero.',
  spreads: 'Interior spreads for each book\'s "look inside", named <book>-spread-<n> in reading order.',
  photos: 'Kim, and the photographs on the About page.',
};

const kb = (n) => (n < 1024 * 1024 ? Math.round(n / 1024) + ' KB' : (n / 1048576).toFixed(1) + ' MB');
const unused = entries.filter((e) => !e.used.length && !e.dynamicWhy);

const card = (e) => {
  const src = BASE ? `${BASE}/${e.rel}` : path.relative(path.dirname(OUT), path.join(IMAGES, e.rel));
  const usage = e.used.length
    ? `<ul class="uses">${e.used.map((u) => `<li>${escape(u)}</li>`).join('')}</ul>`
    : e.dynamicWhy
      ? `<p class="auto">${escape(e.dynamicWhy)}</p>`
      : '<p class="unused">Not used anywhere yet.</p>';
  return `<figure class="card${!e.used.length && !e.dynamicWhy ? ' is-unused' : ''}">
    <div class="shot"><img src="${escape(src)}" alt="" loading="lazy"></div>
    <figcaption>
      <p class="nm">${escape(e.name)}</p>
      <p class="dim">${e.width || '?'}&times;${e.height || '?'} &middot; ${escape((e.format || '').toUpperCase())} &middot; ${kb(e.bytes)}</p>
      <code>${escape(e.url)}</code>
      ${usage}
    </figcaption>
  </figure>`;
};

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Image library — Growing with Gritty</title>
<style>
  :root {
    --paper:#FAF6EC; --card:#fff; --blue:#2C5F8A; --blue-deep:#1F4666;
    --green-ink:#4E7140; --gold:#D9A93F; --gold-ink:#8A6414; --sky:#BDD7E7;
    --ink:#2A3238; --soft:#55606A;
  }
  * { box-sizing:border-box; margin:0; }
  body { background:var(--paper); color:var(--ink);
         font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;
         display:grid; grid-template-columns:250px 1fr; min-height:100vh; }

  /* the left rail */
  nav { position:sticky; top:0; align-self:start; height:100vh; overflow-y:auto;
        background:var(--blue-deep); color:#fff; padding:26px 20px; }
  nav h1 { font-size:1.05rem; letter-spacing:-.01em; }
  nav .count { color:var(--sky); font-size:.85rem; margin-bottom:20px; display:block; }
  nav a { display:flex; justify-content:space-between; gap:10px; align-items:baseline;
          color:#fff; text-decoration:none; padding:9px 12px; border-radius:10px;
          font-weight:600; font-size:.95rem; }
  nav a:hover { background:rgba(255,255,255,.14); }
  nav a.on { background:#fff; color:var(--blue-deep); }
  nav a b { font-weight:800; font-size:.8rem; opacity:.7; }
  nav a.on b { opacity:.6; }
  nav hr { border:none; border-top:1px solid rgba(255,255,255,.2); margin:16px 0; }
  nav .foot { color:var(--sky); font-size:.8rem; line-height:1.5; }

  main { padding:34px 32px 80px; max-width:1200px; }
  section { scroll-margin-top:20px; margin-bottom:44px; }
  h2 { font-size:1.35rem; color:var(--blue-deep); }
  .note { color:var(--soft); font-size:.94rem; margin:4px 0 18px; max-width:64ch; }

  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
  .card { background:var(--card); border:1px solid rgba(42,50,56,.1); border-radius:16px;
          overflow:hidden; box-shadow:0 10px 24px -18px rgba(44,95,138,.5); }
  .card.is-unused { border-color:var(--gold); }
  .shot { height:180px; display:grid; place-items:center; padding:12px;
          background:repeating-conic-gradient(#F1ECE0 0 25%, #FAF6EC 0 50%) 0 0/18px 18px; }
  .shot img { max-width:100%; max-height:156px; display:block; }
  figcaption { padding:12px 14px 14px; border-top:1px solid rgba(42,50,56,.08); }
  .nm { font-weight:700; font-size:.94rem; word-break:break-all; }
  .dim { color:var(--soft); font-size:.82rem; margin-bottom:8px; }
  code { display:block; background:var(--paper); border:1px solid var(--sky);
         border-radius:7px; padding:5px 8px; font-size:.78rem; user-select:all;
         word-break:break-all; margin-bottom:8px; }
  .uses { list-style:none; font-size:.8rem; color:var(--green-ink); }
  .uses li::before { content:"\\2713  "; }
  .auto { font-size:.8rem; color:var(--blue); }
  .unused { font-size:.8rem; color:var(--gold-ink); font-weight:600; }

  @media (max-width:820px) {
    body { grid-template-columns:1fr; }
    nav { position:static; height:auto; }
  }
</style></head>
<body>
<nav>
  <h1>Image library</h1>
  <span class="count">${entries.length} images${unused.length ? ` &middot; ${unused.length} unused` : ''}</span>
  ${folders.map((f) => `<a href="#${f.replace(/[()]/g, '')}"><span>${escape(LABELS[f] || f)}</span><b>${entries.filter((e) => e.folder === f).length}</b></a>`).join('\n  ')}
  <hr>
  <p class="foot">Everything in <code style="display:inline;border:0;background:none;padding:0;color:#fff">site/public/images/</code>.
  Generated at deploy — this page is never out of date.</p>
</nav>
<main>
  ${folders.map((f) => `<section id="${f.replace(/[()]/g, '')}">
    <h2>${escape(LABELS[f] || f)}</h2>
    <p class="note">${escape(NOTES[f] || 'Files in this folder.')}</p>
    <div class="grid">
      ${entries.filter((e) => e.folder === f).map(card).join('\n      ')}
    </div>
  </section>`).join('\n  ')}
</main>
<script>
  /* the rail follows what you are looking at */
  var links = [].slice.call(document.querySelectorAll('nav a'));
  var seen = new IntersectionObserver(function (rows) {
    rows.forEach(function (row) {
      if (!row.isIntersecting) return;
      links.forEach(function (a) {
        a.classList.toggle('on', a.getAttribute('href') === '#' + row.target.id);
      });
    });
  }, { rootMargin: '-10% 0px -75% 0px' });
  document.querySelectorAll('section').forEach(function (s) { seen.observe(s); });
</script>
</body></html>
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, html);
console.log(`\n  ${entries.length} images → ${path.relative(process.cwd(), OUT)}`);
if (unused.length) {
  console.log(`  ${unused.length} not referenced anywhere yet:`);
  unused.forEach((u) => console.log(`    · ${u.url}`));
}
console.log('');
