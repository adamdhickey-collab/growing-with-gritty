import type { APIRoute } from 'astro';
import { indexable } from '../../site.config.mjs';

/* robots.txt is generated, never hand-written, so it can never disagree with
   the `indexable` switch in site.config.mjs. Flip that one flag and both the
   noindex tags and this file follow.

   A note on why this file does NOT block crawlers while the site is hidden:
   robots.txt stops a crawler *fetching* a page, which also stops it reading
   the `noindex` tag inside. A page blocked here can still be listed from
   links alone. So hiding is done with noindex — the meta tag in Base.astro —
   and this file only ever ships the "stay out" form as a belt-and-braces
   companion to it.

   /style-guide is Kim's internal brand reference. It is excluded from the
   sitemap and disallowed here: useful to us, noise in a search result. */

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;

  const body = indexable
    ? `# Growing with Gritty — grittythegoat.com
# Kim Rekowski's Gritty the Goat books, and free activities for kids.

User-agent: *
Allow: /
Disallow: /style-guide

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
