#!/usr/bin/env node
/**
 * Turn a drawing into a printable sheet, the way the image chute turns a
 * drawing into site art:
 *
 *   npm run printable -- i-have-grit                 newest Desktop/Downloads image
 *   npm run printable -- i-have-grit ~/Desktop/a.png  name the file instead
 *
 * It writes two files — the PDF families download, and the thumbnail the
 * Grown-Up Grit Guide shows — then prints the markdown to save in
 * src/content/printables/. It never commits, and never writes the markdown
 * itself: the words on the card are Kim's to choose.
 *
 * What "printable" means here lives in lib/make-printable.mjs.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';
import { makePrintable, slug, SITE } from './lib/make-printable.mjs';

const EXT = /\.(png|jpe?g|webp|tiff?|gif|heic|heif)$/i;
const INBOX = process.env.GG_INBOX
  ? [process.env.GG_INBOX]
  : [path.join(os.homedir(), 'Desktop'), path.join(os.homedir(), 'Downloads')];

function die(msg, hint) {
  console.error(`\n  ${msg}${hint ? `\n  ${hint}` : ''}\n`);
  process.exit(1);
}

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const name = args[0];
if (!name) die('Name the sheet: `npm run printable -- i-have-grit`.');

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

const out = await makePrintable(fs.readFileSync(src), name, { chromium });
const id = slug(name);
const kb = Math.round(out.pdfBytes / 1024);

console.log(`
  ${path.basename(src)}  →  US Letter, 1 page, ${kb} KB

    ${path.relative(SITE, path.join(SITE, 'public', out.pdf))}
    ${path.relative(SITE, path.join(SITE, 'public', out.thumb))}

  Save this as src/content/printables/${id}.md:

    ---
    title: Give it a name
    kind: coloring-page
    audience: kids
    download: ${out.pdf}
    thumb: ${out.thumb}
    ---
`);
