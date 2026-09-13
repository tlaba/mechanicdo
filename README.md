# Mechanic Do — Millwright Services website

A fast, single-page marketing site for an industrial millwright business, built around
the three services you're starting with: **preventive maintenance**, **breakdown
maintenance**, and **shift coverage**. Positioned for the **GTA** first, with a visible
expansion path to the rest of Ontario, Canada, and the US.

Plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies.
Open `index.html` in a browser and it works.

---

## ⚠️ Before you publish — edit these

The site ships with **placeholder contact details and unverified claims**. Go through
this list first; nothing here is a design decision, it's all business facts only you know.

| What | Placeholder in the code | Where |
|---|---|---|
| Phone number | `(647) 000-0000` / `+16470000000` | `index.html`, `404.html`, `assets/js/main.js` |
| Email | `dispatch@mechanicdo.ca` | `index.html`, `assets/js/main.js` |
| Domain | `https://mechanicdo.ca/` | `index.html`, `robots.txt`, `sitemap.xml` |
| Business name | `Mechanic Do Millwright Services` | `index.html`, `404.html`, `README.md` |
| Office hours | `Mon–Fri 7:00–17:00` | `index.html` (contact list) |

Fast find-and-replace for the phone and email:

```bash
grep -rl '647) 000-0000\|+16470000000\|dispatch@mechanicdo.ca' . --exclude-dir=.git
# then, once you've eyeballed the list:
sed -i 's/(647) 000-0000/(416) 555-1234/g; s/+16470000000/+14165551234/g' index.html 404.html assets/js/main.js
```

### Claims to confirm or remove

These read as statements of fact to a customer and to a plant's procurement team.
Keep them only if they're true today; edit or delete them otherwise.

- **"Licensed 433A millwrights"** — hero trust strip, `index.html`
- **"WSIB covered & fully insured"** — hero trust strip, "Why Mechanic Do", FAQ
- **Response targets: "2–4 hrs" for contract customers, "same day" for new** — hero card, FAQ
- **"24/7/365 dispatch"** — top bar, hero, services, footer. Only promise the hours you'll actually answer.
- **"30 days' notice" cancellation** on PM agreements — FAQ
- **Industry list** in the Capabilities section — trim to what you've genuinely worked in.

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

**GitHub Pages** (free, no account beyond GitHub):
1. Push this branch and merge it to your default branch.
2. Repo → **Settings** → **Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Add your domain under **Custom domain**, and point a `CNAME` record at
   `<your-username>.github.io` with your registrar.

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

- The colour palette is six variables at the top of `styles.css` (`--amber` is the
  accent; change it once and the whole site follows).
- Sections are separated by clear comment banners in both `index.html` and `styles.css`.
- Every section is a `<section id="...">`, so nav links, anchors, and the scroll-spy
  all keep working if you reorder them.
