/**
 * The rules for putting an image into this site, in one place.
 *
 * Both routes use it: the drop page (`npm run chute`) and the one-liner
 * (`npm run add-image`). Anything that decides where a file lands, what it
 * is converted to, or when it is refused belongs here — two copies of these
 * rules would drift, and the drift would be silent.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
/* sharp is already here as Astro's own image library — no new dependency */
const sharp = require('sharp');

export const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
export const IMAGES = path.join(SITE, 'public/images');
export const EXT = /\.(png|jpe?g|webp|tiff?|gif|heic|heif)$/i;
export const MAX_WIDTH = 1400; // wider than any layout slot on the site
export const QUALITY = 82;

/** A refusal with a reason worth reading. `code` lets the UI offer a fix. */
export class ChuteError extends Error {
  constructor(code, message, hint) {
    super(message);
    this.code = code;
    this.hint = hint;
  }
}

/** The folders public/images already uses, for the drop page's menu. */
export function folders() {
  try {
    return fs.readdirSync(IMAGES, { withFileTypes: true })
      .filter((e) => e.isDirectory() && e.name !== 'gritty')
      .map((e) => e.name)
      .sort();
  } catch { return []; }
}

/** Filename → a clean slug: "Gabby Scan 2.PNG" → "gabby-scan-2" */
export function slug(filename) {
  return path.basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';
}

/**
 * Convert an image and file it under public/images.
 *
 * @param {Buffer} bytes   the image itself
 * @param {string} name    where it lands, like "characters/gabby" (no extension)
 * @param {object} [opts]  { replace, maxWidth, sourceName }
 * @returns {Promise<{rel: string, url: string, width: number, height: number,
 *                    bytes: number, from: {width: number, height: number}}>}
 */
export async function landImage(bytes, name, opts = {}) {
  const { replace = false, maxWidth = MAX_WIDTH, sourceName = 'image' } = opts;

  /* ── where it lands ── */
  if (!name || !name.includes('/')) {
    throw new ChuteError(
      'no-folder',
      'Say which folder it goes in, like characters/gabby.',
      `Folders in use: ${folders().join(', ') || 'none yet'}.`
    );
  }
  if (name.startsWith('gritty/')) {
    throw new ChuteError(
      'gritty-reserved',
      "gritty/ holds Gritty's re-inked animation frames, which the chute can't make.",
      'For a character portrait use characters/; otherwise pick another folder.'
    );
  }
  const dest = path.join(IMAGES, `${name.replace(/\.\w+$/, '')}.webp`);
  if (!dest.startsWith(IMAGES + path.sep)) {
    throw new ChuteError('escapes', 'That path escapes public/images.');
  }
  const rel = path.relative(SITE, dest);
  if (fs.existsSync(dest) && !replace) {
    throw new ChuteError(
      'exists',
      `${rel} already exists.`,
      'Nothing was written. Replace it on purpose, or land it under another name.'
    );
  }

  /* ── convert first, to a buffer: nothing is written until it succeeds ── */
  let out, meta;
  try {
    /* .rotate() bakes in the camera's EXIF orientation before it is stripped */
    const input = sharp(bytes).rotate();
    meta = await input.metadata();
    out = await input
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer({ resolveWithObject: true });
  } catch (e) {
    if (/heif|heic/i.test(String(e))) {
      throw new ChuteError(
        'heic',
        `${sourceName} is HEIC, which this build of sharp can't read.`,
        'Export it as JPEG or PNG first — in Preview: File → Export.'
      );
    }
    throw new ChuteError('unreadable', `Couldn't read ${sourceName}: ${e.message}`);
  }

  /* ── refuse a duplicate of anything the site already serves. Hashes compare
        the CONVERTED bytes, because the repo only ever holds conversions: the
        same picture dropped twice lands byte-identical and is caught here. ── */
  const md5 = (b) => crypto.createHash('md5').update(b).digest('hex');
  const outHash = md5(out.data);
  const twin = (function scan(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { const hit = scan(p); if (hit) return hit; }
      else if (EXT.test(e.name) && p !== dest && md5(fs.readFileSync(p)) === outHash) return p;
    }
    return null;
  })(IMAGES);
  if (twin) {
    throw new ChuteError(
      'duplicate',
      `That is the same image as ${path.relative(SITE, twin)}.`,
      'Nothing was written — the site already serves it.'
    );
  }

  /* ── file it ── */
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out.data);
  return {
    rel,
    url: `/images/${name.replace(/\.\w+$/, '')}.webp`,
    width: out.info.width,
    height: out.info.height,
    bytes: out.info.size,
    from: { width: meta.width, height: meta.height },
  };
}
