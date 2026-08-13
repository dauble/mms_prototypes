# Book cover images

`_books_2a/*.md` front matter points at real cover images here (see the
`cover:` field in each book's front matter). The template code and CSS are
wired up to render them, but the binary image files themselves need to be
dropped into this folder before the `cover:` field is uncommented/added —
they arrive as chat attachments, which this environment can't read from
disk.

## Already committed

- `body-broken.png` — *A Body Broken, A Body Betrayed*
- `let-the-bones-dance.jpg` — *Let the Bones Dance*
- `touchdowns-for-jesus.jpg` — *Touchdowns for Jesus and Other Signs of Apocalypse*

## Still pending (2026-08-13)

Covers for these four were shared as chat attachments but couldn't be
committed. `_books_2a/*.md` for each has a commented-out `cover:` line
ready to uncomment once the file lands at the path shown:

- `erotic-faith.jpg` — *Erotic Faith: Desire, Transformation, and Beloved
  Community in the Incarnational Theology of Wendy Farley*
- `encountering-the-sacred.jpg` — *Encountering the Sacred: Feminist
  Reflections on Women's Lives*
- `faithfully-feminist-anthology.jpg` — *Faithfully Feminist: Jewish,
  Christian, & Muslim Feminists on Why We Stay*
- `feasting-on-the-word.jpg` — *Feasting on the Word: Preaching the
  Revised Common Lectionary, Year B, Volume 1*

No cover art at all has been supplied yet for six other anthology/chapter
entries added 2026-08-13 (*The Routledge Handbook of Religion and the
Body*, *Companion to Sacraments and Sacramentality*, *Trauma and
Transcendence: Suffering and the Limits of Theory*, *Parenting as
Spiritual Practice and Source for Theology*, *Wide Open Spaces*, *Women,
Writing, Theology: Transforming a Tradition of Exclusion*) — these were
title-only requests with no image attached.

Once a file is added (e.g. via the GitHub web UI's "Add file" on this
branch/PR, or a follow-up commit) and its `cover:` line is uncommented,
the placeholder `BOOK COVER` blocks on the homepage hero, book grids, and
book detail pages automatically switch to the real `<img>` — no further
template changes needed.
