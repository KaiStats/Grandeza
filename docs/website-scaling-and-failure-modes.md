# Scaling and failure modes

What happens to grandeza.io under load, and what happens when each thing it
depends on goes away. Written August 2026 from a live audit of the deployed
site; re-check when the architecture changes.

## How this scales

The site is static files on Cloudflare's anycast edge. Horizontal scale is
Cloudflare's problem, not ours:

- **No origin server** — nothing to overload
- **No database** — no connection pool to exhaust
- **No compute** — no cold starts, no concurrency ceiling
- **No session state** — any point of presence can serve any visitor

There is no load balancer to configure and no autoscaling policy to tune,
because there is nothing behind the edge to balance across.

**The only quantity that grows with traffic is egress**, and one URL dominates
it: `/scan/start` returns 4.16 MB, which is **364× the median page**. See
`website-scan-audit-report.md` for why, and `scripts/self-host-images.py` for
the fix.

## Platform ceilings

| Constraint | Usage | Limit | Headroom |
|---|---|---|---|
| Files per deployment | 34 | 20,000 | very large |
| Largest single file | 4.16 MB | 25 MB | 20.8 MB |
| Builds per month (free) | ~34 per working session | 500 | ~14 sessions |
| Bandwidth | — | unmetered | — |

**The build quota is the one to watch.** Every push to the production branch
triggers a build. In the audit session, **9 of 34 commits (26%) touched nothing
under `public/`** — CI config, docs, scripts — and each still consumed a build
to deploy an identical site.

Fix: Cloudflare Pages → project → Settings → Builds & deployments → **Build
watch paths**, set to `public/*`. Commits that touch only `docs/`, `scripts/`
or `.github/` then skip the build entirely.

## Failure modes

| Dependency | If it fails | Site status |
|---|---|---|
| Cloudflare edge | DNS, CDN, TLS and hosting are all Cloudflare | **Total outage** |
| Cloudflare DNS | Domain stops resolving | **Total outage** |
| GitHub | Cannot deploy; the served site is untouched | Stays up |
| Higgsfield CloudFront | 19 hero and social images 404 | **Up but visibly broken** |
| Resend / AWS SES | Outbound mail stops | Unaffected |
| Porkbun | Inbound mail stops; domain renewal at risk | Up, mail dead |
| Google Analytics | No data collected; `consent.js` fails closed | Unaffected |

### The two worth acting on

**Cloudflare is four dependencies wearing one hat.** DNS, CDN, TLS and hosting
all sit with one vendor, so a bad day there is a total outage with no partial
degradation and no failover path. This is the right trade at our size — the
alternative is real complexity for a risk that materialises rarely — but it
should be a known, chosen risk rather than an assumed one.

**Higgsfield is the only dependency that fails visibly without failing
loudly.** Those images are served from a CDN we do not control, under no
contract, with no SLA and no purge access. If the URLs rotate, every hero
image and every social card breaks at once, monitoring stays green, and the
first report comes from a customer. `scripts/self-host-images.py` moves them
behind our own edge and removes the dependency.

## What changes when lead capture ships

Adding a `POST` endpoint changes every answer on this page. At that point there
is an origin, so there is something to overload, something to rate-limit, and
something that can be down while the CDN is up. Revisit this document then.
