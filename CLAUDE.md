# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An internal, client-facing Jekyll site for reviewing design directions for Marcia Mount Shoop's author website. **This is not the live site** — every page is `noindex`/`nofollow` and `robots.txt` disallows all crawling. The client has chosen "Navy Classic" as the final direction, and the site now consists solely of that design: a fully click-through site (Home, Books, Book Detail, Writing & Talks, Speaking, About, Contact).

The other design directions that were previously built for comparison (multiple additional visual variants, plus a `/` gallery page linking between them) have been removed — this repo now contains a single design.

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

## Architecture

- `*.md` at the repo root (`index.md`, `about.md`, `books.md`, `contact.md`, `peace-ing-together-consulting.md`, `press.md`, `talks.md`, `writing-and-talks.md`) — top-level pages, permalinks at site root (`/`, `/about/`, etc.)
- `_books/`, `_writing/` — Jekyll collections, registered in `_config.yml` under `collections:` with permalinks `/books/:path/` and `/writing-and-talks/:path/`
- `_layouts/default.html`, `book.html`, `writing-entry.html` — page shells
- `_includes/` — nav, footer, and content modules (e.g. `_includes/endorsements.html`)
- `assets/css/main.css` — the design system (colors, type, spacing)
- `assets/js/nav.js` — mobile nav toggle + the Writing & Talks type filter
- `assets/js/form-status.js` — reads `?sent=`/`?error=` from the URL and reveals the matching success/error banner (Cloudflare Worker-backed forms)
- `assets/js/carousel.js`, `video-modal.js` — book/testimonial carousels and the speaking-page video modal, respectively (the homepage hero background is a static CSS band layout — no JS)

`_config.yml`'s `defaults:` block wires page/collection types to their layout via `scope.type` — check there when a page isn't picking up the layout you expect.

## Content data

- `_data/endorsements.yml` — book endorsements/quotes keyed by book slug (filename stem in `_books/`), rendered via `_includes/endorsements.html`, which no-ops for an empty/missing list. **Do not fabricate placeholder quotes** — leave a book's list empty until real copy arrives.
- `_data/speaking_testimonials.yml` — testimonials for the Peace-ing Together Consulting / speaking page, same `{quote, source}` shape, rendered through the same `_includes/endorsements.html` (via its generic `list=`/`title=` params).
- Book front matter (`_books/*.md`) also supports a `press:` list (array of `{quote, source}`) rendered directly in `book.html`, separate from the `endorsements.yml` data file.
- `amazon_url` / `bookshop_url` / `bn_url` in book front matter are affiliate links — keep real ones intact when editing.
- Bracketed copy like `[Marcia's fuller description goes here…]` and `# TODO` comments throughout collections/pages mark real content still pending from the client — don't fill these in with invented copy.
- `assets/images/books/README.md` and `assets/images/author/README.md` document expected image filenames and the exact markup to uncomment once a real asset is dropped in — cover art is still pending for a couple of entries (e.g. *Liberating Bodies*).

## Forms / backend

GitHub Pages (the deploy target) serves static files only, so server-side form handling runs on a separate Cloudflare Worker (`cf-worker/`), fronting `davidauble.com` and intercepting `/mms_prototypes/api/*`: verifies a Cloudflare Turnstile challenge, checks a honeypot field, validates the expected Turnstile action + hostname, emails the submission via Resend, then redirects back with a `?sent=`/`?error=` status that `form-status.js` displays. See `cf-worker/README.md` for one-time setup (Turnstile widget, hostname allowlist, Resend domain, `wrangler secret put`).

The Contact and Peace-ing Together Consulting forms use `form-name` values `contact-2a` and `speaking-inquiry-2a` (matched against `cf-worker/src/index.js`'s `ALLOWED_FORMS`) — these are internal identifiers left over from when this design was "Option 2a"; harmless to leave as-is, but if you rename them, update both the form markup and the deployed Worker together (the Worker isn't deployed by CI, see below).

`turnstile_site_key` in `_config.yml` is now the real Site Key; the deployed Worker should store the matching secret as `TURNSTILE_SECRET` (preferred) or `TURNSTILE_SECRET_KEY` (legacy fallback) and validate `TURNSTILE_HOSTNAMES` against the hostname returned by Siteverify.

## CI/CD

- `.github/workflows/deploy.yml` — builds with Jekyll (`JEKYLL_ENV=production`, baseurl from `actions/configure-pages`) and deploys to GitHub Pages on push to `main`. This is the **only** thing that builds/deploys the site — the repo's Pages source is set to `"GitHub Actions"` (`build_type: workflow`), not the legacy "deploy from a branch" mode, so there's no second, competing build happening outside this workflow.
- `.github/workflows/cloudflare-cache-purge.yml` — purges the Cloudflare CDN cache on merge to `main` (site is Cloudflare-proxied in front of GitHub Pages)
- The Cloudflare Worker (`cf-worker/`) is **not** deployed by CI — it's deployed manually via `npx wrangler deploy` per `cf-worker/README.md`

## SEO / AEO

- `jekyll-seo-tag` generates `<title>`, meta description, canonical, and Open Graph/Twitter Card tags from front matter
- `schema.org/Person` JSON-LD on every page (`_includes/schema-person.html`); each book page adds `schema.org/Book` JSON-LD
- Every page footer carries an FTC-compliant affiliate disclosure (`site.affiliate_disclosure` in `_config.yml`)
- Sitemap generation and `llms.txt` are intentionally disabled while this remains a review-only site (would need re-enabling before going live)

## Before-launch placeholders (do not "fix" these without being asked — they're intentionally deferred)

- Book covers / author photos: CSS placeholder blocks (`BOOK COVER`, `AUTHOR PHOTO`) until real images are committed
- `social_links.x` in `_config.yml` is still a placeholder URL
- The `noindex` meta tag and internal-review framing are meant to be stripped before the real site launches
