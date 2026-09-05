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
| **DNSSEC** | **Off since 5 Sep 2026.** Was on; turned off and confirmed clear — see step 3 |

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

**Do these in order.** The ordering below is not stylistic. Steps 1 and 2
are done; step 3 has a 24-hour lead time that is easy to miss.

### ✅ 1. Cloudflare Pages project — DONE (5 Sep 2026)

Project `growing-with-gritty`, live at **growing-with-gritty.pages.dev**.

| Setting | Value |
| --- | --- |
| Repository | `adamdhickey-collab/growing-with-gritty` |
| Production branch | `main` |
| Root directory | `site` |
| Build command | `npm run build` |
| Build output | `dist` |
| Environment variables | **none** — deliberately |

`PREVIEW_BASE` and `PUBLIC_TILES_URL` are left unset on purpose. They exist
only for the GitHub Pages review build; production serves from the domain
root with no base path and no version switcher.

### ✅ 2. Cloudflare zone — DONE (5 Sep 2026)

`grittythegoat.com` is added on the Free plan. The nameservers Cloudflare
assigned are the same pair doorcountyfound.com already uses:

```
gordon.ns.cloudflare.com
mimi.ns.cloudflare.com
```

The zone is **inactive** until step 4. Adding it changed nothing public.

Cloudflare imported the nine records Squarespace was serving: four apex `A`
records and a `www` CNAME pointing at the parking page, a `_domainconnect`
CNAME, and three TXT records. Keep the TXT trio —

```
_dmarc     v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s
_domainkey v=DKIM1; p=
@          v=spf1 -all
```

— they say "nothing may send mail as this domain," which is exactly right
while no mailbox exists, and they are what stops someone spoofing Kim.

### ✅ 3. DNSSEC off at Squarespace — DONE (5 Sep 2026)

**This was the step that would have taken the site down, and it is worth
understanding even now that it is finished.**

`grittythegoat.com` was DNSSEC-signed. The `.com` registry published a DS
record pointing at Squarespace's signing key:

```
28519 8 2 1A20A4816C17C75D555B4C539F4DE8FA36BAEFD61A31473EEB0C9963542CC1CC
```

Moving nameservers while that record stood would have made every validating
resolver refuse to answer. Not "wrong site": `SERVFAIL`, no site at all, for
most of the internet, until the registry record expired. doorcountyfound.com
has no DS record, which is why its move was painless. This domain was not
the same case.

Adam turned it off at **Squarespace → Domains → grittythegoat.com → DNS →
DNSSEC**, a single toggle. The registry dropped the record within minutes
rather than the day the TTL allows. Confirmed clear:

```bash
dig +short DS grittythegoat.com @a.gtld-servers.net   # empty
```

Google, Cloudflare, Quad9 and OpenDNS all report the domain unsigned and
still resolving. **The nameserver change is now safe to make.**

If DNSSEC is wanted again later, turn it on from Cloudflare's side once the
zone is active. Do not re-enable it at Squarespace.

### 4. Change the nameservers at Squarespace

Only once step 3 returns empty. Squarespace → Domains → grittythegoat.com →
DNS → Nameservers → replace the four `nsb*.squarespacedns.com` entries with
`gordon` and `mimi` above.

This is the moment the Squarespace parking page stops being served.
Propagation is usually minutes.

### 5. Attach the domain to the Pages project

**This cannot be done early.** Cloudflare refuses to attach a custom domain
whose zone is not active yet — it answers "you'll need to transfer your DNS
to Cloudflare" and stops. So it genuinely waits for step 4.

Pages project → Custom domains → add **both** `grittythegoat.com` and
`www.grittythegoat.com`, and redirect one to the other so there is a single
canonical address. Cloudflare writes the records and replaces the imported
Squarespace `A` records itself. HTTPS is automatic and free.

### 6. Only then, let it be found

`site/site.config.mjs` → flip `indexable` to `true`. That drops the
`noindex` tag from every page. Then request indexing in Google Search
Console rather than waiting for an organic recrawl.

## The gate before launch

**The coloring illustrations landed on 5 Sep 2026** (commit `535802f`),
which was the trigger Adam named. Three sheets ship as PDFs, and their
printed footer reads `grittythegoat.com` — the generator derives the
address from `astro.config.mjs` rather than repeating it, so it cannot go
stale in a drawer. Verified: the PDFs were rendered 44 seconds after the
config changed, so they carry the real address and not the dead one.

What is still outstanding:

- **Kim has not picked a style tile direction.** Everything downstream of
  that pick can still change, so launching now means launching a look that
  may be replaced.
- **DNSSEC has to come off first**, and that has a lead time measured in
  hours, not minutes. See step 3.

Steps 1 and 2 are done and touched nothing the public can see. Step 4 is the
point of no return for the parking page. Step 6 is the actual launch.

## The deploy that would not fire, and why

Worth recording, because the symptom pointed away from the cause.

Cloudflare showed *"This project is disconnected from your Git account"* and
pushes did not build. Four commits and seventeen minutes went by with no
deployment; the only build was one run by hand from the dashboard.

Everything on the Cloudflare side looked right and was right — automatic
deployments enabled, build watch paths `*`, branch `main`, repository shown
as `adamdhickey-collab/growing-with-gritty`.

The actual cause was on GitHub. The **Cloudflare Workers and Pages** app is
installed with *Only select repositories*, and the only repository selected
was `door-county-found`. This repo was never granted, so the app never saw a
push and no webhook ever fired.

The misleading part: the repo **did** appear in Cloudflare's picker when the
project was created. That list comes from the user's OAuth token, which can
see every repo. Whether the *app installation* can see it is a separate
grant, and that is the one that drives deployments.

Fixed 5 Sep 2026 by adding this repo to the installation at
**github.com/settings/installations → Cloudflare Workers and Pages →
Repository access**, keeping the narrow *Only select repositories* scope.

If deployments ever stall again, check that grant first. It is not visible
anywhere in the Cloudflare dashboard.

## Already done in the repo

- `site/astro.config.mjs` → `site: 'https://grittythegoat.com'`
- `site/scripts/lib/make-printable.mjs` derives the printed footer from that
  config. Worth keeping that way: a PDF outlives the page it came from, and
  a second copy of the domain here would go stale with no build to catch it.
  After any domain change, re-run `npm run printable` for each sheet.

`deck/build-deck.js` still asks the old open question about
`polkadotbackpack.com`. That deck was presented on its own date and is left
as it was rather than rewritten after the fact.

## Email, if Kim ever wants it

Nothing receives mail at this domain today. Once the zone is on Cloudflare,
**Email Routing** is free forwarding to an existing Gmail, about five
minutes. Sending *as* the address needs Gmail's "send mail as" plus an SMTP
provider, or a paid mailbox.
