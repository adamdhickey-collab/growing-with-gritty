# Domain setup — grittythegoat.com

The web address is decided. **grittythegoat.com** — this is Option B from
the deck's domain slide: Gritty gets its own address, and
`polkadotbackpack.com` is left completely alone.

## What's true today (checked 5 Sep 2026)

| Fact | Value |
| --- | --- |
| Registrar | **Squarespace Domains**, in Adam's account |
| Registered | 28 Aug 2026, expires 28 Aug 2027 |
| Nameservers | `gordon` / `mimi.ns.cloudflare.com` — moved 5 Sep 2026 |
| Apex serves | **The site.** Cloudflare Pages, live since 5 Sep 2026 |
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

### ✅ 4. Nameservers moved — DONE (5 Sep 2026)

Squarespace → Domains → grittythegoat.com → DNS → Domain Nameservers → **Use
custom nameservers**. Squarespace demands a fresh Google sign-in before it
will show the fields, which is easy to mistake for the page being broken.

All four `nsb*.squarespacedns.com` entries were replaced by the two
Cloudflare ones. Confirmed at the registry rather than by trusting the UI:

```bash
dig NS grittythegoat.com @a.gtld-servers.net +norecurse   # authority section
whois grittythegoat.com | grep -i "^name server"
```

Both show only `gordon` and `mimi`. No Squarespace nameserver was left
behind, which matters: a stray one would keep answering alongside Cloudflare
and visitors would get different results depending on which server they hit.

Cloudflare's own dashboard kept saying *"Waiting for your registrar to
propagate"* for a while after the delegation was already live. Trust `dig`,
not that banner.

### ✅ 5. Custom domains attached — DONE (5 Sep 2026)

Both `grittythegoat.com` and `www.grittythegoat.com` are on the Pages
project. Cloudflare replaced the imported Squarespace records itself:

| Was | Now |
| --- | --- |
| four apex `A` records → Squarespace | `CNAME @ → growing-with-gritty.pages.dev` |
| `CNAME www → ext-sq.squarespace.com` | `CNAME www → growing-with-gritty.pages.dev` |

Certificates were issued automatically, the apex within about a minute and
`www` about three minutes later. A failed TLS handshake on `www` in that gap
is normal and not worth debugging.

**One canonical address.** A redirect rule sends `www` to the apex, built
from the dashboard's own *Redirect from WWW to root* template with
**Preserve query string** turned on, so campaign links survive the hop.
Cloudflare warns that the rule "may not apply to your traffic" because it
cannot see a proxied `www` record; that is a false positive when `www` is a
Pages custom domain. Deploy it anyway. Do **not** accept the offer to create
a proxied DNS record, which would fight with the Pages domain.

Verified end to end:

```
http://grittythegoat.com/          → 301 → https://grittythegoat.com/
https://www.grittythegoat.com/x?q=1 → 301 → https://grittythegoat.com/x?q=1
https://grittythegoat.com/          → 200
```

### A trap right after the switch: your own browser lies

Confirmed on launch day. Minutes after the cutover, `curl` on the Mac
returned the real site from Cloudflare, an independent server elsewhere on
the internet returned the real site, and every public resolver returned the
Cloudflare addresses — while **Chrome on that same Mac kept showing the old
Squarespace placeholder**, including in freshly opened tabs.

Nothing was wrong with the site. Chrome keeps its own address cache and its
own open connections for the life of the process, and may resolve through
its own "Secure DNS" provider rather than the network's.

So do not debug DNS from the browser you have been using all along:

```bash
curl -sI https://grittythegoat.com/ | grep -i "^server"   # expect: cloudflare
dig +short grittythegoat.com @1.1.1.1
```

The fastest human check is a **phone with wifi turned off** — a different
network and resolver entirely. That is what confirmed this launch.

To clear a stuck Chrome: quit fully with Cmd+Q (closing the window is not
enough), then `chrome://net-internals/#dns` → Clear host cache, and check
`chrome://settings/security` for Secure DNS. On macOS,
`sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.

First-time visitors were never affected. Only resolvers that had looked the
domain up *before* the switch held the placeholder, and Squarespace's old
records carried a four-hour TTL, so stragglers cleared themselves.

### 6. Only then, let it be found — NOT DONE, deliberately

`site/site.config.mjs` → flip `indexable` to `true`. That drops the
`noindex` tag from every page. Then request indexing in Google Search
Console rather than waiting for an organic recrawl.

**The site is live but every page still carries `noindex, nofollow`.** That
is the intended state: the address works for anyone Kim hands it to, and
search engines stay out until the look is settled. This is the last switch
and the hardest to walk back — getting a site *out* of an index is far more
work than getting it in.

## The gate before launch

**The coloring illustrations landed on 5 Sep 2026** (commit `535802f`),
which was the trigger Adam named. Three sheets ship as PDFs, and their
printed footer reads `grittythegoat.com` — the generator derives the
address from `astro.config.mjs` rather than repeating it, so it cannot go
stale in a drawer. Verified: the PDFs were rendered 44 seconds after the
config changed, so they carry the real address and not the dead one.

**The site went live at https://grittythegoat.com on 5 Sep 2026.** Steps 1
through 5 are done. What is still outstanding:

- **Kim has not picked a style tile direction.** Everything downstream of
  that pick can still change, so opening the site to search now means
  indexing a look that may be replaced. This is why step 6 is still off.
- **AI crawler settings were left at Cloudflare's defaults** on the zone,
  which currently permits training crawlers on a site whose whole value is
  Kim's original drawings. Adam's call; flagged, not changed.
- **The Squarespace parking page still exists** behind the scenes. Nothing
  points at it any more, so it is cosmetic rather than urgent.

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
