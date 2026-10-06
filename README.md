# Batsambuu Batbold · Portfolio

Personal site: mathematics, data, and software, with a few Mongolian details.

[View the website](https://basabu1.github.io/Portfolio/)

## Stack

-   [Astro](https://astro.build) static site, near-zero JavaScript
-   `d3-geo` + `world-atlas` for the journey globe (pre-rendered at build time; the
    scroll-driven version loads only when the section is near)
-   `sharp` (via Astro) for image optimization, the favicon, and the social preview image
-   GitHub Actions → GitHub Pages

## Editing content

Nearly all text lives in **`src/data/site.ts`**: contact links, facts, projects,
experience, honors, journey stops, Mosaic galleries, and the footnotes. Layout lives in
`src/components/` and `src/pages/`.

Résumé PDFs are in `public/`. Replace a file with the same name to update it.

Footnotes are numbered per page, in reading order: each page lists the note ids it uses
at the top of its file (`Astro.locals.notes = [...]` in `src/pages/*.astro`).

The Mongolian script (hero name and seal) is turned into vector shapes at build time
from Noto Sans Mongolian (`src/lib/mongol.ts`), so no web font is loaded for it.

## Development

```bash
npm install
npm run dev      # http://localhost:4321/Portfolio/
npm run build    # outputs to dist/
npm run preview
```

## Deployment

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`.
One-time setup: GitHub repo → Settings → Pages → Source: **GitHub Actions**.
