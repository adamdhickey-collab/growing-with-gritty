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

/* ——— Gritty's World: the game content (PLAN.md §5) ———
   Every interactive activity is just a collection: the game shells are built
   once, and Kim adds challenges through the same forms she uses for books. */

const scenarios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scenarios' }),
  schema: z.object({
    /* Challenges appear lowest number first. */
    order: z.number(),
    /* "Gritty is trying to build a tower… What should he do?" */
    situation: z.string(),
    choiceA: z.string(),
    choiceB: z.string(),
    choiceC: z.string(),
    /* Which choice shows grit. */
    answer: z.enum(['a', 'b', 'c']),
    /* Gritty's celebration when they pick it; falls back to the motto. */
    cheer: optionalString,
  }),
});

const mistakes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mistakes' }),
  schema: z.object({
    order: z.number(),
    /* The funny mistake: "…but it looks more like a potato!" */
    oops: z.string(),
    /* The flip side revealed by the big gold button; optional because the
       page has a friendly default ("Mistakes help my brain learn!"). */
    learned: optionalString,
  }),
});

const yetSentences = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/yet-sentences' }),
  schema: z.object({
    order: z.number(),
    /* Just the "I can't…" part — the site adds the big gold YET! */
    sentence: z.string(),
  }),
});

const calmStrategies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/calm-strategies' }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    emoji: optionalString,
    /* One step per line — the page turns lines into a numbered list, so a
       plain-text CMS field can never produce broken markdown. */
    steps: optionalString,
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

export const collections = {
  books, characters, printables, pages,
  scenarios, mistakes,
  'yet-sentences': yetSentences,
  'calm-strategies': calmStrategies,
};
