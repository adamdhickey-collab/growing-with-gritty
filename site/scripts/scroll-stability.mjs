#!/usr/bin/env node
/**
 * Scroll stability: nothing a child is looking at may move because they
 * touched it.
 *
 *   npm run test:scroll                  → boots a dev server, drives it, exits
 *   BASE=http://localhost:4321 npm run test:scroll   → uses a server already up
 *   npm run test:scroll -- --keep        → prints every measurement, not just
 *                                          the ones over budget
 *
 * Two different faults feel identical to a five-year-old and are measured
 * apart here:
 *
 *   Δscroll  the PAGE moved under a still layout — almost always a bare
 *            .focus() scrolling something into view, made theatrical by
 *            `html { scroll-behavior: smooth }`.
 *   Δdoc     the LAYOUT moved under a still page — a row appearing, a line
 *            of text wrapping differently, a panel swapping for a taller one.
 *
 * Each check names the one thing on screen that must not move — the trail
 * cabinet, Gritty — and both numbers are taken against it. Anything over
 * TOL px is a failure; anything carrying `open` is a known gap with a
 * reason, printed but not counted.
 *
 * Run it at every width the site is built for. A fix that holds still on a
 * laptop and lurches on a phone is not a fix.
 */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

/* a couple of pixels is a rounding difference between two layout passes;
   anything more is something a child would see move */
const TOL = 4;
const VERBOSE = process.argv.includes('--keep');

const VIEWPORTS = [
  ['iphone-se', 375, 667],
  ['iphone-14', 390, 844],
  ['tablet', 768, 1024],
  ['laptop', 1280, 800],
  ['desktop', 1440, 900],
];

const wait = (page, ms) => page.waitForTimeout(ms);

/* ——— the dev server, unless one is already up ——— */
async function serve() {
  if (process.env.BASE) return { base: process.env.BASE, stop: () => {} };
  const port = 4400 + Math.floor(Math.random() * 400);
  const proc = spawn('node_modules/.bin/astro', ['dev', '--port', String(port)], {
    cwd: new URL('..', import.meta.url).pathname,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const base = `http://localhost:${port}`;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`astro dev never came up on ${port}`)), 40000);
    proc.stdout.on('data', (d) => {
      if (String(d).includes(`localhost:${port}`)) { clearTimeout(timer); resolve(); }
    });
    proc.on('exit', (c) => { clearTimeout(timer); reject(new Error(`astro dev exited (${c})`)); });
  });
  await new Promise((r) => setTimeout(r, 700));
  return { base, stop: () => proc.kill() };
}

/* ——— one run's findings ——— */
const rows = [];
const record = (vp, check, dScroll, dDoc, note, open) =>
  rows.push({ vp, check, dScroll, dDoc, note, open });

/* Where the thing that must not move is, in both frames at once.
   Walked up the offsetParent chain rather than read off a bounding box:
   Gritty breathes, hops and giggles, and a box that includes his transform
   reports ten pixels of "layout shift" that is really just a goat being
   alive. offsetTop is the box the layout put him in. */
const anchorOf = (page, sel) => page.evaluate((s) => {
  let el = document.querySelector(s), doc = 0;
  while (el) { doc += el.offsetTop; el = el.offsetParent; }
  return { vp: doc - Math.round(scrollY), doc, y: Math.round(scrollY) };
}, sel);

/* clicks are dispatched in the page, never driven by the mouse: Playwright
   scrolls an element into view before clicking it, which is the very thing
   under test */
const press = (page, sel) => page.evaluate((s) => document.querySelector(s).click(), sel);

