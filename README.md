# Mechanic Do — Millwright Services website

A fast marketing site for an industrial millwright business, built around
four services: **preventive maintenance**, **breakdown maintenance**, **shift
coverage**, and **maintenance management** (work orders, PM programs, planning and
the CMMS behind them). Hands-on work is positioned for **Toronto and the GTA**, with a
visible expansion path to the rest of Ontario, Canada, and the US. Maintenance planning
is done remotely, so it's sold to plants **anywhere in Canada and the US** today.

Two pages:

- `/` (`index.html`): the main site, aimed at GTA plants.
- `/maintenance-planning/`: a landing page for remote maintenance planning, aimed at
  plants across Canada and the US.

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
| Phone number | `(437) 881-7808` / `+14378817808` / `+1-437-881-7808` (live) | `index.html`, `maintenance-planning/index.html`, `404.html`, `assets/js/main.js` |
| Email | `dispatch@mechanicdo.ca` | `index.html`, `maintenance-planning/index.html`, `assets/js/main.js` |
| Site URL | `https://mechanicdo.ca/` (live) | `CNAME`, both pages (canonical, Open Graph, JSON-LD), `robots.txt`, `sitemap.xml` |
| Business name | `Mechanic Do Millwright Services` | `index.html`, `maintenance-planning/index.html`, `404.html`, `README.md` |
| Office hours | `Mon–Fri 5 pm–midnight · Sat–Sun 6 am–midnight` (confirmed) | `index.html` (contact list **and** `openingHoursSpecification` in the JSON-LD), `maintenance-planning/index.html` (the "Office hours" row and FAQ Q2), and your Google Business Profile |

Keep the name, phone number and hours identical everywhere, including Google Business
Profile and any directory listings. Google cross-checks them, and mismatches cost local
ranking.

To change the phone number later, replace all three spellings everywhere:

```bash
sed -i 's/(437) 881-7808/(NEW) NEW-NUMB/g; s/+14378817808/+1NEWNUMBER/g; s/+1-437-881-7808/+1-NEW-NEW-NUMB/g' index.html maintenance-planning/index.html 404.html assets/js/main.js
```


### PEMAC credential wording

What the owner holds, and how the site words it:

- **Awarded:** PEMAC's Maintenance Work Management and Maintenance Strategy Development
  **Certificates of Achievement**: hero note 5, the "Certificates" row on the B4 sheet,
  and FAQ Q7.
- **Completed:** MMP Module 7, described as "maintenance information management and CMMS"
  because PEMAC renamed that module, and the older title was "Computerized Maintenance
  Management Systems".
- **In progress:** the full Maintenance Management Professional (MMP) program: hero
  note 6, the "In progress" row on B4, and FAQ Q7.

The remote-planning page repeats the same three facts in its hero "Credentials" notes
(3–6), the "Detail D" table, and FAQ Q3.

Never shorten any of this to "MMP" or "certified" until PEMAC awards the MMP designation.
Once it's awarded, update every "In progress" / "Completing" line on both pages to
"PEMAC Maintenance Management Professional (MMP)", and put the matching FAQ answers
(Q7 on the home page, Q3 on the planning page) in the past tense:

```bash
grep -n "Maintenance Management Professional\|Completing\|finishing" index.html maintenance-planning/index.html
```

---

## Quote form

The form posts to Formspree (`https://formspree.io/f/mrpbjlrz`, set at the top of
`assets/js/main.js` as `FORM_ENDPOINT`). Formspree emails each request to
dispatch@mechanicdo.ca, which forwards to Gmail. The subject line names the company
and city, and Reply goes straight to the customer. The free plan covers about 50
submissions a month. If a send fails, the visitor is told to call or email instead.
Clear `FORM_ENDPOINT` to fall back to opening the visitor's email app.

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

Use the server rather than opening the files directly: links between the two pages point
at folders (`maintenance-planning/`, `../`), and only a web server turns a folder into its
`index.html`.

---

## What's in here

```
index.html                    Main site (GTA): every home-page section lives here
maintenance-planning/         Remote maintenance planning landing page (Canada & US)
404.html                      Not-found page (GitHub Pages picks this up automatically)
assets/css/styles.css         All styling for both pages, organised by section
assets/js/main.js             Nav, scroll effects, form validation and submission
assets/fonts/                 Self-hosted Archivo + Martian Mono (variable woff2, OFL)
assets/img/favicon.svg        Browser tab icon (the source for the PNG icons)
assets/img/icon-192.png       Icon for Android and for Google's search results
assets/img/apple-touch-icon.png  iPhone home-screen icon (180×180)
favicon.ico                   Fallback icon for crawlers and old browsers (32 + 48 px)
assets/img/og-image.png       Social sharing card, 1200×630 (made from brand/og.html)
brand/                        Logo, Google Business cover, and the sharing-card source
                              (all noindex, so they stay out of search results)
robots.txt, sitemap.xml       Search engine basics: list every page in the sitemap
dbc73c50818cdec9a4cf25737a3e57f9.txt  IndexNow key for Bing (keep it, see SEO below)
CNAME                         Custom domain for GitHub Pages (don't delete)
.nojekyll                     Tells GitHub Pages to serve the files as-is
```

