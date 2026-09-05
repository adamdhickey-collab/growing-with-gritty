/* Schema.org JSON-LD builders.
 *
 * This is how a search engine or an AI assistant learns what a page *is*
 * rather than guessing from prose: that Kim is the author, that these four
 * things are books with an age range and somewhere to buy them, that the
 * site belongs to her. Rendered by Base.astro via its `jsonLd` prop.
 *
 * Everything here restates facts the page already shows a human. Nothing is
 * asserted that a visitor cannot see for themselves — structured data that
 * disagrees with the visible page is worse than none, and search engines
 * treat the mismatch as a reason to distrust the rest.
 */

/** Absolute URL for a site-relative path. JSON-LD must not use relatives. */
const abs = (site: URL | undefined, path: string) => new URL(path, site).href;

/** Kim, referenced by every page that needs an author or a creator. */
export function person(site: URL | undefined) {
  return {
    '@type': 'Person',
    '@id': abs(site, '/about/#kim'),
    name: 'Kim Rekowski',
    jobTitle: ['Elementary teacher', "Children's book author", 'Illustrator'],
    description:
      "Elementary teacher, children's book author and illustrator, and the creator of Gritty the Goat.",
    url: abs(site, '/about/'),
  };
}

/** The site itself. Goes on the home page only. */
export function website(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs(site, '/#website'),
    name: 'Growing with Gritty',
    alternateName: 'Gritty the Goat',
    url: abs(site, '/'),
    description:
      'Stories and activities that help kids build grit, kindness, and confidence — with Gritty the Goat, by teacher and author Kim Rekowski.',
    inLanguage: 'en-US',
    author: person(site),
    publisher: person(site),
  };
}

type BookData = {
  title: string;
  cover: string;
  ages: string;
  tagline: string;
  lesson: string;
  buyLink?: string;
};

/** One picture book. `ages` arrives as a display string like "4–10". */
export function book(site: URL | undefined, id: string, data: BookData) {
  const [min, max] = data.ages.split(/[–-]/).map((n) => n.trim());

  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': abs(site, `/books/${id}/#book`),
    name: data.title,
    url: abs(site, `/books/${id}/`),
    image: abs(site, data.cover),
    description: data.tagline,
    abstract: data.lesson,
    author: person(site),
    illustrator: person(site),
    inLanguage: 'en-US',
    bookFormat: 'https://schema.org/Paperback',
    isPartOf: {
      '@type': 'BookSeries',
      name: 'Gritty the Goat',
      url: abs(site, '/books/'),
    },
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: Number(min) || undefined,
      suggestedMaxAge: Number(max) || undefined,
    },
    ...(data.buyLink
      ? {
          offers: {
            '@type': 'Offer',
            url: data.buyLink,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };
}

/** Kim's own page. */
export function aboutPage(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: abs(site, '/about/'),
    mainEntity: person(site),
  };
}

/** The series index. */
export function bookSeries(site: URL | undefined, books: { id: string; title: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BookSeries',
    '@id': abs(site, '/books/#series'),
    name: 'Gritty the Goat',
    url: abs(site, '/books/'),
    description:
      'Four picture books about grit, friendship, healthy habits, and perseverance, for ages 4–10.',
    author: person(site),
    hasPart: books.map((b) => ({
      '@type': 'Book',
      name: b.title,
      url: abs(site, `/books/${b.id}/`),
    })),
  };
}
