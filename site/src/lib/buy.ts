/* Label for a book's buy button. Naming the store is kinder than a vague
 * "Buy the book" — but the CMS field is just "where to buy", so only claim
 * Amazon when the link really goes there. */
export function buyLabel(buyLink: string): string {
  try {
    const host = new URL(buyLink).hostname;
    if (/(^|\.)amazon\.[a-z.]+$/i.test(host)) return 'Buy on Amazon';
  } catch {
    /* not a parseable URL — fall through to the generic label */
  }
  return 'Buy the book';
}
