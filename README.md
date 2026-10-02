# rishimehta — personal site

Static, dependency-free. Three files do the work:

- `index.html` — all content lives here. Edit text directly.
- `styles.css` — design tokens at the top (`:root`). Palette is the Ascenix palette: `#0CC7ED` / `#E8E8E8` / `#0F0F14`; fonts match ascenix.co (Newsreader, Plus Jakarta Sans, IBM Plex Mono).
- `script.js` — live SF clock, reveal-on-scroll, count-up numbers, active nav link, hero cursor glow.

## Run locally

```sh
npx serve .
```

Then open the URL it prints (usually http://localhost:3000).

## Deploy

Any static host works with zero config: drop the folder on Vercel, Netlify, Cloudflare Pages or GitHub Pages. No build step.

## Updating

- **Now** section: edit the list in `#now` and bump the `Updated …` label.
- **The list** (`#off-duty`): add `class="done"` to an `<li>` when something gets checked off.
- **Stats**: numbers live in `data-count` attributes so the count-up animation picks them up.
