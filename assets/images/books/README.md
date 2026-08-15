# Book cover images

`_books/*.md` front matter points at real cover images here (see the
`cover:` field in each book's front matter). All covers have now arrived
and are committed, each as a JPEG/PNG original plus a `.webp` copy — the
`<picture>` markup in `index.md` and `_layouts/book.html`
serves the `.webp` version where supported (derived from the `cover:`
path via a Liquid `replace` filter) and falls back to the original.

## Committed

- `body-broken.png` / `.webp` — *A Body Broken, A Body Betrayed*
- `let-the-bones-dance.jpg` / `.webp` — *Let the Bones Dance*
- `touchdowns-for-jesus.jpg` / `.webp` — *Touchdowns for Jesus and Other Signs of Apocalypse*
- `erotic-faith.jpeg` / `.webp` — *Erotic Faith: Desire, Transformation, and Beloved Community in the Incarnational Theology of Wendy Farley*
- `encountering-the-sacred.jpeg` / `.webp` — *Encountering the Sacred: Feminist Reflections on Women's Lives*
- `faithfully-feminist.jpg` / `.webp` — *Faithfully Feminist: Jewish, Christian, & Muslim Feminists on Why We Stay*
- `feasting-on-the-word.jpeg` / `.webp` — *Feasting on the Word: Preaching the Revised Common Lectionary, Year B, Volume 1*
- `routledge-handbook.jpeg` / `.webp` — *The Routledge Handbook of Religion and the Body*
- `sacraments-and-sacramentality.jpg` / `.webp` — *Companion to Sacraments and Sacramentality*
- `trauma-and-transcendence.jpg` / `.webp` — *Trauma and Transcendence: Suffering and the Limits of Theory*
- `parenting-as-spiritual-practice.jpg` / `.webp` — *Parenting as Spiritual Practice and Source for Theology*
- `wide-open-spaces.jpg` / `.webp` — *Wide Open Spaces*
- `women-writing-theology.jpg` / `.webp` — *Women, Writing, Theology: Transforming a Tradition of Exclusion*

## Still pending

- *Liberating Bodies* (forthcoming, on sale May 11, 2027) — no cover art yet; `_books/liberating-bodies.md` has no `cover:` field, so its `hero__cover`/`book-card__cover` slots render the `placeholder-block` ("BOOK COVER") treatment by default.

Delete this README once *Liberating Bodies*' cover lands and every book has one.
