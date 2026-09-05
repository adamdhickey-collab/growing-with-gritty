# Domain setup — grittythegoat.com

The web address is decided. **grittythegoat.com** — this is Option B from
the deck's domain slide: Gritty gets its own address, and
`polkadotbackpack.com` is left completely alone.

## What's true today (checked 5 Sep 2026)

| Fact | Value |
| --- | --- |
| Registrar | **Squarespace Domains**, in Adam's account |
| Registered | 28 Aug 2026, expires 28 Aug 2027 |
| Nameservers | `nsb1`–`nsb4.squarespacedns.com` — still Squarespace's |
| Apex serves | A Squarespace **"Coming Soon" parking page** |
| Apex `MX` | **None.** No email exists on this domain |
| `growingwithgritty.com` | Never registered. Does not resolve. Dead idea |

Two things follow from that table:

- There is **nothing to break.** The only thing live is Squarespace's own
  placeholder, and no mail flows through the domain. This is the easy case —
  the caution in the old version of this file was about a live Shopify store
  on a different domain, and it no longer applies.
- The domain is **not yet pointed at anything we control.** Nameservers
  still belong to Squarespace, so DNS is edited in Squarespace, not
  Cloudflare, until step 2 below.

## The pattern to copy: doorcountyfound.com

Its DNS is already the exact shape this domain needs, so use it as the
reference rather than inventing anything:

- Registered at **Squarespace** (same account, same as this domain)
- Nameservers **delegated to Cloudflare** (`gordon` / `mimi.ns.cloudflare.com`)
- Served from **Cloudflare** on both apex and `www`

So: registrar stays Squarespace, DNS moves to Cloudflare, hosting is
Cloudflare Pages. Nothing is transferred and nothing is bought.

## Going live — the order matters

**Do these in order.** Step 3 before step 2 takes the domain dark, because
changing nameservers to a Cloudflare zone that does not exist yet means
nothing answers for the domain.

### 1. Cloudflare Pages project

Cloudflare dashboard → Workers & Pages → Create → Pages → connect to
`adamdhickey-collab/growing-with-gritty`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `site` |
| Build command | `npm run build` |
| Output directory | `dist` |

Leave `PREVIEW_BASE` and `PUBLIC_TILES_URL` **unset**. Those two exist only
for the GitHub Pages review build; production serves from the domain root
with no base path and no version switcher.

Confirm the `*.pages.dev` URL builds and looks right before going further.

### 2. Add the zone to Cloudflare

Cloudflare → Add a site → `grittythegoat.com` → Free plan. Cloudflare scans
the existing DNS and hands back two assigned nameservers.

There is nothing worth importing here — no MX, no SPF/DKIM, just the
parking page's records — but read the scan results rather than assuming.

### 3. Change the nameservers at Squarespace

Squarespace → Domains → grittythegoat.com → DNS → Nameservers → switch from
Squarespace's defaults to the two Cloudflare gave you.

This is the one irreversible-feeling step, and the moment the Squarespace
parking page stops being served. Propagation is usually minutes; allow up
to a few hours.

### 4. Attach the domain to the Pages project

Pages project → Custom domains → add **both** `grittythegoat.com` and
`www.grittythegoat.com`, and redirect one to the other so there is a single
canonical address. With the zone on Cloudflare, the records are created for
you and the apex works without any CNAME-flattening worry.

HTTPS is automatic and free once the records resolve.

### 5. Only then, let it be found

`site/site.config.mjs` → flip `indexable` to `true`. That drops the
`noindex` tag from every page. Then request indexing in Google Search
Console rather than waiting for an organic recrawl.

**Do not flip this until the site is genuinely ready** — see the gate below.

## The gate before any of this

The site is not ready to launch. Two things are outstanding:

- **The coloring illustrations are not in.** `PLAN.md` §"assets" still has
  them unchecked, and `/grown-ups` currently tells visitors in as many
  words that Kim is still making them. Launching now ships a page that
  advertises a dead end. This is the trigger Adam named: live *once the
  coloring illustrations are in*.
- **Kim has not picked a style tile direction.** Everything downstream of
  that pick can still change.

Steps 1 and 2 are safe to do early — they touch nothing the public sees, and
having the Pages build proven ahead of time makes launch day boring. Step 3
is the point of no return for the parking page. Step 5 is the actual launch.

## Already done in the repo

- `site/astro.config.mjs` → `site: 'https://grittythegoat.com'`
- `site/scripts/lib/make-printable.mjs` → the footer printed on every
  printable now reads `grittythegoat.com`. This one matters: it is stamped
  onto the coloring pages themselves, so it had to be right *before* they
  are generated, not after they are on someone's fridge.

`deck/build-deck.js` still asks the old open question about
`polkadotbackpack.com`. That deck was presented on its own date and is left
as it was rather than rewritten after the fact.

## Email, if Kim ever wants it

Nothing receives mail at this domain today. Once the zone is on Cloudflare,
**Email Routing** is free forwarding to an existing Gmail, about five
minutes. Sending *as* the address needs Gmail's "send mail as" plus an SMTP
provider, or a paid mailbox.
