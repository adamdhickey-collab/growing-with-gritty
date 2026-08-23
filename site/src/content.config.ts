import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Editors work through Pages CMS, which may write null or omit optional
   fields entirely — every optional field must tolerate null/undefined so a
   half-filled form can never break the build. (Rule inherited from Door
   County Found, where it earned its keep.) */
const optionalString = z.string().nullish();

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    /* 1, 2, 3, 4 — the series order; drives sorting everywhere. */
    order: z.number(),
    cover: z.string(),
    ages: optionalString,
    /* One line under the title on cards. */
    tagline: optionalString,
    /* "What did Gritty learn?" — the takeaway box on the book page. */
    lesson: optionalString,
    /* Character ids (file names in src/content/characters). */
    characters: z.array(z.string()).nullish().transform((v) => v ?? []),
    /* Where to buy. Optional so the site never blocks on a missing link —
       the button simply doesn't render until Kim pastes one in. */
    buyLink: z.string().url().nullish(),
    /* A "grit challenge" question families can talk about after reading. */
    challenge: optionalString,
    /* A printable id (file name in src/content/printables) to feature as
       this book's activity sheet. */
    activitySheet: optionalString,
  }),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/characters' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    /* Kim's art. Optional: cards show a friendly "portrait coming soon"
       frame until her drawing is scanned — never stand-in or generated art. */
    portrait: optionalString,
    /* One line under the name: "The little goat with big grit". */
    role: optionalString,
  }),
});

const printables = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/printables' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum([
      'coloring-page', 'discussion-cards', 'calm-down-cards', 'poster',
      'journal', 'certificate', 'book-guide', 'classroom-activity',
    ]),
    /* Who it's for — drives the Grown-Up Grit Guide sections. */
    audience: z.enum(['kids', 'parents', 'teachers', 'everyone'])
      .nullish().transform((v) => v ?? 'everyone'),
    /* The PDF itself, uploaded through the CMS. */
    download: z.string(),
    thumb: optionalString,
  }),
});

/* Long-prose singleton pages (about). One markdown file each so Pages CMS
   gives Kim a single form with a big text area, and the site renders real
   markdown. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    headshot: optionalString,
    photo: optionalString,
    photoCaption: optionalString,
  }),
});

export const collections = { books, characters, printables, pages };
