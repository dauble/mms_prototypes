# marciamountshoop.com

A Jekyll site for author Marcia Mount Shoop, built from the "Author Site
Options" design exploration — direction **3a (Soft Rounded)**: a navy /
teal / coral / green palette with pill buttons, rounded cards & covers,
and circular social icons. The Book Detail, Writing & Talks, and Speaking
pages are restyled to match.

## Structure

- `_layouts/` — `default` (site chrome), `book` (book detail pages),
  `writing-entry` (individual blog/sermon/press entries)
- `_includes/` — nav, footer, follow-along module, CTA band, Person
  schema
- `_books/` — one file per book (collection, output to `/books/:slug/`)
- `_writing/` — blog posts, sermons, and press mentions (collection,
  output to `/writing-and-talks/:slug/`)
- `index.md`, `books.md`, `about.md`, `writing-and-talks.md`,
  `speaking.md`, `contact.md` — top-level pages
- `assets/css/main.css` — design system (colors, type, components)
- `assets/js/nav.js` — mobile nav toggle + Writing & Talks type filter

## Local development

```sh
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000`.

## Before launch — placeholders to replace

- **Book covers & author photos**: currently CSS placeholder blocks
  labeled `BOOK COVER` / `AUTHOR PHOTO`. Drop real images into
  `assets/images/` and swap the `.placeholder-block` markup for `<img>`
  tags.
- **Affiliate links**: `amazon_url` / `bookshop_url` / `bn_url` in each
  `_books/*.md` file are `#` — fill in real Amazon Associates /
  Bookshop.org / B&N affiliate links.
- **Bracketed copy**: text like `[Marcia's fuller description goes
  here…]` throughout `_books/`, `_writing/`, `about.md`, and
  `speaking.md` marks real content Marcia still needs to supply.
- **Social URLs**: update `social_links` in `_config.yml`.
- **Forms**: the Speaking and Contact page forms are wired for
  [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify`
  attributes). If not hosting on Netlify, swap the `action`/attributes
  for your form backend of choice (e.g. Formspree).
- **`site.url`** in `_config.yml` should match the live domain — it
  feeds canonical URLs, sitemap.xml, and Open Graph tags.

## SEO / AEO / social sharing

- `jekyll-seo-tag` generates `<title>`, meta description, canonical, and
  Open Graph / Twitter Card tags from each page's front matter.
- `jekyll-sitemap` generates `/sitemap.xml`; `/robots.txt` points to it.
- `schema.org/Person` JSON-LD is included on every page; each book page
  adds `schema.org/Book` JSON-LD.
- `/llms.txt` gives AI answer engines a plain-text summary of Marcia's
  books, writing, and speaking.
- Every page footer carries an FTC-compliant affiliate disclosure.
