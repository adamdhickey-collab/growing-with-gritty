/* The page's one voice for screen readers.
 *
 * Base.astro renders a single, always-present, visually hidden polite live
 * region. Every game speaks through it. The alternative — putting
 * role="status" on the cheer, the nudge, the hint, and then flipping their
 * `hidden` attribute — is not announced reliably: a live region has to
 * exist in the accessibility tree first and *then* change, and an element
 * that appears with its text already in place is neither. This is how a
 * sighted kid's "Gritty's Grit Choice!" reaches a kid who can't see it.
 */
let region: HTMLElement | null = null;

export function announce(text: string): void {
  region ??= document.querySelector<HTMLElement>('[data-announcer]');
  if (!region) return;
  region.textContent = '';
  /* a beat between clear and set, so repeating the same message — the
     second wrong answer in a row — still registers as a change */
  window.setTimeout(() => { region!.textContent = text; }, 50);
}
