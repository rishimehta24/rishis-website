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

- `sanfrancisco.jpg` (hero) and `cockpit.jpg` (off duty) are AI-generated scenery. Swap any of them for real photos by replacing the file; same filename, nothing else to change.
- `carer-with-resident.jpg`, `ascenix-a-mark-3d.png` are Ascenix brand assets from ascenix.co.
- The About section photo is the natural slot for a real photo of you (ideally from the retirement home). Replace `carer-with-resident.jpg` or point the `<img>` in `#about` at a new file and update the caption.

## Updating

- **Now**: edit the list in `#now` and the "Updated …" label.
- **Off duty list**: add `class="done"` to an `<li>` to check it off.