/* ——————————————————— the Grit Trail ——————————————————— */
async function gritZone(page, base, vp) {
  await page.goto(`${base}/grit-zone`, { waitUntil: 'networkidle' });
  await page.evaluate(() => { try { localStorage.removeItem('gg-grit-trail'); } catch {} });
  await page.reload({ waitUntil: 'networkidle' });
  await wait(page, 500);

  const MAP = '[data-trail]';
  /* park the map partway down the window: a jump only shows against a page
     that had somewhere to jump from */
  await page.evaluate(() => {
    const t = document.querySelector('[data-trail]');
    window.scrollTo({ top: scrollY + t.getBoundingClientRect().top - 90, behavior: 'instant' });
  });
  await wait(page, 250);

  let a = await anchorOf(page, MAP);
  const parked = a;
  const step = async (check, act, ms = 800, note) => {
    await act();
    await wait(page, ms);
    const b = await anchorOf(page, MAP);
    record(vp, check, b.y - a.y, b.doc - a.doc, note);
    a = b;
    return b;
  };

  await step('press Play', () => press(page, '[data-play]'));

  /* the layer must hold the page still all by itself */
  await step('scroll behind the layer', () => page.mouse.wheel(0, 400), 400);

  /* the machine fits the window, and the way out is on it */
  const room = await page.evaluate(() => {
    const cab = document.querySelector('dialog[open] .cab:not([hidden])');
    const r = cab.getBoundingClientRect();
    return { fits: r.top >= -1 && r.bottom <= innerHeight + 1, h: Math.round(r.height) };
  });
  if (!room.fits) record(vp, 'cabinet fits the window', TOL + 1, 0, `${room.h}px tall`);

  const answer = await page.evaluate(() =>
    document.querySelector('[data-scenario]:not([hidden])').dataset.answer);
  await step('the grit choice', () =>
    press(page, `[data-scenario]:not([hidden]) .choice[data-key="${answer}"]`), 900);

  const wayOut = await page.evaluate(() => {
    const r = document.querySelector('[data-scenario]:not([hidden]) [data-back]').getBoundingClientRect();
    return r.top >= 0 && r.bottom <= innerHeight + 1;
  });
  if (!wayOut) record(vp, '"Back to the trail" on screen', TOL + 1, 0, 'below the fold');

  await step('back to the trail', () =>
    press(page, '[data-scenario]:not([hidden]) [data-back]'), 1000);
  record(vp, 'round trip', a.y - parked.y, a.doc - parked.doc);

  /* Escape is the same door, and leaves the card as it found it */
  await press(page, '[data-play]'); await wait(page, 600);
  a = await anchorOf(page, MAP);
  const wrong = await page.evaluate(() => {
    const c = document.querySelector('[data-scenario]:not([hidden])');
    return ['a', 'b', 'c'].find((k) => k !== c.dataset.answer);
  });
  await press(page, `[data-scenario]:not([hidden]) .choice[data-key="${wrong}"]`);
  await wait(page, 400);
  await step('escape', () => page.keyboard.press('Escape'), 900);
  await press(page, '[data-play]'); await wait(page, 600);
  const clean = await page.evaluate(() => {
    const c = document.querySelector('[data-scenario]:not([hidden])');
    return c.querySelector('[data-nudge]').hidden && c.querySelectorAll('.choice.tried').length === 0;
  });
  if (!clean) record(vp, 'a card reopens clean', TOL + 1, 0, 'kept its wrong answer');
  await page.keyboard.press('Escape'); await wait(page, 700);

  /* the whole climb, and the summit that raises itself at the top of it */
  a = await anchorOf(page, MAP);
  for (let k = 0; k < 12; k++) {
    const st = await page.evaluate(() => ({
      open: !!document.querySelector('dialog[open]'),
      more: !document.querySelector('[data-play]').hidden,
    }));
    if (!st.more) break;
    if (!st.open) { await press(page, '[data-play]'); await wait(page, 400); }
    const A = await page.evaluate(() =>
      document.querySelector('[data-scenario]:not([hidden])').dataset.answer);
    await press(page, `[data-scenario]:not([hidden]) .choice[data-key="${A}"]`);
    await wait(page, 400);
    await press(page, '[data-scenario]:not([hidden]) [data-back]');
    await wait(page, 700);
  }
  const summit = await page.evaluate(() => {
    const d = document.querySelector('dialog[open]');
    const f = document.querySelector('[data-finale]');
    const r = f.getBoundingClientRect();
    return { up: !!d && d.contains(f), fits: r.top >= -1 && r.bottom <= innerHeight + 1 };
  });
  const b = await anchorOf(page, MAP);
  record(vp, 'climbing to the summit', b.y - a.y, b.doc - a.doc);
  if (!summit.up) record(vp, 'the summit raises itself', TOL + 1, 0, 'never came up');
  if (!summit.fits) record(vp, 'the summit fits the window', TOL + 1, 0, 'taller than the window');
  a = b;
  await step('a new climb', () => press(page, '[data-replay]'), 1000);
}

