import type { APIRoute } from 'astro';
import { indexable } from '../../site.config.mjs';

/* robots.txt is generated, never hand-written, so it can never drift from the
   `indexable` switch in site.config.mjs.
 *
 * Two things this file deliberately does NOT do:
 *
 * 1. It does not restate `User-agent: * / Allow: /`. Cloudflare's Managed
 *    robots.txt already prepends a wildcard group — the one declaring the
 *    content signals and turning away the AI *training* crawlers, which is a
 *    setting in the dashboard rather than anything in this repo. A second
 *    wildcard group underneath it is merged by well-behaved crawlers and
 *    ignored below the first by simpler ones, so the safe move is to add only
 *    what is genuinely missing. That is the sitemap.
 *
 * 2. It does not hide pages. Hiding is done with `<meta name="robots"
 *    content="noindex">` — the `noindex` prop on Base.astro, which
 *    /style-guide uses. Blocking a path here would stop a crawler fetching
 *    the page, and therefore stop it ever reading the noindex inside; a
 *    blocked page can still be listed from links alone. robots.txt controls
 *    crawling, the meta tag controls indexing, and only the second is what
 *    "keep this out of search" actually means.
 *
 * The "stay out" form below is the exception, and it is belt and braces
 * alongside the site-wide noindex rather than the mechanism itself. */

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  const body = indexable
    ? `# Growing with Gritty — grittythegoat.com
# Kim Rekowski's Gritty the Goat books, and free activities for kids.
#
# Crawling rules live in the wildcard group above, which Cloudflare's
# Managed robots.txt writes. Pages we keep out of search carry a noindex
# meta tag instead — see src/pages/robots.txt.ts for why.

Sitemap: ${sitemap}
`
    : `# The site is not ready to be found yet.
# Pages also carry <meta name="robots" content="noindex, nofollow">,
# which is the mechanism that actually keeps them out of an index.

User-agent: *
Disallow: /
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
