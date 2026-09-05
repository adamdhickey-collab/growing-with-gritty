/**
 * The rules for turning a drawing into something a family can actually print.
 *
 * A coloring page is not a picture on a web page — it is a sheet of paper
 * coming out of a printer in someone's kitchen. That printer decides the
 * page size, and it cannot print to the edge. So every printable here is
 * built the same way:
 *
 *   · US Letter, portrait, one page — the size every home printer in the
 *     US already has loaded, and the size Kim's classroom copier uses.
 *   · A half-inch quiet margin on all four sides. Home printers refuse to
 *     print inside roughly a quarter-inch; half an inch clears every one of
 *     them, so the art never comes out clipped.
 *   · Grayscale at 300 DPI. Line art printed from a 150 DPI web image comes
 *     out with soft, stair-stepped strokes; grayscale keeps a color printer
 *     from spending color ink on black lines.
 *   · A quiet footer with the site's name, because a printable that gets
 *     photocopied in a staff room should still say where it came from.
 *
 * PDF is the delivery format and not a choice: an image downloads at
 * whatever size the browser feels like, while a PDF carries its own page
 * size and margins and prints identically everywhere.
 *
 * The thumbnail on the site is a picture of that same page — same trim,
 * same margins, same footer — so what a grown-up taps is what comes out of
 * the printer.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
/* sharp is already here as Astro's own image library — no new dependency */
const sharp = require('sharp');

export const SITE = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
export const PDF_DIR = path.join(SITE, 'public/printables');
export const THUMB_DIR = path.join(SITE, 'public/images/printables');

/* US Letter at 300 DPI, the resolution print shops ask for. */
const DPI = 300;
const PAGE_W = 8.5 * DPI;
const PAGE_H = 11 * DPI;
const MARGIN = 0.5 * DPI;
/* The footer's strip at the foot of the page, inside the margin. */
const FOOTER = 0.34 * DPI;

/* The footer's address comes from the Astro config, because a PDF outlives
   the page it was downloaded from: a second copy of the domain here would go
   stale the next time the site moves, and no build would ever catch it.
   Re-run `npm run printable` for each sheet after a domain change. */
const { default: astroConfig } = await import('../../astro.config.mjs');
const FOOTER_TEXT = 'Growing with Gritty  ·  '
  + new URL(astroConfig.site).host.replace(/^www\./, '');

/** Filename → a clean slug, matching the image chute's rule. */
export function slug(name) {
  return path.basename(name, path.extname(name))
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';
}

function fontFace(family, file, weight) {
  const url = 'file://' + path.join(SITE, 'node_modules', file);
  return `@font-face{font-family:'${family}';src:url('${url}') format('woff2');`
       + `font-weight:${weight};font-display:block;}`;
}

/**
 * Prepare the artwork itself: trim the white surround the drawing came with,
 * flatten any transparency onto white, drop it to grayscale, and scale it so
 * the strokes still land crisp at 300 DPI.
 *
 * Trimming is what makes three drawings with three different margins print
 * as one set — after the trim, the page's own margin is the only one left.
 */
async function prepareArt(bytes) {
  const box = { w: PAGE_W - MARGIN * 2, h: PAGE_H - MARGIN * 2 - FOOTER };
  return sharp(bytes)
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 12 })
    .grayscale()
    .resize({
      width: Math.round(box.w),
      height: Math.round(box.h),
      fit: 'inside',
      withoutEnlargement: false,
      kernel: 'lanczos3',
    })
    /* Line art is black strokes and the gray steps that smooth their edges —
       32 of those steps is more than an eye or a printer can tell from a
       full gradient, and it takes the PDF from megabytes to a size that
       downloads on a phone. */
    .png({ palette: true, colors: 32, compressionLevel: 9 })
    .toBuffer();
}

/** The page, as HTML. Printed to PDF and photographed for the thumbnail. */
function pageHtml(artDataUri) {
  const fonts = [
    fontFace('Fredoka Print', '@fontsource-variable/fredoka/files/fredoka-latin-wght-normal.woff2', '300 700'),
    fontFace('Nunito Print', '@fontsource-variable/nunito/files/nunito-latin-wght-normal.woff2', '200 1000'),
  ].join('');

  return `<!doctype html><meta charset="utf-8"><style>
    ${fonts}
    @page { size: 8.5in 11in; margin: 0; }
    html, body { margin: 0; padding: 0; background: #fff; }
    .sheet {
      width: 8.5in; height: 11in; box-sizing: border-box;
      padding: 0.5in;
      display: flex; flex-direction: column; align-items: center;
      background: #fff;
    }
    .art { flex: 1 1 auto; min-height: 0; display: flex; align-items: center; }
    .art img { max-width: 100%; max-height: 100%; display: block; }
    .footer {
      flex: 0 0 ${FOOTER / DPI}in;
      display: flex; align-items: flex-end; justify-content: center;
      font-family: 'Nunito Print', sans-serif;
      font-size: 8.5pt; font-weight: 600; letter-spacing: 0.04em;
      color: #8a8a8a;
    }
  </style>
  <div class="sheet">
    <div class="art"><img src="${artDataUri}" alt=""></div>
    <div class="footer">${FOOTER_TEXT}</div>
  </div>`;
}

/**
 * Build one printable.
 *
 * @param {Buffer} bytes  the drawing
 * @param {string} name   the slug both files are named for
 * @param {object} deps   { chromium } — passed in so the lib holds the rules
 *                        and the caller owns the browser's lifetime
 * @returns {Promise<{pdf: string, thumb: string, pdfBytes: number}>}
 */
export async function makePrintable(bytes, name, { chromium }) {
  const id = slug(name);
  fs.mkdirSync(PDF_DIR, { recursive: true });
  fs.mkdirSync(THUMB_DIR, { recursive: true });

  const art = await prepareArt(bytes);
  const html = pageHtml(`data:image/png;base64,${art.toString('base64')}`);

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 850, height: 1100 },
      deviceScaleFactor: 2,
    });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);

    const pdfPath = path.join(PDF_DIR, `${id}.pdf`);
    await page.pdf({ path: pdfPath, printBackground: true, preferCSSPageSize: true });

    /* The thumbnail is a photograph of the very page that just printed. */
    const shot = await page.locator('.sheet').screenshot({ type: 'png' });
    const thumbPath = path.join(THUMB_DIR, `${id}.webp`);
    await sharp(shot).resize({ width: 560 }).webp({ quality: 82 }).toFile(thumbPath);

    return {
      pdf: `/printables/${id}.pdf`,
      thumb: `/images/printables/${id}.webp`,
      pdfBytes: fs.statSync(pdfPath).size,
    };
  } finally {
    await browser.close();
  }
}
