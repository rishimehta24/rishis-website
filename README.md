# Rishi Mehta — personal site

Static, dependency-free. Two files do the work:

- `index.html` — all content. Edit text directly.
- `styles.css` — palette and type at the top (`:root`). Colours are the Ascenix palette: `#0CC7ED` / `#E8E8E8` / `#0F0F14`. Font is Inter.
- `script.js` — one thing: reveals the story items as you scroll. Delete it and the page still works.

## Run locally

```sh
npx serve .
```

## Deploy

Any static host works with zero config: Vercel, Netlify, Cloudflare Pages or GitHub Pages. No build step.

## Images (`img/`)

- `sanfrancisco.jpg` (hero) is AI-generated scenery. Swap it for a real photo by replacing the file; same filename, nothing else to change.

## Updating

- **Off duty list**: add `class="done"` to an `<li>` to check it off.
