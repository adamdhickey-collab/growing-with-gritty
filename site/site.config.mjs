/* Site-wide switches that both astro.config.mjs and components need,
   so they live outside src/ where the Astro config can import them too.
   Same pattern as Door County Found. */

/* Whether search engines may index this site.

   False while the site is being built and Kim is still filling in content.
   The mechanism that does the hiding is the `<meta name="robots"
   content="noindex">` tag in Base.astro — NOT robots.txt, which blocks
   crawling and therefore stops Google from ever reading the noindex.

   Flipping to true:
     · every page drops the noindex tag
     · then request indexing in Google Search Console rather than waiting
       for an organic recrawl. */
export const indexable = false;
