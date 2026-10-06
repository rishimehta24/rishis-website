# Rishi Mehta — personal site

Static, dependency-free, no build step.

- `index.html` — all content. Edit text directly.
- `styles.css` — palette and type live at the top (`:root`). Colours are the Ascenix palette: `#0CC7ED` / `#E8E8E8` / `#0F0F14`. Font is Inter.
- `script.js` — one thing: reveals the story items as you scroll. Delete it and the page still works.
- `img/` — the four hero photos (`me-*.jpg`). Replace a file to swap a photo; crop position per cell is set in `styles.css` (`object-position`).
- `Staticfile` — tells Railway (Railpack/Nixpacks) to serve this folder as a static site.

## Run locally

```sh
python3 -m http.server 4173
# or: npx serve .
```

## Deploy on Railway

1. New Project → Deploy from GitHub repo → pick this repo, branch `main`.
2. Railway detects the `Staticfile` and serves the folder. No build command, no start command, no env vars.
3. Settings → Networking → Generate Domain (or add a custom domain).

Every push to `main` redeploys.

## Cache busting

`styles.css` and `script.js` are referenced with `?v=N` in `index.html`. Bump the number when you change either file.
