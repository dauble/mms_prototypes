# Changelog

All notable changes made during feedback/iteration sessions on this prototype site are logged here, newest first. This log (dated entries) is the versioning convention for this project — there's no separate semver number.

## 2026-08-15 — Removed comparison prototypes, promoted "Navy Classic" to site root

- The client has chosen "Navy Classic" (formerly "Option 2" / `2a`) as the final direction. The other three comparison prototypes (formerly "Option 1" / `1a` "Editorial Plum", "Option 3" / `3a` "Soft Rounded", "Option 4" / `7a` "Light & Airy Gradient") and the `/` gallery page that linked between them have been deleted entirely: `_books_1a`/`_books_3a`/`_books_7a`, `_writing_1a`/`_writing_3a`/`_writing_7a`, `options/1a`/`options/3a`/`options/7a`, `_includes/1a`/`_includes/3a`/`_includes/7a`, `_layouts/*-1a.html`/`*-3a.html`/`*-7a.html`, `assets/css/1a.css`/`3a.css`/`7a.css`, `index.html`, `assets/css/gallery.css`, `_data/options.yml`, and the shared "you are viewing prototype X" `_includes/proto-bar.html` + `assets/css/proto-bar.css` (no longer meaningful with only one design left).
- Navy Classic's pages, collections, layouts, includes, and CSS were promoted from `/options/2a/...` to the site root: `options/2a/*.md` → root-level `*.md` (`/options/2a/books/` → `/books/`, etc.), `_books_2a`/`_writing_2a` → `_books`/`_writing` (collection permalinks updated to match), `_includes/2a/` → `_includes/`, `_layouts/{default,book,writing-entry}-2a.html` → `_layouts/{default,book,writing-entry}.html`, `assets/css/2a.css` → `assets/css/main.css`, and `_data/{endorsements,speaking_testimonials}_2a.yml` → `_data/{endorsements,speaking_testimonials}.yml`. `_config.yml`'s `collections:`/`defaults:` blocks collapsed to a single set (no more per-variant scoping).
- Page titles that referenced the old comparison labeling (e.g. "Contact — Option 2") were cleaned up to just their plain names; the homepage's `<title>` changed from "Option 2 — Navy Classic" to "Marcia W. Mount Shoop".
- Left as-is (out of scope for this pass): the Contact/consulting forms' internal `form-name` values (`contact-2a`, `speaking-inquiry-2a`) still carry the old `-2a` suffix since they're matched against `cf-worker/src/index.js`'s `ALLOWED_FORMS`, which isn't redeployed by CI — renaming them would need to be coordinated with a manual `wrangler deploy`. The site remains `noindex`/`nofollow` pending real launch.

## 2026-08-15 — Eliminate render-blocking requests (Option 2 / "2a")

- PageSpeed Insights (mobile) flagged three render-blocking requests on `/options/2a/` for an estimated 1,510ms of savings: `assets/css/2a.css` (7.6 KiB, ~500ms), `assets/css/proto-bar.css` (1.8 KiB, ~170ms), and the Google Fonts stylesheet (~780ms).
- Both first-party stylesheets are now inlined directly into `<head>` instead of linked, removing those network round-trips entirely. Since Jekyll's built-in `include_relative` tag disallows `../` paths (both files live outside `_includes`), added a small custom Liquid tag (`_plugins/read_file_tag.rb`, `{% read_file %}`) that reads a file relative to the site source and prints its raw contents — used in `_layouts/default-2a.html` to inline `2a.css` and `proto-bar.css`.
- The Google Fonts `<link>` now uses the standard preload/print-media-swap pattern (`rel="preload" as="style"` + `media="print" onload="this.media='all'"` + `<noscript>` fallback) so the font CSS loads asynchronously instead of blocking first paint.
- Scoped to Option 2a only (the active/live variant); Options 1a/3a/7a are frozen comparison prototypes and still link their CSS/fonts normally.

## 2026-08-15 — Fix homepage About Marcia section layout regression (Option 2 / "2a")

