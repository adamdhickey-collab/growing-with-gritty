// @ts-check
import { defineConfig } from 'astro/config';

/* The GitHub Pages review build serves this site from a subfolder, so it
   passes PREVIEW_BASE (e.g. /growing-with-gritty/preview). The real
   Cloudflare deploy sets nothing and serves from the domain root. */
const previewBase = process.env.PREVIEW_BASE || undefined;

export default defineConfig({
  site: 'https://growingwithgritty.com',
  base: previewBase,
  trailingSlash: 'ignore',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
