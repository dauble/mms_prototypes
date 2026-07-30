# Changelog

All notable changes made during feedback/iteration sessions on this prototype site are logged here, newest first. This log (dated entries) is the versioning convention for this project — there's no separate semver number.

## 2026-07-30 — Social links, book covers, press, and endorsements scaffold (Option 2 / "2a")

### Social links
- `_config.yml` `social_links`: real URLs for Facebook, Instagram, Threads, and Substack (note the Substack handle changed domains, to `marciawhitneymountshoop.substack.com`); `youtube` now points at GCPC's YouTube podcasts page (`youtube.com/@GCPCUSA/podcasts`) since no separate general YouTube URL was supplied — this also fixes the "GCPC Podcast" placeholder `#` links on the homepage and book detail pages, and the Substack subscribe form's hardcoded old domain in `_includes/2a/follow-along.html`.
- `x` placeholder left as-is in `_config.yml` — still referenced by Options 1a/3a/7a; Option 2a itself never linked to it.
- `social.links` (used by `jekyll-seo-tag`) updated to match, X dropped.

### Book cover images
- Added a `cover:` front-matter field to the three books with supplied artwork (`a-body-broken-a-body-betrayed.md`, `let-the-bones-dance.md`, `touchdowns-for-jesus.md`), pointing at `assets/images/books/`.
- `_layouts/book-2a.html`, `options/2a/index.md`, `options/2a/books.md`: cover-bearing books now render a real `<img>` (with alt text) in place of the `BOOK COVER` placeholder block; books without a `cover` field still fall back to the striped placeholder, so `liberating-bodies` (cover pending) and `anthologies` are unaffected.
- `assets/css/2a.css`: added `object-fit: cover` sizing rules so cover images fill the existing `.hero__cover` / `.book-card__cover` / `.book-detail__cover` boxes responsively.
- **Note:** the actual image files (`body-broken.png`, `Let_the_Bones_Dance_COVER_IMAGE.jpg`, `Touchdowns_for_Jesus_COVER_IMAGE.jpg`) still need to be dropped into `assets/images/books/` — see the README left there. They weren't committed in this round because they arrived as chat attachments, not as files this environment could read from disk.

### Affiliate links
- Added `# TODO` comments above `amazon_url` / `bookshop_url` / `bn_url` on the three backlist books noting these are still pending from the client. Left values as `#`, unchanged.
- `liberating-bodies.md` flagged distinctly: forthcoming (expected Spring 2027), no retail links yet — publisher/indie-store vendor links are real, only the Amazon fallback is a placeholder.

### Press
- `options/2a/press.md`: replaced the placeholder `#` press-card list with the real, currently-available coverage (Washington Post, NPR Marketplace, Religion News Service, StoryCorps, Blue Ridge Public Radio, three Asheville Citizen Times stories, Presbyterian News, Presbyterian Outlook, New York Times), each linking out (`target="_blank"`).
- `options/2a/index.md`: the homepage "As Seen In" full-width press-strip band now links each outlet name out to its story, plus a "More press" link to the Press page.

### Endorsements (scaffolded, empty)
- Added `_data/endorsements_2a.yml`, keyed by book slug, all lists intentionally empty — new-book (Liberating Bodies) endorsements are expected mid-October 2026, and endorsements for backlist titles are pending client confirmation on scope. No placeholder quotes were fabricated.
- Added `_includes/2a/endorsements.html`, which renders a `.testimonial-band` (matching the existing press-quote styling) per book when its list is non-empty, and no-ops otherwise. Wired into `_layouts/book-2a.html`.

### About page
- `options/2a/index.md`: added a `TODO` comment on the full-bleed "About Marcia" band noting we're waiting on the client to decide between a landscape photo of her or a background/textured image for that section. The striped placeholder is left in place.

## 2026-07-27 — Book detail quote styling & page consistency (Option 2 / "2a")

### Book detail page (`_layouts/book-2a.html`)
- "Press & Praise" book quotes now use the shared `.testimonial-band` / `.testimonial` component (same styling as the homepage and consulting page quote) instead of the separate `.press-card` grid, for a consistent look across the site.
- Added a `.testimonial + .testimonial` spacing rule in `assets/css/2a.css` so multiple stacked book quotes don't run together.
- Replaced the FB/X/email text-abbreviation share links with inline SVG icons, matching the footer's icon treatment.
- "More by Marcia" switched from the `.shelf` layout to the `.book-grid` layout (matching the Books page), capped at 4 titles.
- Added a new "Explore" section (Talks / Podcasts / Press cards), plus the follow-along and CTA-band includes, to the bottom of every book detail page.

### Page consistency
- Added the follow-along subscribe prompt and/or CTA band to the bottom of About, Books, Press, Talks, Writing & Talks, and the Peace-ing Together Consulting page, so every page ends with the same subscribe/contact prompts.

## 2026-07-24 — First round of feedback (Option 2 / "2a")

### Contact & inquiry forms
- Replaced Netlify Forms (`data-netlify`) with a custom Cloudflare Worker backend (`cf-worker/`), since GitHub Pages can't run server-side code.
  - `cf-worker/src/index.js`: verifies a Cloudflare Turnstile challenge, checks the honeypot field, and emails submissions via the Resend API. Redirects back to the originating page with a `?sent=1` or `?error=...` query param.
  - `cf-worker/wrangler.toml`: registers the Worker on `davidauble.com/mms_prototypes/api/*`, leaving the rest of the domain served by GitHub Pages.
  - `cf-worker/README.md`: one-time setup steps (Turnstile widget, Resend domain/API key, secrets, deploy).
  - `cf-worker/package.json`: `wrangler dev` / `wrangler deploy` scripts.
- Added Cloudflare Turnstile widget to both the Contact page (`options/2a/contact.md`) and the Peace-ing Together Consulting inquiry form (`options/2a/peace-ing-together-consulting.md`), gated behind a new `turnstile_site_key` setting in `_config.yml` (currently Cloudflare's always-pass test key).
- Added `assets/js/form-status.js`: reads `?sent=`/`?error=` from the URL on page load, reveals the matching success/error banner, hides the form on success, and cleans the query string from the address bar.
- Added corresponding `.form-status` success/error banner styles in `assets/css/2a.css`.
- `.gitignore`: excluded `cf-worker/node_modules/`, `cf-worker/.wrangler/`, and `cf-worker/.dev.vars`; `_config.yml` excludes `cf-worker/` from the Jekyll build.

### Footer
- Replaced two-letter text abbreviations (SS, YT, IG, FB, TH) in `_includes/2a/footer.html` with real inline SVG brand icons for Substack, YouTube, Instagram, Facebook, and Threads.
- Updated `.social-icon` styling in `assets/css/2a.css` to size/color the SVGs and added a hover background.

### Testimonials
- Introduced a `.testimonial-band` wrapper around the existing `.testimonial` card on both the homepage (`options/2a/index.md`) and the consulting page (`options/2a/peace-ing-together-consulting.md`), giving the quote a contrasting full-width band background instead of sitting flush with the page.

### Misc content & styling
- Homepage "Going Deep" podcast link now points to `https://shoopsgoingdeep.com/` instead of a placeholder `#`.
- Substack subscribe button (`_includes/2a/follow-along.html`) changed from `.btn-green` to `.btn-teal`.
- `.btn-teal` text color changed from navy to white for better contrast.
- Fixed inconsistent height between the Substack email input and its submit button in the follow-along form.
