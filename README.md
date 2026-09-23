# harbourhealth.ca — Harbour Health Partners website

Static informational website for Harbour Health Partners, a family medicine
Collaborative Care Clinic at 723 Millidge Avenue, Saint John, NB.

Plain HTML and CSS. No build step, no framework, no dependencies. Hosted on
GitHub Pages.

## Files

```
index.html                 Home
before-you-visit.html      Before You Visit
schedule-urgencies.html    Schedule & Urgencies
additional-services.html   Additional Services
patient-resources.html     Patient Resources
faq.html                   FAQ
policies.html              Policies (placeholder — clinic manager owns this page)
contact.html               Contact
404.html                   Not-found page
css/style.css              All styling (colours are CSS variables at the top)
js/main.js                 Menu behaviour only; the site works without it
images/                    Logo, favicon, photos
source.md                  Content spec the site was built from
CLAUDE.md                  Instructions for Claude Code sessions on this repo
```

Every page carries its own copy of the header and footer. If you change a phone
number, a link or a nav item, change it in **all** pages — grep for the old value
first:

```bash
grep -rn "645-8888" *.html
```

## Editing locally

Preview before you commit:

```bash
cd harbourhealth-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Two editors — read this before you start

Two people edit this repo (the practice lead and the clinic manager), often
through Claude Code. GitHub keeps the authoritative copy. **Your local folder can
be out of date, and overwriting the other person's work is easy to do by
accident.**

Always start a session by pulling the current version:

```bash
git pull
```

If you have been away from the repo for a while, or you are not sure whether
your copy is current, check before editing anything:

```bash
git fetch
git status          # "Your branch is behind" means pull first
git log --oneline -10   # what changed recently, and who changed it
```

Safer still, work on a branch and merge after a look:

```bash
git checkout -b policies-update
# ...edit...
git add -A && git commit -m "Add cancellation policy"
git push -u origin policies-update
# open a pull request on GitHub, review, then merge into main
```

If a `git pull` reports a conflict, do not force anything — call or message the
other editor and sort out which version is right.

**If you are asking Claude Code to make a change:** tell it to pull and check the
live site's current content first, rather than trusting whatever is in the local
folder.

## Temporary notices

An amber "under construction" bar sits at the top of every page. To take it down:
delete the block marked `<!-- TEMPORARY: under-construction notice. -->` from each
`*.html` file, and the `.construction` rules at the end of `css/style.css`.

```bash
grep -ln "class=\"construction\"" *.html   # which pages still have it
```

While it is up, keep its date current — it is the same line in every file.

## Publishing

1. Commit to `main` and push. GitHub Pages republishes automatically, usually
   within a minute or two.
2. Check the live `*.github.io` URL.
3. Only once that looks right, point the `harbourhealth.ca` DNS at GitHub Pages
   and add a `CNAME` file containing `harbourhealth.ca`.

## Rules that do not bend

- **No patient data is ever collected on this site.** No intake forms, no contact
  forms, no symptom or health-history fields. New Brunswick's PHIPAA applies the
  moment health information is collected. Booking goes out to the Accession
  portal; new-patient registration goes to NB Health Link.
- **No COVID-19 content.** It was removed deliberately.
- **Local images only** (`images/`). Never hotlink Wix-hosted files
  (static.wixstatic.com, filesusr.com) — those URLs will stop working.

See `CLAUDE.md` for the full guidance given to Claude Code sessions.
