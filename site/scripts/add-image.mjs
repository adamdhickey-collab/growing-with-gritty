#!/usr/bin/env node
/**
 * The image chute — the newest picture on the Desktop (or in Downloads),
 * converted and filed where the site serves it. Same idea as lucy-learns'
 * `pilot.mjs add`: name where it should land, and the chute finds the file,
 * refuses duplicates, and writes a web-ready webp.
 *
 *   npm run add-image -- characters/gabby            newest Desktop/Downloads image
 *   npm run add-image -- books/new-book ~/Desktop/scan.png    name the file instead
 *   npm run add-image -- photos/kim-signing --width 1600      override the resize
 *   npm run add-image -- characters/gabby --replace           overwrite on purpose
 *
 * It converts (sharp — already here as Astro's own image library), resizes to
 * a sane web width, strips camera metadata, and prints the /images/… URL the
 * CMS and content files use. It never commits: review the result, then commit.
 *
 * This is Adam's tool. Kim adds images by uploading in Pages CMS, which
 * handles its own media — the two routes land in the same public/images/.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const IMAGES = path.join(SITE, 'public/images');
/* GG_INBOX exists for tests; people get the two places files actually land */
const INBOX = process.env.GG_INBOX
  ? [process.env.GG_INBOX]
  : [path.join(os.homedir(), 'Desktop'), path.join(os.homedir(), 'Downloads')];
const EXT = /\.(png|jpe?g|webp|tiff?|gif|heic)$/i;
const MAX_WIDTH = 1400; // wider than any layout slot; Astro/browsers do the rest
const QUALITY = 82;

function die(msg) {
  console.error(`\n  ${msg}\n`);
  process.exit(1);
}

/* ── arguments ── */
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const flags = process.argv.slice(2).filter((a) => a.startsWith('--'));
const replace = flags.includes('--replace');
const widthFlag = flags.find((f) => f.startsWith('--width'));
const maxWidth = widthFlag
  ? Number(widthFlag.split('=')[1] ?? process.argv[process.argv.indexOf(widthFlag) + 1])
  : MAX_WIDTH;
if (widthFlag && !Number.isFinite(maxWidth)) die('--width needs a number, like --width 1600.');

const name = args[0];
if (!name || !name.includes('/')) {
  const folders = fs.readdirSync(IMAGES, { withFileTypes: true })
    .filter((e) => e.isDirectory()).map((e) => e.name).join(', ');
  die(
    `Name where it lands: \`add-image characters/gabby\`.\n` +
    `  Folders in use: ${folders}. A new folder is fine — it'll be created.`
  );
}
if (name.startsWith('gritty/')) {
  die(
    `gritty/ holds Gritty's re-inked animation frames, which the chute can't make —\n` +
    `  they come from the line-boil process (see README). For a character portrait\n` +
    `  use characters/, for anything else pick another folder.`
  );
}

/* ── the source file ── */
function newestDrop() {
  const candidates = INBOX.flatMap((dir) => {
    try {
      return fs.readdirSync(dir)
        .filter((f) => EXT.test(f) && !f.startsWith('.'))
        .map((f) => path.join(dir, f));
    } catch { return []; }
  });
  if (!candidates.length) die(`No images on ${INBOX.map((d) => d.replace(os.homedir(), '~')).join(' or ')}.`);
  return candidates.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
}

const src = args[1] ? path.resolve(args[1].replace(/^~(?=\/)/, os.homedir())) : newestDrop();
if (!fs.existsSync(src)) die(`No such file: ${src}`);

/* a file still downloading has a moving size — wait until it settles */
{
  const a = fs.statSync(src).size;
  await new Promise((r) => setTimeout(r, 350));
  if (fs.statSync(src).size !== a) die(`${path.basename(src)} is still being written. Try again in a moment.`);
}

/* ── where it lands ── */
const dest = path.join(IMAGES, `${name.replace(/\.\w+$/, '')}.webp`);
if (!dest.startsWith(IMAGES + path.sep)) die('That path escapes public/images.');
if (fs.existsSync(dest) && !replace) {
  die(
    `${path.relative(SITE, dest)} already exists.\n` +
    `  Nothing was written. Re-run with --replace to overwrite it on purpose,\n` +
    `  or land it under a different name.`
  );
}

/* ── convert first, to a buffer ── */
let out, meta;
try {
  /* .rotate() bakes in the camera's EXIF orientation before it's stripped */
  const input = sharp(src).rotate();
  meta = await input.metadata();
  out = await input
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer({ resolveWithObject: true });
} catch (e) {
  if (/heif|heic/i.test(String(e))) {
    die(`${path.basename(src)} is HEIC, which this build of sharp can't read.\n  Export it as JPEG or PNG first (Preview: File → Export).`);
  }
  die(`Couldn't convert ${path.basename(src)}: ${e.message}`);
}

/* ── refuse a duplicate of anything the site already serves. Hashes compare
      the CONVERTED bytes, not the source: the repo only ever holds converted
      webp, so the same drop re-added lands byte-identical and is caught. ── */
const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
const outHash = md5(out.data);
(function scan(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) scan(p);
    else if (EXT.test(e.name) && md5(fs.readFileSync(p)) === outHash) {
      die(
        `That converts byte-for-byte to ${path.relative(SITE, p)}.\n` +
        `  Nothing was written — the site already serves this exact image.`
      );
    }
  }
})(IMAGES);

/* ── file it ── */
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, out.data);
const inMB = (fs.statSync(src).size / 1048576).toFixed(2);
const outKB = Math.round(out.info.size / 1024);
console.log(`\n  from ${src.replace(os.homedir(), '~')}`);
console.log(`  → ${path.relative(SITE, dest)}`);
console.log(`    ${meta.width}x${meta.height} ${inMB} MB  →  ${out.info.width}x${out.info.height} ${outKB} KB`);
console.log(`\n  Use it as:  /images/${name.replace(/\.\w+$/, '')}.webp`);
if (name.startsWith('characters/')) {
  console.log(`  (a character portrait goes live via its Portrait field —`);
  console.log(`   src/content/characters/, or the Characters form in the CMS)`);
}
console.log(`\n  Nothing is committed. Look at it, then commit.\n`);
