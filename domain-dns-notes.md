# Domain & DNS notes — Harbour Health Partners

Investigated 2026-09-23 from public DNS (registry delegation, authoritative
nameservers, and 1.1.1.1 / 8.8.8.8 all agree). This replaces an earlier draft
that assumed DNS was on Cloudflare. It isn't.

## Summary

The clinic has **two domains**, both registered at GoDaddy, doing different jobs:

| | harbourhealth.ca | harbourhealthpartners.ca |
|---|---|---|
| Registrar | GoDaddy (registrant: Harbour Health Partners Inc.) | GoDaddy (registrant redacted) |
| Expires | 2028-07-11 | **2027-07-16** |
| DNS hosted by | **GoDaddy** (ns55/ns56.domaincontrol.com) | **Wix** (ns8/ns9.wixdns.net) |
| Email | **None** (no MX) | **Hushmail**, e.g. management@harbourhealthpartners.ca |
| Website | Broken: GoDaddy IP showing a Cloudflare "Error 1001" page | Old Wix site, currently returning 404 |
| Planned use | New GitHub Pages site | Email (keep working!) |

**Where "Cloudflare" came from:** neither domain has a Cloudflare DNS zone, and
no Cloudflare account is needed. Both GoDaddy's hosting and Wix's CDN
(`cfd.wixdns.net` → Cloudflare IPs) sit behind Cloudflare, so error pages and
HTTP headers say `Server: cloudflare`. That's the provider's infrastructure, not
something the clinic has an account for.

## harbourhealth.ca (the new website)

### Current records (complete inventory: only two)

| Type | Name | Value |
|---|---|---|
| A | @ | 198.12.145.135 (GoDaddy; serves an error page) |
| CNAME | www | harbourhealth.ca |

No MX, SPF, DKIM, DMARC or other TXT. Zone unchanged since Dec 2019. There's
nothing on this domain to break.

### Target records (edit in GoDaddy → My Products → harbourhealth.ca → DNS)

| Type | Name | Value | Action |
|---|---|---|---|
| A | @ | 198.12.145.135 | Delete |
| A | @ | 185.199.108.153 | Add |
| A | @ | 185.199.109.153 | Add |
| A | @ | 185.199.110.153 | Add |
| A | @ | 185.199.111.153 | Add |
| CNAME | www | harbourhealthpartners.github.io | Change (was @) |
| TXT | _github-pages-challenge-harbourhealthpartners | *(value from the organization's Settings → Pages → Verified domains)* | Add (recommended) |
| TXT | @ | `v=spf1 -all` | Add (no mail sent from this domain) |
| TXT | _dmarc | `v=DMARC1; p=reject` | Add (blocks spoofed "clinic" email) |

Leave NS/SOA alone. If GoDaddy has a parked page or forwarding set up for the
domain, turn it off so it doesn't recreate its own A record.

Repo: harbourhealthpartners/harbourhealth-site (GitHub organization owned by
the clinic's HarbourManager account). Repo side (Claude): add `CNAME` file
containing `harbourhealth.ca`, set custom domain in Pages, then enforce HTTPS
once the certificate issues.

## harbourhealthpartners.ca (email: do not break)

### Current records (all visible in public DNS)

| Type | Name | Value |
|---|---|---|
| MX 10 | @ | plsmtp1.hushmail.com |
| MX 20 | @ | plsmtp2.hushmail.com |
| TXT | @ | `v=spf1 include:_spf.hushmail.com -all` |
| CNAME | hush._domainkey | _dkim.hushmail.com (DKIM) |
| TXT | _dmarc | `v=DMARC1; p=quarantine; pct=100` |
| A | @ | 185.230.63.107, 185.230.63.171, 185.230.63.186 (Wix) |
| CNAME | www | cdn3.wixdns.net (Wix) |

**Confirmed complete** against the Wix dashboard (Domains → harbourhealthpartners.ca
→ Manage DNS Records) on 2026-09-23: exactly these records, all TTL 1 hour
(NS 1 day), no SRV, no other TXT. Wix labels the domain "managed by a third
party" because it is registered at GoDaddy and only pointed at Wix by
nameservers; Wix still serves the DNS.

### The real risk: Wix holds the email domain's DNS

Email works today only because Wix is serving these records. **If the Wix plan
or the Wix domain connection is cancelled, Wix's nameservers stop answering and
Hushmail email breaks.** So before Wix is cancelled:

1. Export the full record list from Wix (above).
2. In GoDaddy's DNS for harbourhealthpartners.ca, recreate **every email
   record exactly**: both MX, the SPF TXT, the `hush._domainkey` CNAME, and
   `_dmarc`. Add the website records (below) at the same time.
3. Lower nothing and delete nothing at Wix yet. Then in GoDaddy switch the
   nameservers from `ns8/ns9.wixdns.net` back to GoDaddy's defaults.
4. Wait for propagation (up to 24–48 h; .ca delegation TTL is 24 h), then
   check with `dig MX harbourhealthpartners.ca +short` and send a test email in
   and out (check DKIM passes in the received headers).
5. Only then cancel Wix.

### What should harbourhealthpartners.ca's website do? (decision needed)

The old site's address is harbourhealthpartners.ca, and patients, Google and
printed materials may point there. Options:

- **Redirect it to harbourhealth.ca** (recommended). In GoDaddy, set domain
  forwarding (301) for harbourhealthpartners.ca → https://harbourhealth.ca.
  Forwarding only touches the web (A/www) records; confirm MX/TXT stay intact
  afterwards.
- Or make harbourhealthpartners.ca the site's main domain instead.

Also note harbourhealthpartners.ca **expires 2027-07-16**. Confirm auto-renew is
on in GoDaddy, because losing it loses the clinic's email.

## Quick re-check commands

```
dig NS harbourhealth.ca +short
dig A harbourhealth.ca +short
dig www.harbourhealth.ca +short
dig NS harbourhealthpartners.ca +short
dig MX harbourhealthpartners.ca +short
dig TXT harbourhealthpartners.ca +short
dig CNAME hush._domainkey.harbourhealthpartners.ca +short
```
