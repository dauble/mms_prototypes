# marciamountshoop.com — prototype site

An internal, client-facing Jekyll site for reviewing design directions for
Marcia Mount Shoop's author website. This is **not** the live site — every
page is `noindex`/`nofollow` and `robots.txt` disallows all crawling. It's
a complete, click-through site (Home, Books, Book Detail, Writing & Talks,
Speaking, About, Contact) built around "Navy Classic," the design
direction the client has chosen.

## What's been built

1. **Initial build** — stood up the whole site as a real, buildable Jekyll
   site: book/writing collections, SEO (`jekyll-seo-tag`, `schema.org`
   JSON-LD), FTC affiliate disclosure, and a responsive layout with mobile
   nav + a Writing & Talks type filter.
2. **GitHub Pages deployment** — CI build/deploy workflow, plus a
   Cloudflare cache-purge workflow that busts the CDN cache whenever a PR
   merges to `main`.
3. **Multiple design directions explored** — several additional visual
   directions were built and compared client-side before "Navy Classic"
   was chosen; those comparison variants (and the gallery page that linked
   between them) have since been removed from the repo.
4. **"Navy Classic" chosen and rebuilt with real content** — Marcia's
   actual book copy, a Press page, a Talks page, nav/footer, and
   endorsement-card layout.
5. **First round of client feedback** (2026-07-24, see
   [CHANGELOG.md](CHANGELOG.md) for full detail):
   - Swapped Netlify Forms for a custom **Cloudflare Worker** backend
     (`cf-worker/`) since GitHub Pages can't run server-side code —
     verifies Cloudflare Turnstile, checks a honeypot, emails
     submissions via Resend, and redirects back with a success/error
     status the page displays.
   - Replaced text-abbreviation social icons with real inline SVG
     brand icons in the footer.
   - Gave testimonial quotes a contrasting full-width band background.
   - Misc content/styling fixes (podcast link, button color/contrast,
     form field height).

Ongoing feedback and iteration is logged chronologically in
[CHANGELOG.md](CHANGELOG.md).

## Structure

- `*.md` at the repo root (`index.md`, `about.md`, `books.md`,
  `contact.md`, `peace-ing-together-consulting.md`, `press.md`,
  `talks.md`, `writing-and-talks.md`) — top-level pages
- `_books/`, `_writing/` — Jekyll collections
- `_layouts/default.html`, `book.html`, `writing-entry.html` — page shells
- `_includes/` — nav, footer, and content modules
- `assets/css/main.css` — the design system
- `assets/js/nav.js` — mobile nav toggle + Writing & Talks type filter
- `assets/js/form-status.js` — reads `?sent=`/`?error=` from the URL
  and reveals the matching success/error banner (used by the
  Cloudflare Worker-backed forms)
- `cf-worker/` — Cloudflare Worker that handles the Contact and
  consulting-inquiry form submissions (Turnstile verification, honeypot
  check, email via Resend); excluded from the Jekyll build. See
  `cf-worker/README.md` for one-time setup.
- `.github/workflows/` — CI build/deploy to GitHub Pages, and a
  Cloudflare cache-purge workflow that runs on merge to `main`

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000`.

## Before launch — placeholders to replace

- **Book covers & author photos**: currently CSS placeholder blocks
  labeled `BOOK COVER` / `AUTHOR PHOTO` for the couple of entries still
  missing real art. Drop real images into `assets/images/` and swap the
  placeholder markup for `<img>` tags.
- **Affiliate links**: `amazon_url` / `bookshop_url` / `bn_url` in each
  `_books/*.md` file — fill in any remaining `#` placeholders with real
  Amazon Associates / Bookshop.org / B&N affiliate links.
- **Bracketed copy**: text like `[Marcia's fuller description goes
  here…]` throughout the collections marks real content Marcia still
  needs to supply.
- **Social URLs**: update `social_links` in `_config.yml`.
- **Turnstile key**: `turnstile_site_key` in `_config.yml` is currently
  Cloudflare's always-pass test key — swap for a real site key before
  launch.
- **Before going live**: remove the `noindex` meta tag, and re-enable
  `jekyll-sitemap` + a real `llms.txt` (both were removed here since this
  hub isn't meant to be indexed).
- **`site.url`** in `_config.yml` should match the live domain.

## SEO / AEO / social sharing

- `jekyll-seo-tag` generates `<title>`, meta description, canonical, and
  Open Graph / Twitter Card tags from each page's front matter.
- `schema.org/Person` JSON-LD is included on every page; each book page
  adds `schema.org/Book` JSON-LD.
- Every page footer carries an FTC-compliant affiliate disclosure.
- Sitemap generation and `llms.txt` are intentionally disabled while
  this is a review-only site — see "Before launch" above.
