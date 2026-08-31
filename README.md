# utshabkg.github.io

[![Author](https://img.shields.io/badge/author-utshabkg-red)](https://github.com/utshabkg/)
[![Stars](https://img.shields.io/github/stars/utshabkg/utshabkg.github.io?style=social)](https://github.com/utshabkg/utshabkg.github.io/stargazers)

Personal portfolio of **Utshab Kumar Ghosh** - ML Engineer & Researcher.
Live at <https://utshabkg.github.io/>.

Zero-build static site: plain HTML + one stylesheet + one small JS file.
Edit → commit → push to `master` → GitHub Pages deploys automatically.

## Layout

| Path | What it is |
|---|---|
| `index.html` | The whole portfolio (one page). Sections are marked with `<!-- ==== SECTION ==== -->` banners. |
| `gallery.html` | Certificate gallery with filters and a lightbox. |
| `404.html` | Not-found page. |
| `css/styles.css` | The only stylesheet. Colors/fonts/spacing are CSS variables at the top ("design tokens"). |
| `js/main.js` | The only script: theme toggle, mobile nav, filters, lightbox. |
| `assets/img/` | Optimized images (WebP, lowercase names, no spaces). |

## Common edits

- **New publication** → copy an `<article class="pub-item">` block in the Research section of `index.html`.
- **New project** → copy an `<article class="project-card">` block; set `data-tags` to `ml`, `web` and/or `other`.
- **New certificate** → resize the image to ~900px-wide WebP, drop it in `assets/img/`, copy a
  `<figure class="gallery-item">` block in `gallery.html`.
- **New CV** → replace the file inside the existing Google Drive share (all CV buttons point to that Drive link).
- **Change colors** → edit the token blocks at the top of `css/styles.css` (`:root` = dark, `[data-theme="light"]` = light).

## Checks before pushing

Serve locally and click around (`python3 -m http.server`, then open <http://localhost:8000>),
including at a phone-sized window and in both dark and light themes.