- The 2026-08-15 PageSpeed pass (`38b94f5`) wrapped `<img>`s in `<picture><source type="image/webp">…</picture>` and added `picture { display: contents; }` to `assets/css/2a.css` so the wrapper wouldn't affect layout. That combination triggers a Chromium quirk: a `<source>` inside a `display: contents` `<picture>` still generates an (empty) box and participates in layout, so it consumed a cell in the homepage About Marcia section's two-column CSS grid (`.about-teaser`) and pushed the photo and navy bio panel onto opposite corners instead of side-by-side.
- Fixed by adding `source { display: none; }` next to the existing `picture`/`img` reset rules in `assets/css/2a.css`, restoring the intended photo/panel layout from `6e27c40`. Only `2a.css` uses `display: contents` on `picture`, so other options were unaffected.

## 2026-08-15 — Removed duplicate GitHub Pages deploy pipeline

- The repo's GitHub Pages source was still set to the legacy "deploy from a branch" mode (`build_type: legacy`, branch `main`), which auto-builds and deploys via GitHub's own Jekyll build on every push — running in parallel with (and redundant to) the custom `.github/workflows/deploy.yml` Actions workflow that already handles the build/deploy correctly (proper `--baseurl`, `JEKYLL_ENV=production`). Run history showed both `pages-build-deployment` and `Deploy Jekyll site to GitHub Pages` firing on every merge to `main`.
- Switched the Pages source to `build_type: workflow` via the GitHub API (`PUT /repos/dauble/mms_prototypes/pages`), so `deploy.yml` is now the sole deploy path. This is a repo-level setting, not a branch-scoped file change.

## 2026-08-15 — Image optimization: WebP everywhere, further compression (Option 2 / "2a")

