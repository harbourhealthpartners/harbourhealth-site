# CLAUDE.md — Harbour Health Partners website

Project guidance for Claude Code sessions on this repo. Read before editing.

## What this is

A static informational website for Harbour Health Partners (HHP), a family
medicine Collaborative Care Clinic in Saint John, New Brunswick. Plain HTML and
CSS. Hosted free on GitHub Pages at the custom domain harbourhealth.ca (registered
and DNS-hosted at GoDaddy). No build step, no framework required.

Clinic email is on a separate domain, harbourhealthpartners.ca (Hushmail; DNS
currently hosted by Wix). Do not touch that domain's MX/SPF/DKIM/DMARC records.
See `domain-dns-notes.md`.

The site is built. `source.md` is the content spec it was built from; keep it in
step if you change wording on a page.

Each page's footer has a "Page last revised" date. Update it on any page you change.

Clinical content (Staying Healthy, cervical screening) follows New Brunswick programs
first, then Canadian Task Force recommendations, with a conservative approach. Cite
sources on the page. Physician sign-off is required before changing it.

Layout: one HTML file per page at the repo root, shared styles in `css/style.css`
(colour variables at the top), menu behaviour only in `js/main.js`, images in
`images/`. Each page carries its own copy of the header and footer, so a change
to contact details or navigation must be applied to every `*.html` file — grep
first.

## Before editing (two editors share this repo)

Run `git pull` at the start of every session, and `git fetch && git status`
before touching a file if the local copy may be stale. GitHub holds the
authoritative version; the local folder may not. See README.md for the full
workflow and branch/PR instructions.

## Hard rules (do not break)

- **No patient data on this site, ever.** Do not add intake forms, contact forms,
  or any field that collects symptoms, health history, or personal health
  information. New Brunswick's health privacy law (PHIPAA) applies the moment
  health information is collected. For booking, link out to the Accession portal.
  For finding a doctor, link to NB Health Link. Never build an on-site form that
  captures health details.
- **No COVID-19 content beyond the vaccine.** The COVID-19 vaccine may be listed with
  the other vaccines (Staying Healthy page, and the Additional Services note that the
  clinic doesn't stock it). No COVID page, callout, or masking banner.
- **Policies page stays a placeholder** until the clinic manager populates it.
- **No X/Twitter link.** The clinic's account was removed from the site deliberately.
- **Nursing staff are described as "nurses," not RNs.** RNs and LPNs work to a similar
  scope here; do not reintroduce the RN/LPN distinction.
- **Local images only.** Use files in `images/`. Do not hotlink Wix-hosted images
  (static.wixstatic.com, filesusr.com); those URLs will stop working.

## Key links (keep current)

- Online booking: https://nb001.myaccession.com/booking/
- Find a family doctor (NB Health Link): https://nbhealthlink.ca/pages/registration/

## Contact details (appear in footer on every page)

- 723 Millidge Avenue, Saint John, NB E2K 2N7
- Phone 506-645-8888 · Fax 506-645-1094

## Physicians (names only, no photos for now)

Dr. Josh Tracey, Dr. Tracy Gallant, Dr. Ben Knight, Dr. Taryn O'Neill,
Dr. Rob Hanlon, Dr. Carol Morriscey.
(Headshots for Tracey and Gallant are in `images/` but not currently used.)

## Style

Clean, professional, trustworthy, easy to read for all ages. Mobile-friendly and
accessible (good contrast, real alt text, keyboard-navigable). Use the clinic
logo (`images/`); draw the palette from it (teal and blue). Keep it simple over
flashy.

## Deploy

Repo: `harbourhealthpartners/harbourhealth-site` (a GitHub organization). Commit
as the clinic account **HarbourManager**, never a personal GitHub account; this
repo's local git config sets that identity (`git config user.email` should be
the HarbourManager noreply address). With more than one `gh` login, run
`gh auth switch --user HarbourManager` before pushing.

Commit to `main`; GitHub Pages republishes automatically. Test the live github.io
URL before pointing the custom domain.

## Collaborators

Two editors work on this repo via Claude Code: the practice lead and the clinic
manager (who maintains the Policies page). To avoid overwriting each other,
coordinate who's editing, or work on a branch and review before merging to
`main`.
