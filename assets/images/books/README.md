# Book cover images

`_books_2a/*.md` front matter now points at real cover images here (see the
`cover:` field in each book's front matter). The template code and CSS are
wired up to render them, but the binary image files themselves still need to
be dropped into this folder — they weren't committed in this round because
they arrived as chat attachments, not as files this environment could read
from disk.

Expected filenames (matching what `_books_2a/*.md` already reference):

- `body-broken.png` — *A Body Broken, A Body Betrayed*
- `Let_the_Bones_Dance_COVER_IMAGE.jpg` — *Let the Bones Dance*
- `Touchdowns_for_Jesus_COVER_IMAGE.jpg` — *Touchdowns for Jesus and Other Signs of Apocalypse*

Once added (e.g. via the GitHub web UI's "Add file" on this branch/PR, or a
follow-up commit), the placeholder `BOOK COVER` blocks on the homepage hero,
book grids, and book detail pages will automatically switch to the real
`<img>` — no further template changes needed.

Delete this README once the real files are in place.
