# Contact form worker

Handles POSTs from the Option 2 Contact page and the Peace-ing Together
Consulting inquiry form. GitHub Pages (where this site deploys) can't
run server code, so this Worker sits in front of `davidauble.com` —
already Cloudflare-proxied — and intercepts just `/mms_prototypes/api/*`,
verifies a Turnstile challenge, and emails the submission via Resend.
Everything else on the domain still serves from GitHub Pages untouched.

## One-time setup (requires your Cloudflare + Resend accounts)

1. **Install deps**
   ```
   cd cf-worker
   npm install
   ```

2. **Log in to Cloudflare**
   ```
   npx wrangler login
   ```

3. **Create a Turnstile widget** — Cloudflare dashboard → Turnstile →
   Add widget → domain `davidauble.com`. Copy the **Site Key** and
   **Secret Key** it gives you.

4. **Create a Resend account** (or swap in whatever email API you
   prefer — SendGrid/Mailgun/Postmark all work the same way, just
   change the `fetch` call in `src/index.js`). Verify a sending domain
   (or subdomain, e.g. `mail.davidauble.com`) under Resend → Domains,
   and set `FROM_EMAIL` in `wrangler.toml` to an address on that
   domain. Create an API key.

5. **Set the two secrets** (never commit these):
   ```
   npx wrangler secret put TURNSTILE_SECRET_KEY
   npx wrangler secret put RESEND_API_KEY
   ```

6. **Set the real destination email** — edit `TO_EMAIL` in
   `wrangler.toml` (currently a placeholder) to Marcia's actual inbox.

7. **Deploy**
   ```
   npx wrangler deploy
   ```
   This registers the route from `wrangler.toml`, so Cloudflare starts
   sending matching requests to the Worker instead of GitHub Pages.

8. **Put the Turnstile Site Key into the Jekyll site** — set
   `turnstile_site_key` in `_config.yml` (repo root, not this folder)
   to the Site Key from step 3, then commit/push so the site rebuilds
   with the real widget instead of Cloudflare's always-pass test key.

9. **Test**: submit both forms on the live site and confirm the email
   arrives, then submit again with a browser extension or curl that
   skips the Turnstile widget to confirm it's actually rejected.

## Local development

`npx wrangler dev` runs the Worker locally, but Turnstile verification
and the Resend call both need real values in `.dev.vars` (see
Wrangler's docs for `wrangler secret` vs `.dev.vars`) — the always-pass
Turnstile test keys (sitekey `1x00000000000000000000AA`, secret
`1x0000000000000000000000000000000AA`) are useful here so you're not
solving a live CAPTCHA in dev.