### Page sections

Home page (`index.html`):

1. **Hero** — headline, dual CTA (quote / call), trust strip, and a "line down right now?" dispatch card
2. **Services** — four detail sheets (B1–B4), each with a concrete "what's included" list;
   B4, maintenance management, is a full-width sheet for the planning side of the work
   and links to the remote-planning page
3. **Capabilities** — equipment, millwright work, and industries, so buyers self-qualify
4. **Coverage** — GTA cities today, remote planning across Canada and the US, and the
   on-site expansion roadmap (Ontario → Canada → US)
5. **How it works** — four steps from first call to written report
6. **Why Mechanic Do** — differentiators aimed at maintenance managers
7. **FAQ** — the objections that come up before someone calls
8. **Quote** — contact details and the request form

Remote-planning page (`maintenance-planning/index.html`). It has no form of its own: every
"Request a quote" button goes to the form on the home page.

1. **Hero** — headline, where the work is done (remote vs on site), and credentials
2. **What's included** — the six parts of the planning service (W.1–W.6)
3. **How remote planning works** — four steps
4. **PEMAC** — the program, the maintenance definition, and the credentials table
5. **FAQ** — site visits, US plants, PEMAC, hands-on work
6. **Get started** — quote, call, email

### Social sharing image

`assets/img/og-image.png` is what Facebook, LinkedIn, iMessage and Slack show when someone
shares a link. Its source is `brand/og.html`. To change it, edit that file, open it in Chrome
at a 1200×630 window and screenshot it (or use headless Chrome), and save the result over
`og-image.png`. Then use Facebook's Sharing Debugger to refresh their cached copy.

---

## SEO

**Targeting:**

- **On-site work → Toronto and the GTA.** The home page title, H1, description, city
  list, and the business's `areaServed` in the JSON-LD all name the GTA.
- **Remote planning → Canada and the US.** Covered by `/maintenance-planning/`, whose
  JSON-LD `Service` lists Canada and the United States as `areaServed`. The home page links
  to it from the B4 sheet, the coverage section, FAQ Q6, and the footer.
- **The `.ca` domain** tells Google the site is Canadian, which is right for the GTA. US
  visibility for planning comes from that page's content, not from the domain. Don't add a
  US copy of the site or `hreflang` tags unless you start doing on-site work in the US.

**Each page has:** a unique title (≤ 60 characters) and meta description (≤ 155), a
canonical URL, an Open Graph sharing card, and JSON-LD structured data (business, services,
hours, areas served; breadcrumbs on the planning page). Check them with Google's
[Rich Results Test](https://search.google.com/test/rich-results) and the
[Schema Markup Validator](https://validator.schema.org/).

**When you change a page:**

1. Set its `<lastmod>` in `sitemap.xml` to today's date.
2. Tell Bing (and other IndexNow engines) straight away:

   ```bash
   curl -s -X POST https://api.indexnow.org/indexnow -H 'Content-Type: application/json' \
     -d '{"host":"mechanicdo.ca","key":"dbc73c50818cdec9a4cf25737a3e57f9","keyLocation":"https://mechanicdo.ca/dbc73c50818cdec9a4cf25737a3e57f9.txt","urlList":["https://mechanicdo.ca/","https://mechanicdo.ca/maintenance-planning/"]}'
   ```

3. For Google: in Search Console, paste the URL into **URL Inspection** → **Request indexing**.

**When you add a page:** copy the `<head>` of `maintenance-planning/index.html` (it uses
`../` paths), give it its own title, description, canonical URL, and JSON-LD `@id`s, add it
to `sitemap.xml`, and link to it from the home page.

**One-time setup:**

- **Google Search Console:** add `mechanicdo.ca` as a *Domain* property, verify it with the
  TXT record Google gives you (Namecheap → Advanced DNS), then submit
  `https://mechanicdo.ca/sitemap.xml` under **Sitemaps**.
- **Bing Webmaster Tools:** sign in and import the site from Search Console.

---

## Growing the site later

The structure is deliberately small — it converts well and it's easy to maintain.
When you're ready for more, the natural next steps are:

- **City landing pages** (`/millwright-services-mississauga/`) — the biggest local-SEO
  lever, one page per city you actually want work in, each with real local content
  (not the same page with the city name swapped)
- **Google Business Profile** — for most local trades this outperforms the website
  itself for phone calls. Keep it active: photos, posts, and reviews from customers
- **Case studies** — "packaging line down 14 hours → running in 5" beats any adjective
- **Region switching** — when on-site service expands, update the coverage section, the
  `areaServed` lists in the home page's JSON-LD (the business and each on-site service),
  and the "On site" row on the planning page

---

## Editing tips

- The colour palette lives in custom properties at the top of `styles.css`: paper,
  ink, annotation cyan, blueprint plate, and redline (the CTA / emphasis colour).
- Sections are separated by clear comment banners in both `index.html` and `styles.css`.
- Every section is a `<section id="...">`, so nav links, anchors, and the scroll-spy
  all keep working if you reorder them.
