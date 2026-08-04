# Incident response and recovery

The plan `/security` says we maintain. Written August 2026 during the
thirteen-layer audit, and grounded in an incident that actually happened
rather than a template.

Two rules before anything else:

1. **Containment beats diagnosis.** Get the site correct first, understand why
   second. A rollback takes one click and can be undone.
2. **Anyone can declare an incident.** Nobody needs permission.

---

## Recovery matrix — what survives what

| Asset | Held by | If that is gone |
|---|---|---|
| Site source | GitHub + local clones | Recoverable |
| Deployed site | Cloudflare deployment history | Redeploy from git |
| Scan app (4 MB) | git — on **3** branches | Recoverable |
| Guardo + villain art | git — growth-engine branch | Recoverable |
| **Hero & social images** | **Higgsfield CDN only** | **Permanently lost** |
| **DNS records (11)** | **Cloudflare only** | **Manual rebuild from memory** |
| DKIM private key | Resend only | Reissue, re-verify, mail pauses |
| Domain registration | Porkbun | Renewal-dependent |

**The two bold rows are the real exposure.** Everything else has a second copy
somewhere; those do not.

- **The images**: 19 files on a CDN we do not own, under no contract. If the
  URLs rotate they are gone and unreproducible. `scripts/self-host-images.py`
  fixes this permanently — it is the single highest-value recovery action
  available and takes about a minute.
- **The DNS records**: eleven records, including SPF, DKIM and DMARC, exist in
  exactly one place. Export them (Cloudflare → DNS → Records → **Export**) and
  commit the file. Rebuilding mail authentication from memory during an outage
  is not a plan.

---

## Runbooks

### Site is down or serving the wrong thing

1. Check `https://grandeza.pages.dev` — it bypasses DNS entirely.
   - **Loads correctly** → the problem is DNS or the custom domain, not the build.
   - **Also broken** → the problem is the deployment. Roll back.
2. **Roll back**: Cloudflare → Workers & Pages → `grandeza` → Deployments →
   pick the last good one → **Rollback**. Takes about a minute.
3. Only then work out what went wrong.

### DNS or domain resolution failure

Symptom: Error 1016, `NXDOMAIN`, or the site loading at `.pages.dev` but not
at `grandeza.io`.

1. Cloudflare → DNS → Records. You want exactly:
   - `grandeza.io` **CNAME** → `grandeza.pages.dev`, proxied
   - `www` **CNAME** → `grandeza.pages.dev`, proxied
2. Delete any leftover `AAAA` record pointing at `100::`. That is a Worker
   route placeholder, and it strands DNS when the Worker is deleted. **This
   exact failure took the site down during the audit.**
3. Confirm both custom domains read **Active** in the Pages project.

### Content has been replaced or lost

**Do not conclude something is gone until you have run this.** During the audit
the scan was declared unrecoverable, and a support ticket was nearly raised to
restore a deleted Cloudflare Worker. It was in git the whole time, on a branch
that had never been fetched.

```bash
git fetch --all --prune
git log --all --oneline -- '<path>'          # every commit touching it
for b in $(git branch -r | grep -v HEAD); do # every branch containing a string
  git grep -l '<distinctive string>' "$b" 2>/dev/null
done
```

Restore, then **prove** it byte-for-byte before declaring done:

```bash
git show <branch>:<path> > <target>
[ "$(git hash-object <target>)" = "$(git rev-parse <branch>:<path>)" ] && echo IDENTICAL
```

### Mail stops delivering

1. Resend dashboard — is the domain still `verified`?
2. Cloudflare DNS — `resend._domainkey`, and the `send` SPF/MX records intact?
3. Send a test to a Gmail account, open **Show original**, read `spf=` and
   `dkim=`. That names the failing mechanism directly.
4. If DMARC was tightened recently, that is the first suspect. Reverting
   `p=reject` to `p=quarantine` restores delivery while you diagnose.

### Suspected compromise

1. Rotate first, investigate second: Cloudflare API tokens, GitHub tokens,
   Resend API keys.
2. Cloudflare → Pages → Deployments. Any deployment you do not recognise?
3. `git log --all --since="7 days ago"` — any commit you did not author?
4. Roll back to the last known-good deployment.
5. Only then work out how they got in.

---

## The audit incident, and what it teaches

**What happened.** The scan at `/scan` and `/scan/start` was replaced by a
rebuilt version, and the Worker serving the original was then deleted.

| Phase | Reality |
|---|---|
| Detection | By the customer. Monitoring was green throughout. |
| Diagnosis | ~20 min, and reached the **wrong** conclusion — that no source existed |
| Escalation | Advised a Cloudflare support ticket. Wrong path entirely. |
| Actual fix | `git fetch --all` surfaced it on an unfetched branch, in a folder named `scan-recovery/` |
| Restore | Byte-for-byte, hash-verified, ~5 minutes once located |

**Three lessons, all now addressed except one.**

1. **Uptime monitoring cannot see this class of failure.** The HTML returned
   200 the entire time; the wrong content was being served successfully. The
   error reporting added in Layer 12 catches resource failures, but *wrong
   content* is only caught by the CI fingerprint check on the scan.
2. **Unfetched branches are invisible branches.** Thirteen remote branches had
   never been pulled locally. `git fetch --all` should be the first command of
   any recovery, not the last.
3. **Nothing recorded where the scan's source of truth lived.** This document
   and the recovery matrix above now do.

---

## Honest RTO and RPO

| Scenario | Recovery time | Data loss |
|---|---|---|
| Bad deployment | ~1 min (rollback) | none |
| Content lost from the working tree | ~5 min, if you check git first | none |
| DNS misconfiguration | ~5 min | none |
| Cloudflare outage | **Until Cloudflare recovers** — no failover exists | none |
| Higgsfield rotates image URLs | **Unrecoverable** until self-hosted | 19 images |

The Cloudflare row is the honest limit. DNS, CDN, TLS and hosting are all one
vendor, so their outage is a total outage with no partial degradation and
nothing to fail over to. That is an accepted trade at this size — but it is
accepted, not mitigated.

---

## What `/security` claims, and where this stands

The page states the plan is documented **and rehearsed**. This document makes
the first half true. The second half needs one tabletop exercise: pick a
runbook, walk it end to end without touching production, and note what was
wrong. Until that happens, the "rehearsed" claim is not yet supported — see
`website-full-audit-summary.md` for the other claims in the same position.
