# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An internal, client-facing Jekyll site for reviewing design directions for Marcia Mount Shoop's author website. **This is not the live site** — every page is `noindex`/`nofollow` and `robots.txt` disallows all crawling. The root `/` is a gallery (driven by `_data/options.yml`) linking out to independent, fully click-through prototype mini-sites under `/options/<id>/` (Home, Books, Book Detail, Writing & Talks, Speaking, About, Contact) — same content, different visual direction per prototype.

**Option 2 (`/options/2a/`, "Navy Classic") is the chosen direction** and is where real content and active feature work happens. Options 1a, 3a, and 7a are largely frozen comparison prototypes still carrying placeholder/bracketed copy.

Ongoing feedback and iteration is logged chronologically in `CHANGELOG.md` (newest first) — check it for recent context before making content changes, and add an entry when you complete a client-feedback pass.

## Commands

```sh
bundle install              # install Ruby deps
bundle exec jekyll serve    # local dev server, http://localhost:4000/mms_prototypes/ (note baseurl)
bundle exec jekyll build    # static build to _site/
```

There is no test suite or linter configured for the Jekyll site. Validate changes by building and by checking the rendered HTML in `_site/`.

Cloudflare Worker (`cf-worker/`, excluded from the Jekyll build):
```sh
cd cf-worker
npm install
npx wrangler dev       # local dev; needs .dev.vars for TURNSTILE_SECRET_KEY / RESEND_API_KEY
npx wrangler deploy    # deploy — registers the route in wrangler.toml
```

## Architecture: the per-variant pattern

Everything in this repo is duplicated **per design variant** (`1a`, `2a`, `3a`, `7a`). A feature or content change almost always needs to be made in one variant's copy of each of these, not shared:

- `options/<variant>/*.md` — top-level pages for that variant (permalinks under `/options/<variant>/...`)
- `_books_<variant>/`, `_writing_<variant>/` — Jekyll collections (same underlying content across variants, styled differently); registered in `_config.yml` under `collections:` with their own `permalink`
- `_layouts/default-<variant>.html`, `book-<variant>.html`, `writing-entry-<variant>.html` — per-variant page shells
- `_includes/<variant>/` — per-variant nav, footer, and content modules (e.g. `_includes/2a/endorsements.html`)
- `assets/css/<variant>.css` — per-variant design system (colors, type, spacing all live here; no shared base stylesheet)

`_config.yml`'s `defaults:` block is what wires a variant's pages/collections to its layout via `scope.path` / `scope.type` — check there when a page isn't picking up the layout you expect.

Shared across all variants:
- `_includes/proto-bar.html` + `assets/css/proto-bar.css` — the "you are viewing prototype X, switch to Y" bar shown on every prototype page
- `assets/js/nav.js` — mobile nav toggle + the Writing & Talks type filter (attribute-selector based, works across all variants without modification)
- `assets/js/form-status.js` — reads `?sent=`/`?error=` from the URL and reveals the matching success/error banner (Option 2's Cloudflare Worker-backed forms)
- `index.html` (root gallery) + `assets/css/gallery.css`, driven by `_data/options.yml`

**Adding a new design direction**: duplicate an `options/<id>/` folder + its `_books_<id>`/`_writing_<id>` collections + `assets/css/<id>.css` + `_layouts/*-<id>.html` + `_includes/<id>/`, register the collections/defaults in `_config.yml`, then add an entry to `_data/options.yml`.

## Content data

- `_data/endorsements_2a.yml` — book endorsements/quotes keyed by book slug (filename stem in `_books_2a/`), rendered via `_includes/2a/endorsements.html`, which no-ops for an empty/missing list. **Do not fabricate placeholder quotes** — leave a book's list empty until real copy arrives.
- Book front matter (`_books_<variant>/*.md`) also supports a `press:` list (array of `{quote, source}`) rendered directly in `book-<variant>.html`/equivalent, separate from the `endorsements_2a` data file.
- `amazon_url` / `bookshop_url` / `bn_url` in book front matter are affiliate links — currently `#` placeholders on most non-2a books; keep real ones intact when editing.
- Bracketed copy like `[Marcia's fuller description goes here…]` and `# TODO` comments throughout collections/pages mark real content still pending from the client — don't fill these in with invented copy.
- `assets/images/books/README.md` and `assets/images/author/README.md` document expected image filenames and the exact markup to uncomment once a real asset is dropped in — cover art and the author headshot are still pending for several entries.

## Forms / backend

GitHub Pages (the deploy target) serves static files only, so server-side form handling for **Option 2 only** runs on a separate Cloudflare Worker (`cf-worker/`), fronting `davidauble.com` and intercepting `/mms_prototypes/api/*`: verifies a Cloudflare Turnstile challenge, checks a honeypot field, emails the submission via Resend, then redirects back with a `?sent=`/`?error=` status that `form-status.js` displays. See `cf-worker/README.md` for one-time setup (Turnstile widget, Resend domain, `wrangler secret put`).

Options 1a/3a/7a still use Netlify Forms (`data-netlify` attributes) instead.

`turnstile_site_key` in `_config.yml` is currently Cloudflare's always-pass test key (`1x00000000000000000000AA`) — intentional until a real Worker is deployed with the matching secret.

## CI/CD

- `.github/workflows/deploy.yml` — builds with Jekyll (`JEKYLL_ENV=production`, baseurl from `actions/configure-pages`) and deploys to GitHub Pages on push to `main`. This is the **only** thing that builds/deploys the site — the repo's Pages source is set to `"GitHub Actions"` (`build_type: workflow`), not the legacy "deploy from a branch" mode, so there's no second, competing build happening outside this workflow.
- `.github/workflows/cloudflare-cache-purge.yml` — purges the Cloudflare CDN cache on merge to `main` (site is Cloudflare-proxied in front of GitHub Pages)
- The Cloudflare Worker (`cf-worker/`) is **not** deployed by CI — it's deployed manually via `npx wrangler deploy` per `cf-worker/README.md`

## SEO / AEO (per prototype)

- `jekyll-seo-tag` generates `<title>`, meta description, canonical, and Open Graph/Twitter Card tags from front matter
- `schema.org/Person` JSON-LD on every page (`_includes/schema-person.html`); each book page adds `schema.org/Book` JSON-LD
- Every page footer carries an FTC-compliant affiliate disclosure (`site.affiliate_disclosure` in `_config.yml`)
- Sitemap generation and `llms.txt` are intentionally disabled while this remains a review-only hub (would need re-enabling before any variant goes live)

## Before-launch placeholders (do not "fix" these without being asked — they're intentionally deferred)

- Book covers / author photos: CSS placeholder blocks (`BOOK COVER`, `AUTHOR PHOTO`) until real images are committed
- `social_links.x` in `_config.yml` is still a placeholder URL
- The gallery/proto-bar chrome, `noindex` meta tag, and multi-variant structure are all meant to be stripped down to a single promoted variant before the real site launches
