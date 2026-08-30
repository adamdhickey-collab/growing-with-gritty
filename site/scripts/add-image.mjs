#!/usr/bin/env node
/**
 * The image chute, from the command line. The drop page is usually nicer:
 *
 *   npm run chute        →  a page you drag pictures onto
 *
 * This one is for when your hands are already in the terminal:
 *
 *   npm run add-image -- characters/gabby            newest Desktop/Downloads image
 *   npm run add-image -- books/new-book ~/Desktop/scan.png    name the file instead
 *   npm run add-image -- photos/kim-signing --width 1600      override the resize
 *   npm run add-image -- characters/gabby --replace           overwrite on purpose
 *
 * Both routes call landImage(), so the rules — the conversion, the refusals,
 * where things land — are the same either way, and neither commits.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { landImage, folders, ChuteError, EXT, MAX_WIDTH } from './lib/land-image.mjs';

/* GG_INBOX exists for tests; people get the two places files actually land */
const INBOX = process.env.GG_INBOX
  ? [process.env.GG_INBOX]
  : [path.join(os.homedir(), 'Desktop'), path.join(os.homedir(), 'Downloads')];

function die(msg, hint) {
  console.error(`\n  ${msg}${hint ? `\n  ${hint}` : ''}\n`);
  process.exit(1);
}

/* ── arguments ── */
const argv = process.argv.slice(2);
const args = argv.filter((a) => !a.startsWith('--'));
const flags = argv.filter((a) => a.startsWith('--'));
const replace = flags.includes('--replace');
const widthFlag = flags.find((f) => f.startsWith('--width'));
const maxWidth = widthFlag
  ? Number(widthFlag.split('=')[1] ?? argv[argv.indexOf(widthFlag) + 1])
  : MAX_WIDTH;
if (widthFlag && !Number.isFinite(maxWidth)) die('--width needs a number, like --width 1600.');

const name = args[0];
if (!name) {
  die(
    'Name where it lands: `add-image characters/gabby`.',
    `Folders in use: ${folders().join(', ')}. A new folder is fine — it'll be created.`
  );
}

/* ── the source file ── */
function newestDrop() {
  const found = INBOX.flatMap((dir) => {
    try {
      return fs.readdirSync(dir)
        .filter((f) => EXT.test(f) && !f.startsWith('.'))
        .map((f) => path.join(dir, f));
    } catch { return []; }
  });
  if (!found.length) {
    die(`No images on ${INBOX.map((d) => d.replace(os.homedir(), '~')).join(' or ')}.`);
  }
  return found.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
}

const src = args[1] ? path.resolve(args[1].replace(/^~(?=\/)/, os.homedir())) : newestDrop();
if (!fs.existsSync(src)) die(`No such file: ${src}`);

/* a file still downloading has a moving size — wait until it settles */
{
  const before = fs.statSync(src).size;
  await new Promise((r) => setTimeout(r, 350));
  if (fs.statSync(src).size !== before) {
    die(`${path.basename(src)} is still being written. Try again in a moment.`);
  }
}

/* ── land it ── */
try {
  const out = await landImage(fs.readFileSync(src), name, {
    replace, maxWidth, sourceName: path.basename(src),
  });
  const inMB = (fs.statSync(src).size / 1048576).toFixed(2);
  console.log(`\n  from ${src.replace(os.homedir(), '~')}`);
  console.log(`  → ${out.rel}`);
  console.log(`    ${out.from.width}x${out.from.height} ${inMB} MB  →  ` +
              `${out.width}x${out.height} ${Math.round(out.bytes / 1024)} KB`);
  console.log(`\n  Use it as:  ${out.url}`);
  if (name.startsWith('characters/')) {
    console.log('  (a character portrait goes live via its Portrait field —');
    console.log('   src/content/characters/, or the Characters form in the CMS)');
  }
  console.log('\n  Nothing is committed. Look at it, then commit.\n');
} catch (e) {
  if (e instanceof ChuteError) die(e.message, e.hint);
  throw e;
}
