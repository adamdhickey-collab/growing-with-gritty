/* Prefix an internal path with the site's base path.
 *
 * Needed because the GitHub Pages review build serves the site from a
 * subfolder (…/growing-with-gritty/preview/), while the real Cloudflare
 * deploy serves it from the domain root. Astro sets `base` for us but does
 * NOT rewrite hard-coded absolute hrefs, so every internal link and asset
 * path goes through here.
 *
 * External URLs, anchors and mailto: links pass through untouched — content
 * fields from the CMS (buy links) are external, and must not be prefixed.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path?: string | null): string {
  if (!path) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//') || path.startsWith('#')) {
    return path;
  }
  return BASE + (path.startsWith('/') ? path : '/' + path);
}
