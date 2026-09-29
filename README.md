# Mechanic Do — Millwright Services website

A fast, single-page marketing site for an industrial millwright business, built around
the three services you're starting with: **preventive maintenance**, **breakdown
maintenance**, and **shift coverage**. Positioned for the **GTA** first, with a visible
expansion path to the rest of Ontario, Canada, and the US.

Plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies.
The design is an engineering drawing: drafting-paper grid, section-cut markers,
dimension-line callouts, a bill-of-materials capabilities list, a schematic
service-area plan, and a title-block footer.
Open `index.html` in a browser and it works.

---

## ⚠️ Before you publish — edit these

Contact details on the site — all real and live:
(Every claim on the page — licensing, insurance, 24/7 dispatch, response targets,
cancellation terms, industries — has been confirmed by the owner.)

| What | Placeholder in the code | Where |
|---|---|---|
| Phone number | `(437) 881-7808` / `+14378817808` (live) | `index.html`, `404.html`, `assets/js/main.js` |
| Email | `dispatch@mechanicdo.ca` | `index.html`, `assets/js/main.js` |
| Site URL | `https://mechanicdo.ca/` (live) | `CNAME`, `index.html` (canonical, Open Graph, JSON-LD), `robots.txt`, `sitemap.xml` |
| Business name | `Mechanic Do Millwright Services` | `index.html`, `404.html`, `README.md` |
| Office hours | `Mon–Fri 5 pm–midnight · Sat–Sun 6 am–midnight` (confirmed) | `index.html` (contact list) |

To change the phone number later, replace both spellings everywhere:

```bash
sed -i 's/(437) 881-7808/(NEW) NEW-NUMB/g; s/+14378817808/+1NEWNUMBER/g; s/+1-437-881-7808/+1-NEW-NEW-NUMB/g' index.html 404.html assets/js/main.js
```

---

## Making the quote form actually send

Out of the box the form validates, then opens the visitor's email app with everything
pre-filled. That works on day one with zero setup, but it loses people who don't have
a mail client configured.

For real submissions, sign up with a form service (Formspree, Formsubmit, Basin,
Getform — all have free tiers), then set one line at the top of `assets/js/main.js`:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_ID';
var CONTACT_EMAIL = 'dispatch@mechanicdo.ca';
```

The form POSTs JSON, shows a success message, and falls back to a "call us" message
if the request fails. The hidden `company_website` field is a honeypot — leave it in,
it quietly eats a lot of bot spam.

---

## Publishing it

**GitHub Pages** (free, no account beyond GitHub) — the site is already on `main`:
1. Repo → **Settings** → **Pages** → Source: *Deploy from a branch* → `main` / `/ (root)` → **Save**.
2. Wait about a minute. The site goes live at `https://tlaba.github.io/mechanicdo/` (now redirects to `https://mechanicdo.ca/`).
3. When you have the domain: same page, **Custom domain**, then add a `CNAME`
   record at your registrar pointing `www` at `tlaba.github.io`. For the bare
   domain (`mechanicdo.ca` with no `www`) add four `A` records instead, pointing at
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`
   (confirm those against GitHub's current "Managing a custom domain" docs before
   you type them in — GitHub has changed them before).
   Tick **Enforce HTTPS** once the certificate is issued.

> **Custom domain:** `mechanicdo.ca` is connected through the `CNAME` file in the repo root
> (don't delete it). DNS lives at Namecheap: four `A` records on `@` pointing at GitHub, a
> `CNAME` on `www` pointing at `tlaba.github.io`, and `mechanicdo.com` redirecting to the `.ca`.

**Netlify / Cloudflare Pages / Vercel:** connect the repo, leave the build command
empty, set the publish directory to `/`. Done.

Because there's no build step, you can also just drag the folder into Netlify Drop.

---

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly works too — the server just makes `/`-rooted paths in
`404.html` behave.)

---

## What's in here

```
index.html              The whole site — every section lives here
404.html                Not-found page (GitHub Pages picks this up automatically)
assets/css/styles.css   All styling, organised by section, responsive + print styles
assets/js/main.js       Nav, scroll effects, form validation and submission
assets/fonts/           Self-hosted Archivo + Martian Mono (variable woff2, OFL)
assets/img/favicon.svg  Browser tab icon
assets/img/og-image.svg Social sharing card artwork (see note below)
robots.txt, sitemap.xml Search engine basics — update the domain
.nojekyll               Tells GitHub Pages to serve the files as-is
```

### Page sections

1. **Hero** — headline, dual CTA (quote / call), trust strip, and a "line down right now?" dispatch card
2. **Services** — the three offerings, each with a concrete "what's included" list
3. **Capabilities** — equipment, millwright work, and industries, so buyers self-qualify
4. **Coverage** — GTA cities today plus a three-stage expansion roadmap (Ontario → Canada → US)
5. **How it works** — four steps from first call to written report
6. **Why Mechanic Do** — differentiators aimed at maintenance managers
7. **FAQ** — the objections that come up before someone calls
8. **Quote** — contact details and the request form

### Social sharing image

`assets/img/og-image.svg` is the artwork. Facebook and LinkedIn don't reliably render
SVG previews, so export a **1200×630 PNG** and switch the two meta tags in `index.html`
back to `og-image.png`:

```bash
# any of these work
rsvg-convert -w 1200 -h 630 assets/img/og-image.svg -o assets/img/og-image.png
# or: open the SVG in a browser at 1200x630 and screenshot it
```

---

## Growing the site later

The single-page structure is deliberate — it converts well and it's easy to maintain.
When you're ready for more, the natural next steps are:

- **City landing pages** (`/millwright-services-mississauga/`) — the biggest local-SEO
  lever, one page per city you actually want work in
- **A Google Business Profile** — for most local trades this outperforms the website
  itself for phone calls
- **Case studies** — "packaging line down 14 hours → running in 5" beats any adjective
- **Region switching** — when the US launch happens, the coverage section and the
  schema.org `areaServed` block are the two places that need to change

---

## Editing tips

- The colour palette lives in custom properties at the top of `styles.css`: paper,
  ink, annotation cyan, blueprint plate, and redline (the CTA / emphasis colour).
- Sections are separated by clear comment banners in both `index.html` and `styles.css`.
- Every section is a `<section id="...">`, so nav links, anchors, and the scroll-spy
  all keep working if you reorder them.
