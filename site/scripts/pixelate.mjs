#!/usr/bin/env node
/**
 * The Grit Zone's pixel sprites, from ChatGPT's crayon drawings.
 *
 *   npm run pixelate            newest nine "ChatGPT Image …" PNGs in Downloads
 *   npm run pixelate ~/art      a folder of the same nine, any names, sorted
 *
 * The retro look is two halves: this script shrinks each drawing to a tiny
 * native size with a small palette, and the page scales it back up with
 * `image-rendering: pixelated`. A big picture shown pixelated just looks
 * sharp; a tiny one shown pixelated looks like a game.
 *
 * The nine drop in generation order — the order the prompt pack lists them.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
const sharp = createRequire(import.meta.url)('sharp');

const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../public/images/grit-zone');

/* name, native width, palette size, and an optional crop (fraction of height kept) */
const SPRITES = [
  { name: 'trailhead',    width: 256, colours: 48 },
  { name: 'trail-bg',     width: 160, colours: 40, keepTop: 0.84 }, /* the meadow band goes; the stops need mountain */
  { name: 'flag',         width: 32,  colours: 16 },
  { name: 'stop-ahead',   width: 16,  colours: 12 },
  { name: 'stop-current', width: 32,  colours: 16 },
  { name: 'stop-done',    width: 24,  colours: 16 },
  { name: 'walker',       width: 32,  colours: 24 },
  { name: 'cloud',        width: 48,  colours: 8 },
  { name: 'sun',          width: 48,  colours: 12 },
];

const dir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(os.homedir(), 'Downloads');
const files = fs.readdirSync(dir)
  .filter((f) => /\.png$/i.test(f) && (process.argv[2] || f.startsWith('ChatGPT Image')))
  .map((f) => path.join(dir, f))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
  .slice(0, SPRITES.length)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (files.length !== SPRITES.length) {
  console.error(`Need ${SPRITES.length} PNGs in ${dir}, found ${files.length}.`);
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });
for (const [i, s] of SPRITES.entries()) {
  let img = sharp(files[i]);
  const meta = await img.metadata();
  if (s.keepTop) img = img.extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.height * s.keepTop) });
  const out = path.join(OUT, `${s.name}.png`);
  const info = await img
    .resize({ width: s.width, kernel: 'lanczos3' })
    .png({ palette: true, colours: s.colours, dither: 0 })
    .toFile(out);
  console.log(`${s.name}.png  ${info.width}×${info.height}  ${info.size} bytes  ← ${path.basename(files[i])}`);
}
