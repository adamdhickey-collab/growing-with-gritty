// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

/* The GitHub Pages review build serves this site from a subfolder, so it
   passes PREVIEW_BASE (e.g. /growing-with-gritty/preview). The real
   Cloudflare deploy sets nothing and serves from the domain root. */
const previewBase = process.env.PREVIEW_BASE || undefined;

export default defineConfig({
  /* Icons come from Fluent Emoji Flat (Microsoft, MIT) via Iconify, and are
     inlined as SVG at build time — nothing is fetched at runtime. Kim's own
     art still carries the nav and the two big welcome buttons. */
  integrations: [icon({ include: { 'fluent-emoji-flat': ['*'] } })],
  site: 'https://grittythegoat.com',
  base: previewBase,
  trailingSlash: 'ignore',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
