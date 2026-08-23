// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://growingwithgritty.com',
  trailingSlash: 'ignore',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 4321,
  },
});
