# marciamountshoop.com — prototype hub

An internal, client-facing Jekyll site for reviewing design directions
for Marcia Mount Shoop's author website. This is **not** the live
site — every page is `noindex`/`nofollow` and `robots.txt` disallows
all crawling. `/` is a gallery that links out to each fully built
prototype; each prototype is a complete, click-through mini-site
(Home, Books, Book Detail, Writing & Talks, Speaking, About, Contact)
sharing the same content but a different visual direction.

## What's been built

The project started as a single design direction and grew into a
multi-prototype comparison hub, then had its first content/feedback
pass once a direction was chosen:

1. **Initial build (direction 3a)** — stood up the whole site as a
   real, buildable Jekyll site: book/writing collections, SEO
   (`jekyll-seo-tag`, `jekyll-sitemap`, `schema.org` JSON-LD, `llms.txt`
   for AEO), FTC affiliate disclosure, Netlify-backed forms, and a
   responsive layout with mobile nav + a Writing & Talks type filter.
2. **GitHub Pages deployment** — CI build/deploy workflow, plus a
   Cloudflare cache-purge workflow (several iterations: curl-based →
   third-party action → pinned SHA → `jakejarvis/cloudflare-purge-action`)
   that busts the CDN cache whenever a PR merges to `main`.
3. **Restructure into a multi-prototype hub** — root `/` became a
   gallery (`_data/options.yml`) linking to independent design
   directions living under `/options/<id>/`, each with its own
   collections, layouts, includes, and CSS, plus a shared "you are
   viewing prototype X" bar for jumping between them. The original 3a
   site moved to `/options/3a/`.
4. **Additional directions added** — Option 1a "Editorial Plum"
   (asymmetric hero, warm cream, sage-green, Lora serif), and later
   Option 7a "Light & Airy Gradient" (soft multi-hue gradients, pill
   buttons, "Hi, I'm Marcia" intro block), bringing the total to four
   built directions, later relabeled Option 1–4 for client review.
5. **Option 2 ("Navy Classic") chosen and rebuilt with real content** —
   once a direction was selected, `/options/2a/` was reworked with
   Marcia's actual book copy, a new Press page, a renamed Talks page,
   updated nav/footer, and endorsement-card layout fixes.
6. **First round of client feedback** (2026-07-24, see
   [CHANGELOG.md](CHANGELOG.md) for full detail) — applied to Option 2:
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

## Prototypes

- **`/options/1a/`** — "Editorial Plum": asymmetric hero, warm cream,
  sage-green accent, confident serif (Lora), near-square corners,
  restrained hairline-rule cards.
- **`/options/2a/`** — "Navy Classic" — **the chosen direction**,
  rebuilt with Marcia's real content and the first round of feedback
  applied: navy/teal/coral/green palette, sharp corners, hover-lift
  shadows, full-bleed photo-textured bands, underline nav.
- **`/options/3a/`** — "Soft Rounded": navy/teal/coral/green palette,
  pill buttons, rounded cards & covers, circular icons.
- **`/options/7a/`** — "Light & Airy Gradient": traditional nav, soft
  multi-hue gradient washes, pill buttons, calm editorial feel.

Adding another direction from the design doc means: duplicate an
`options/<id>/` folder + its `_books_<id>`/`_writing_<id>` collections +
`assets/css/<id>.css` + `_layouts/*-<id>.html` + `_includes/<id>/`, then
add an entry to `_data/options.yml` so it shows up on the landing page.

## Structure

- `index.html` — the landing gallery (`_data/options.yml` drives the
  card list), `assets/css/gallery.css`
- `_includes/proto-bar.html` + `assets/css/proto-bar.css` — the neutral
  "you are viewing prototype X, switch to Y" bar shown on every
  prototype page
- `options/<variant>/*.md` — top-level pages for that variant
  (permalinks under `/options/<variant>/...`)
- `_books_<variant>/`, `_writing_<variant>/` — per-variant collections
  (same content across variants, styled differently)
- `_layouts/default-<variant>.html`, `book-<variant>.html`,
  `writing-entry-<variant>.html` — per-variant page shells
- `_includes/<variant>/` — per-variant nav, footer, and modules
- `assets/css/<variant>.css` — per-variant design system
- `assets/js/nav.js` — shared mobile nav toggle + Writing & Talks type
  filter (attribute-selector based, works across variants)
- `assets/js/form-status.js` — reads `?sent=`/`?error=` from the URL
  and reveals the matching success/error banner (used by Option 2's
  Cloudflare Worker-backed forms)
- `cf-worker/` — Cloudflare Worker that handles Option 2's Contact and
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

## Before launch (whichever direction is chosen) — placeholders to replace

- **Book covers & author photos**: currently CSS placeholder blocks
  labeled `BOOK COVER` / `AUTHOR PHOTO`. Drop real images into
  `assets/images/` and swap the placeholder markup for `<img>` tags.
- **Affiliate links**: `amazon_url` / `bookshop_url` / `bn_url` in each
  `_books_<variant>/*.md` file are `#` — fill in real Amazon Associates /
  Bookshop.org / B&N affiliate links.
- **Bracketed copy**: text like `[Marcia's fuller description goes
  here…]` throughout the collections and `about`/`speaking` pages marks
  real content Marcia still needs to supply (largely resolved on
  Option 2, still outstanding on 1a/3a/7a).
- **Social URLs**: update `social_links` in `_config.yml`.
- **Forms**: Option 2's Contact/consulting forms run on the Cloudflare
  Worker in `cf-worker/` (Turnstile + Resend); other variants are still
  wired for [Netlify Forms](https://docs.netlify.com/forms/setup/)
  (`data-netlify` attributes). Swap for your form backend if not on
  Netlify/Cloudflare.
- **Turnstile key**: `turnstile_site_key` in `_config.yml` is currently
  Cloudflare's always-pass test key — swap for a real site key before
  launch.
- **Before going live**: drop the gallery/proto-bar chrome, pick one
  `options/<variant>/` to promote to site root, delete the rest, remove
  the `noindex` meta tag, and re-enable `jekyll-sitemap` + a real
  `llms.txt` (both were removed here since this hub isn't meant to be
  indexed).
- **`site.url`** in `_config.yml` should match the live domain.

## SEO / AEO / social sharing (per prototype)

- `jekyll-seo-tag` generates `<title>`, meta description, canonical, and
  Open Graph / Twitter Card tags from each page's front matter.
- `schema.org/Person` JSON-LD is included on every page; each book page
  adds `schema.org/Book` JSON-LD.
- Every page footer carries an FTC-compliant affiliate disclosure.
- Sitemap generation and `llms.txt` are intentionally disabled while
  this is a review-only hub — see "Before launch" above.
