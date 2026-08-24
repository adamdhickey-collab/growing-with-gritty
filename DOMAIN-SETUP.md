# Domain setup — polkadotbackpack.com

Companion to the deck's domain slide. The deck asks Kim the questions; this
is the technical detail for whoever does the work.

## What's true today (checked 24 Aug 2026)

| Name | Resolves to | Almost certainly |
| --- | --- | --- |
| `polkadotbackpack.com` | `23.227.38.65` | **Shopify.** That is Shopify's documented IP for custom domains |
| `www.polkadotbackpack.com` | `23.92.26.113` | **Something else** — a different host from the apex |

So the domain is **already registered and already serving a live site**, and
apex and `www` point to different places. Nothing here should be changed
until we know what that store is and whether it stays.

*(This was DNS-only. The sandbox network policy blocked fetching the actual
pages, so what's rendered there is unconfirmed — open both in a browser.)*

## What we need from Kim

1. **Registrar** — where the domain was bought (GoDaddy, Namecheap, Google
   Domains/Squarespace, Shopify itself…). If Shopify manages it, DNS is
   edited inside Shopify admin, not at a registrar.
2. **Account access** — her login, or a screen-share where she drives.
3. **What the Shopify store is** and whether it's staying live.
4. **Email** — does anything currently receive mail at this domain
   (`kim@polkadotbackpack.com`)? **Ask before touching DNS.** Changing
   nameservers without carrying the MX records over silently breaks email,
   and it's the single most common way a domain move goes wrong.

## The decision, and what each costs

### Option A — Gritty takes the apex

`polkadotbackpack.com` → the book site · `shop.polkadotbackpack.com` → the store.

- Best if the store is minor, dormant, or the brand is really "Polka Dot
  Backpack = Kim's books."
- Requires reconfiguring the Shopify store to its new subdomain, and
  Shopify must be told about the domain change or it will keep claiming
  the apex.
- Any existing links/QR codes/printed material pointing at the apex now
  land on the book site instead of the store.

### Option B — the book site gets its own domain

Store keeps `polkadotbackpack.com` untouched; books live at e.g.
`growingwithgritty.com`.

- Zero risk to anything currently working. **This is the safe default** if
  the store is active or Kim is unsure.
- Costs the price of a second domain (~$12/yr).
- The repo already assumes this: `site/astro.config.mjs` has
  `site: 'https://growingwithgritty.com'`.

## Doing it: Cloudflare Pages custom domain

The site deploys from this repo via Cloudflare Pages (PLAN.md §10).

1. In the Cloudflare Pages project → **Custom domains** → **Set up a custom
   domain** → enter the hostname.
2. Cloudflare tells you which record to create. Two cases:
   - **Domain's nameservers already point at Cloudflare** → it creates the
     record itself. Nothing to do at the registrar.
   - **DNS stays at the current registrar** → add a `CNAME` from the
     hostname to `<project>.pages.dev`. For an apex, the registrar must
     support CNAME flattening / ALIAS / ANAME (most do now); if it doesn't,
     move nameservers to Cloudflare.
3. HTTPS is automatic and free — Cloudflare issues the certificate once the
   record resolves. Usually minutes; allow up to a few hours.
4. Add **both** apex and `www`, and set one to redirect to the other so the
   site has a single canonical address.

### If nameservers move to Cloudflare

Copy **every** existing record first — especially `MX` (email), and any
`TXT` used for SPF/DKIM or domain verification. Cloudflare's import scans
for common records but does not reliably catch everything.

## When the decision is made, change these

- `site/astro.config.mjs` → `site: 'https://<final-domain>'`
- `site/site.config.mjs` → flip `indexable` to `true` **only when the site
  is genuinely ready to be found**, then request indexing in Google Search
  Console rather than waiting for an organic recrawl.
- Cloudflare Pages → add the custom domain (above).
- Tell Google Search Console about the final domain.

## Email, if she wants it

If Kim wants `kim@polkadotbackpack.com` and doesn't have it already, the
cheapest good option once the domain is on Cloudflare is **Email Routing** —
free forwarding to her existing Gmail, about five minutes to set up. It
forwards only; sending *as* that address needs Gmail's "send mail as" with
an SMTP provider, or a paid mailbox (Google Workspace / Fastmail).

**Do not enable Email Routing on a domain whose existing MX records you
haven't checked** — it replaces them.