### WebP copies for every real image
- Every real photo/cover image now has a `.webp` sibling alongside its original: the author headshot (`assets/images/author/marcia-headshot.webp`), the consulting hero photo (`assets/images/consulting/peace-ing-together-consult.webp`), and all 12 book covers currently in `assets/images/books/` (including the four anthology covers — Erotic Faith, Encountering the Sacred, Faithfully Feminist, Feasting on the Word — that were still pending as of the 2026-08-13 entry below, plus the six previously cover-less anthology/chapter entries, which now all have art).
- `<picture>`/`<source type="image/webp">` markup (added in the 2026-08-15 PageSpeed pass, `38b94f5`) already pointed at these paths via a Liquid `replace` filter on the `cover:` front-matter field (`.jpeg`/`.jpg`/`.png` → `.webp`) — those files are now actually present, so browsers that support WebP get it instead of falling back to the original.
- Originals were compressed further in the same pass (e.g. the headshot JPEG dropped from ~1.2MB to ~189KB, the consulting PNG from ~640KB to ~554KB) on top of the initial compression pass from 2026-08-14.
- `assets/images/books/README.md` and `assets/images/author/README.md` updated to drop the stale "still pending" lists (everything but *Liberating Bodies*' cover has now arrived) and note the new `.webp` files.

## 2026-08-15 — Speaking page video/testimonials, accessibility pass, bubble lifecycle (Option 2 / "2a")

### Speaking / consulting page ("Peace-ing Together Consulting")
- Real hero photo committed (`assets/images/consulting/peace-ing-together-consult.png`), replacing the "PHOTO: full-bleed, royalty-free" placeholder label on `options/2a/peace-ing-together-consulting.md`'s hero.
- Added a theater-style video modal: the speaking-reel block now plays a real YouTube video (`youtube-nocookie.com` embed, id `E85S4bQ2wYc`) in a centered, darkened overlay on click, instead of a non-functional play button over a striped placeholder. New `_includes/2a/video-modal.html` + `assets/js/video-modal.js` (registered in `_layouts/default-2a.html`); closes on Escape/backdrop click and restores focus to the trigger. The video block itself now shows a real YouTube thumbnail behind the play button.
- Testimonials: generalized `_includes/2a/endorsements.html` so it can render either a book's endorsements by slug (existing behavior, unchanged) or an arbitrary `list=` with custom `title=`/`item_label=` params. New `_data/speaking_testimonials_2a.yml` (placeholder quote, same `{quote, source}` shape as `endorsements_2a.yml`) now drives the speaking page's testimonial section instead of a single hardcoded bracketed quote.

### Accessibility pass (site-wide, Option 2a)
- Fixed `_config.yml`'s `lang: en_US` → `lang: en-US` — `en_US` was never valid for the `<html lang>` attribute (needs BCP-47 hyphen form).
- Added a "Skip to main content" link (`_layouts/default-2a.html` + `.skip-link` in `assets/css/2a.css`), visually hidden until keyboard-focused, targeting a new `id="main-content"` on `<main>`.
- `--muted`/`--muted-2` text-color alpha raised from `.55`/`.45` to `.68`/`.55` in `assets/css/2a.css` so both meet WCAG AA's 4.5:1 contrast minimum on white (the old values fell short).
- Contact and speaking-inquiry form fields (`options/2a/contact.md`, `peace-ing-together-consulting.md`) gained `aria-label`s matching their placeholders, so screen readers announce field purpose independent of placeholder text.
- Internal review-only labels (e.g. the "PHOTO: ..." placeholder captions in `cta-band.html`) marked `aria-hidden="true"` where they're not meant to be user-facing content.

### Hero bubble background: continuous spawn/despawn
- `assets/js/hero-bubbles.js`: bubbles now continuously spawn and despawn (drifting between 16–32 on screen) with an elastic grow-in/shrink-out animation on birth/death, replacing the previous fixed set of 24 bubbles for the page's lifetime.

### About Marcia teaser section
- Wrapped `.about-teaser` in a new `.about-teaser-section` (soft background fill, dedicated vertical padding) on the homepage, replacing the generic `.section wrap` wrapper it was using.

## 2026-08-15 — Hero background: smooth gradient instead of dot grid (Option 2 / "2a")

### Client feedback on the hero bubble background
- Client feedback: the hero's background was still showing the old fine dot-grid texture instead of a smooth gradient wash, so the floating bubbles didn't read cleanly against it.
- Replaced `.hero`'s `background-image: radial-gradient(var(--navy-pale) 1px, transparent 1px)` dot-grid pattern in `assets/css/2a.css` with a single soft radial gradient (`var(--bg-softer)` → `var(--bg-soft)` → `var(--bg)`, anchored upper-left) using existing background tokens — no new colors introduced. The floating bubble canvas (`hero-bubbles.js`, added previously) is unaffected and still renders on top.

## 2026-08-14 — Floating bubble background on the homepage hero (Option 2 / "2a")

### Ambient hero animation
- Added a subtle canvas-based particle layer to the homepage hero (`options/2a/index.md`), behind the existing "Featured Book" copy/cover content: ~24 small circles (radius 2–20px, weighted toward smaller) drift slowly in random directions, wrap around the section edges, and gently part when the cursor comes within ~90px, easing back to their resting position once the cursor leaves.
- New `assets/js/hero-bubbles.js`, following the site's existing vanilla-JS conventions (`DOMContentLoaded` + guard clauses, like `nav.js`/`carousel.js`); registered in `_layouts/default-2a.html` alongside the other deferred scripts.
- Colors are read at runtime from the existing `--navy`/`--teal`/`--green`/`--coral` custom properties in `assets/css/2a.css` (at low alpha) rather than hardcoded, so the palette stays in sync with the design system automatically.
- Respects `prefers-reduced-motion: reduce` (skips the animation entirely) and is scaled for `devicePixelRatio` so circles stay crisp on retina displays.
- New `.hero__bubbles` canvas styling in `assets/css/2a.css`: absolutely positioned to fill `.hero`, `z-index: 0` so it sits behind the existing hero content, `pointer-events: none` so it never intercepts clicks.

## 2026-08-14 — "About Marcia" section: layered overlap treatment (Option 2 / "2a")

### Client feedback on the design-ref-5b section
- Client feedback on the initial 5b build (below): wanted the navy panel taller than the photo, with the photo overlapping in front of it for a layered look, rather than the flush edge-to-edge box.
- Replaced the `.about-split`/`.about-split--navy` reuse with a dedicated `.about-teaser` component in `assets/css/2a.css` (used only by `options/2a/index.md`) — the navy panel is taller than the photo and vertically centers it via CSS Grid `align-items: center`, and the photo overlaps ~64px into the panel with a drop shadow for depth. Overflow is intentionally not clipped (unlike `.about-split`'s bordered box) so the overlap can render. The About page's own flush `.about-split` block is untouched.
- Square corners kept throughout, per the earlier intentional deviation from the reference's rounded corners.

## 2026-08-14 — Homepage "About Marcia" editorial section, design ref 5b (Option 2 / "2a")

### Two-column photo/navy-panel section
- Rebuilt the homepage's "About Marcia" band (`options/2a/index.md`) to match design reference 5b: a two-column editorial section with the headshot flush against a solid navy panel (eyebrow label, serif pull-quote, "Read full bio" link), replacing the previous full-bleed photo-with-scrim treatment.
- Reused the existing `.about-split` component (already powering the About page's photo/copy block) rather than inventing new markup, adding an `.about-split--navy` modifier in `assets/css/2a.css` for the dark panel variant (navy background via the existing `--navy` token, teal eyebrow, white serif quote, white bold underlined link with a hover state). The About page's own (white-panel) usage of `.about-split` is unaffected.
- `.about-split__photo` gained `width/height: 100%` + `object-fit: cover` so the image reliably fills its grid column edge-to-edge and stays flush against the panel with no gap, on both variants.
- **Intentional deviation from reference 5b:** the reference shows rounded corners on the photo/panel; kept square corners throughout (no `border-radius` added) to stay consistent with Option 2a's existing sharp-edged design language (cards, buttons, book covers, etc. all use `--radius: 0`).
- Uses the real headshot at `assets/images/author/marcia-headshot.jpg` (already committed and already referenced by the About page) with descriptive alt text ("Marcia Mount Shoop"), not a placeholder.
- Responsive: stacks to a single column at the existing `900px` breakpoint, with a fixed photo height on mobile since the desktop grid-stretch technique doesn't apply once the columns collapse.

## 2026-08-13 — Anthologies, endorsements, forthcoming book date (Option 2 / "2a")

### Anthology / contributed-chapter entries
- Replaced the generic `anthologies.md` stub with ten individual book entries in `_books_2a/`, one per title the client listed, each with its own detail page (matching the site's existing per-book format): *The Routledge Handbook of Religion and the Body*, *Companion to Sacraments and Sacramentality*, *Erotic Faith: Desire, Transformation, and Beloved Community in the Incarnational Theology of Wendy Farley*, *Trauma and Transcendence: Suffering and the Limits of Theory*, *Parenting as Spiritual Practice and Source for Theology*, *Encountering the Sacred: Feminist Reflections on Women's Lives*, *Faithfully Feminist: Jewish, Christian, & Muslim Feminists on Why We Stay*, *Wide Open Spaces*, *Women, Writing, Theology: Transforming a Tradition of Exclusion*, *Feasting on the Word: Preaching the Revised Common Lectionary, Year B, Volume 1*.
- Ordered via the `order` field (5–14) to match the chronological (newest-first) sequence the client gave.
- Editor/foreword/afterword credits are populated for the four titles whose cover art was visible in chat (read directly off the cover images — *Erotic Faith*, *Encountering the Sacred*, *Faithfully Feminist*, *Feasting on the Word*); everything else (chapter topic, publisher, date, retail link) is left as a bracketed placeholder or `# TODO` comment pending client confirmation. No facts were fabricated.
- Two title collisions with the earlier placeholder-content prototypes ("Faithfully Feminist", "Trauma and Transcendence") were avoided with distinct slugs (`faithfully-feminist-anthology`, `trauma-and-transcendence-suffering-and-limits-of-theory`) — those earlier titles were fictional stand-ins from the original comparison-prototype phase and aren't part of Option 2's real content.

### Cover images — still pending
- Four of the ten anthology covers (Erotic Faith, Encountering the Sacred, Faithfully Feminist, Feasting on the Word) plus the author headshot arrived as chat attachments 2026-08-13 but could not be committed — same limitation noted in the 2026-07-30 entry below (this environment can't read chat attachments from disk). `assets/images/books/README.md` and the new `assets/images/author/README.md` document the expected filenames and the exact `cover:` / `<img>` line to uncomment once each file is dropped in.

### Endorsements
- Populated `_data/endorsements_2a.yml` for the three backlist titles (previously scaffolded empty) with real client-supplied quotes: two for *Let the Bones Dance* (Bonnie J. Miller-McLemore, Mary McClintock-Fulkerson), two for *Touchdowns for Jesus and Other Signs of Apocalypse* (Joseph Price/The Christian Century with the original review link, Robert Orr), and two for *A Body Broken, A Body Betrayed* (Willie James Jennings, Ellen T. Armour). `liberating-bodies` left empty per the existing note (expected mid-October 2026). No template changes needed — this data file was already wired up.

### Forthcoming book (Liberating Bodies)
- Added a confirmed on-sale date, May 11, 2027 (previously "expected Spring 2027" in a comment only, not shown on the page). New `on_sale_date` / `badge_label` front-matter fields drive a "Coming May 11, 2027" hero badge (replacing the hardcoded "New Release" text, which still applies by default to any other featured book) and an "On sale beginning May 11, 2027" note on both the homepage hero and the book detail page (`options/2a/index.md`, `_layouts/book-2a.html`, new `.hero__note` style in `assets/css/2a.css`).
- Pre-order system is still TBD, pending a same-day meeting between Marcia and her publisher's marketing team — left a `# TODO` in `liberating-bodies.md` rather than guessing at a pre-order CTA.

### Author headshot
- Client resolved the open "photo vs. background image" question left in the 2026-07-30 entry: the homepage's full-bleed "About Marcia" band and the About page's headshot slot should both use a current portrait headshot. Both `options/2a/index.md` and `options/2a/about.md` have their placeholder comments updated with the exact markup to swap in once the file (`marcia-headshot.jpg`) is committed to the new `assets/images/author/` folder.

## 2026-07-29 — Cover art, Amazon links, external-link affordances (Option 2 / "2a")

### Book cover images
- Added the actual cover image files to `assets/images/books/` (`body-broken.png`, `let-the-bones-dance.jpg`, `touchdowns-for-jesus.jpg`), fulfilling the note left in the previous entry. Updated the `cover:` paths in `let-the-bones-dance.md` and `touchdowns-for-jesus.md` to match the committed filenames (previously pointed at the original chat-attachment filenames).
- `assets/css/2a.css`: book-card and book-detail cover boxes now size via `aspect-ratio: 2 / 3` (was a fixed pixel height) with a `--bg-softer` background and `object-fit: contain` instead of `cover`, so the real cover art displays uncropped; the hero cover keeps `object-fit: cover` with `object-position: top`.

### Amazon affiliate links
- Added real Amazon URLs for all three backlist books (`a-body-broken-a-body-betrayed.md`, `let-the-bones-dance.md`, `touchdowns-for-jesus.md`), replacing the `#` placeholders.
- `bookshop_url` / `bn_url` removed (not offered for these titles on the live marciamountshoop.com site) and the `# TODO` comments replaced with a note explaining why, dated 2026-07-29.

### External links open in a new tab
- Added `target="_blank" rel="noopener"` to outbound links sitewide: footer social icons, the follow-along social links and Substack subscribe form (`_includes/2a/footer.html`, `_includes/2a/follow-along.html`), book vendor/Amazon buttons (`_layouts/book-2a.html`, `options/2a/index.md`), the Talks page's "Watch Sermons on YouTube" button, and the homepage press-strip links (which also gained a trailing &#8599; arrow).

### "View more" / "Read article" link affordances
- Added a small uppercase link label with an animated arrow icon (`.book-card__link`, `.contact-method__link`) to book cards (homepage, Books page), press cards (Press page), and the Talks/Press program cards on the homepage, so these clickable cards signal they're links.
- `options/2a/books.md`, `options/2a/index.md`, `options/2a/press.md`, `assets/css/2a.css`: markup and styling for the above.

### Consulting page inquiry section
- `options/2a/peace-ing-together-consulting.md`: restructured the `.inquiry` section so the navy background spans full width with content constrained to the page's `.wrap` inside a new `.inquiry__inner` grid, matching the full-bleed band pattern used elsewhere on the site (testimonials, CTA band). `assets/css/2a.css` updated accordingly, including the mobile breakpoint.

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
