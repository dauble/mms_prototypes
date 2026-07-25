# Changelog

All notable changes made during feedback/iteration sessions on this prototype site are logged here, newest first.

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