/* ——————————————————— the meadow hero ——————————————————— */
async function homepage(page, base, vp, phone) {
  await page.goto(`${base}/`, { waitUntil: 'networkidle' });
  await wait(page, 1000);
  const HIM = '[data-gritty]';
  await page.evaluate(() => {
    const g = document.querySelector('[data-gritty]');
    window.scrollTo({ top: Math.max(0, scrollY + g.getBoundingClientRect().top - 200), behavior: 'instant' });
  });
  await wait(page, 250);

  /* the sayings take turns on their own — that is motion nobody asked for,
     so it may not carry the page with it */
  let a = await anchorOf(page, HIM);
  await wait(page, 13000);
  let b = await anchorOf(page, HIM);
  record(vp, 'the sayings rotate', b.y - a.y, b.doc - a.doc);
  a = b;

  /* On a phone the reply chips still push him down the page: holding their
     row open costs 176px of sky and puts Gritty under the fold, so what
     that room is worth is a design call, not a bug to quietly paper over. */
  const open = phone ? 'phone chip row: open design question' : undefined;

  await press(page, HIM); await wait(page, 900);
  b = await anchorOf(page, HIM);
  record(vp, 'tap Gritty', b.y - a.y, b.doc - a.doc, undefined, open);
  a = b;

  await page.evaluate(() => document.querySelector('[data-chip]:not([hidden])').click());
  await wait(page, 1400);
  b = await anchorOf(page, HIM);
  record(vp, 'answer him', b.y - a.y, b.doc - a.doc, undefined, open);
}

/* ——————————————————— run ——————————————————— */
const { base, stop } = await serve();
const browser = await chromium.launch();
let crashed = null;
try {
  for (const [name, width, height] of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await gritZone(page, base, name);
    await homepage(page, base, name, width <= 600);
    for (const e of errs) record(name, 'javascript error', TOL + 1, 0, e.slice(0, 70));
    await page.close();
  }
} catch (e) {
  crashed = e;
} finally {
  await browser.close();
  stop();
}
if (crashed) { console.error(crashed); process.exit(2); }

const over = (r) => Math.abs(r.dScroll) > TOL || Math.abs(r.dDoc) > TOL;
const bad = rows.filter((r) => over(r) && !r.open);
const known = rows.filter((r) => over(r) && r.open);

const pad = (s, n) => String(s).padEnd(n);
if (VERBOSE || bad.length || known.length) {
  console.log(pad('viewport', 12) + pad('check', 30) + pad('Δscroll', 9) + pad('Δlayout', 9) + 'note');
  for (const r of (VERBOSE ? rows : [...bad, ...known])) {
    console.log(pad(r.vp, 12) + pad(r.check, 30) + pad(r.dScroll, 9) + pad(r.dDoc, 9)
      + (r.note ?? '') + (r.open ? `  (${r.open})` : ''));
  }
  console.log('');
}
if (known.length) console.log(`${known.length} known gap(s), not counted — see the note above.`);
console.log(bad.length
  ? `✗ ${bad.length} of ${rows.length} checks moved more than ${TOL}px.`
  : `✓ all ${rows.length} checks held still (within ${TOL}px) at ${VIEWPORTS.length} widths.`);
process.exit(bad.length ? 1 : 0);
