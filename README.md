# marciamountshoop.com — prototype hub

An internal, client-facing Jekyll site for reviewing design directions
from the "Author Site Options" design exploration. This is **not** the
live site — every page is `noindex`/`nofollow` and `robots.txt`
disallows all crawling. `/` is a gallery that links out to each fully
built prototype; each prototype is a complete, click-through mini-site
(Home, Books, Book Detail, Writing & Talks, Speaking, About, Contact)
sharing the same content but a different visual direction.

## Prototypes built so far

- **`/options/1a/`** — "Editorial Plum": asymmetric hero, warm cream,
  sage-green accent, confident serif (Lora), near-square corners,
  restrained hairline-rule cards.
- **`/options/2a/`** — "Navy Classic": navy/teal/coral/green palette,
  sharp corners, hover-lift shadows, full-bleed photo-textured bands,
  underline nav. The un-rounded original the 3a/3b navy family was
  derived from.
- **`/options/3a/`** — "Soft Rounded": navy/teal/coral/green palette,
  pill buttons, rounded cards & covers, circular icons.

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
  real content Marcia still needs to supply.
- **Social URLs**: update `social_links` in `_config.yml`.
- **Forms**: Speaking/Contact forms are wired for
  [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify`
  attributes, per-variant form `name`s to keep test submissions
  separated). Swap for your form backend if not on Netlify.
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
