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
| **DNSSEC** | **On.** A DS record is published at the `.com` registry — see step 3 |

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

### ⚠️ 3. Turn DNSSEC OFF at Squarespace, then wait

**This is the step that will take the site down if it is skipped, and it is
the reason launch cannot be same-day.**

`grittythegoat.com` is DNSSEC-signed today. The `.com` registry publishes a
DS record pointing at Squarespace's signing key:

```
28519 8 2 1A20A4816C17C75D555B4C539F4DE8FA36BAEFD61A31473EEB0C9963542CC1CC
```

Move the nameservers while that DS record still stands and every validating
resolver — Google, Cloudflare, Quad9, most ISPs — will refuse to answer for
the domain. Not "wrong site": `SERVFAIL`, no site at all, for most of the
internet, until the registry record expires.

doorcountyfound.com has no DS record, which is why its move was painless.
This domain is not the same case.

So: **Squarespace → grittythegoat.com → DNSSEC → turn it off.** Then wait
for the registry to drop the record. Check with:

```bash
dig +short DS grittythegoat.com @a.gtld-servers.net
```

**Empty output is the green light.** The `.com` DS TTL is 86400, so allow
up to 24 hours. Re-enable DNSSEC from Cloudflare's side afterwards if
wanted; it is a one-click setting there.

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

## Known issue: pushes do not deploy themselves yet

Cloudflare shows *"This project is disconnected from your Git account"* on
the project, and it is not cosmetic. Commit `859379d` was pushed at 10:15
and no build had fired six minutes later. The only deployment so far is the
one the dashboard was told to run by hand.

Everything else about the wiring is correct — automatic deployments are
enabled, build watch paths are `*`, the branch is `main`, and the repository
does show as `adamdhickey-collab/growing-with-gritty`. It is the Git
authorization that is stale, not the configuration.

Fix: project → **Settings → Build → Git repository → Manage**, and
re-authorize. That is an OAuth grant against Adam's GitHub account, so it
needs Adam to click it.

**This must be fixed before launch**, or the live site silently freezes at
whatever commit was last deployed by hand — the worst kind of bug, because
the repo looks right and the site is simply old.

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
