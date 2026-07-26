# A Little World, Just For Her

A cinematic, single-page birthday gift website. Lock screen → welcome →
keyword story journey → gallery → timeline → surprise letter → finale.

Pure HTML/CSS/JS. No frameworks, no build step — just open `index.html`.

## Quick start

1. Unzip / copy the folder.
2. Drop your photos into `assets/images/` and (optionally) a piano
   track into `assets/music/piano.mp3`.
3. Open `script.js` and edit the block clearly marked
   `============ CUSTOMIZE ============` at the top. That's the only
   file you need to touch for content changes:
   - `LOCK` — set your real password and/or accepted answers to the
     personal question.
   - `HER_NAME` — shown in the welcome sequence.
   - `backgrounds` — six full-screen images, one per section, in order:
     welcome, story, gallery, timeline, surprise, finale.
   - `memories` — the keyword story. Add/remove/reorder freely; the
     unlock sequence follows the array order automatically.
   - `gallery` — photos for the polaroid gallery.
   - `timeline` — your relationship timeline entries.
   - `letterLines` — the surprise letter, one array entry per line.
4. Open `index.html` in a browser (or host it — see below).

## Hosting it so only she can open it

The password/question screen is a friendly gate, not real security —
anyone who opens dev tools can read `script.js`. If you want it to
feel private:
- Host it somewhere unlisted (e.g. a free static host) rather than a
  public gallery/portfolio site, and only share the link with her.
- Don't rely on this for anything sensitive; it's a wrapping-paper
  lock, not a vault.

Simple free hosting options: GitHub Pages, Netlify, Vercel, or
Cloudflare Pages — drag-and-drop the folder in and you get a live
link in under a minute.

## Assets you still need to add

- `assets/images/photo1.jpg` … `photo6.jpg` — the six section
  backgrounds.
- `assets/images/smile.jpg`, `eyes.jpg`, etc. — one small image per
  keyword card (optional; cards work fine without one, they'll just
  show a soft placeholder panel).
- `assets/images/gallery1.jpg` … `gallery6.jpg` — gallery polaroids.
- `assets/music/piano.mp3` — a soft instrumental loop. Keep it
  royalty-free/licensed for your use case if you plan to share this
  beyond just the two of you.

If a listed image is missing, that slot just shows a soft tinted
panel instead of breaking — nothing else on the page depends on it.

## Structure

```
index.html   — markup for every section
style.css    — design tokens + all styling/animation
script.js    — CUSTOMIZE block + all interactivity
assets/
  images/    — your photos go here
  music/     — your instrumental track goes here
  fonts/     — unused by default (Google Fonts are loaded via CDN);
               drop local font files here if you'd rather self-host
```

## Notes on the design

- Palette: deep aubergine-black, twilight purple, rose-gold, muted
  mauve-pink, soft violet — a dark luxury theme rather than a bright
  "party" palette.
- Type: Cormorant Garamond (display/romantic), Jost (clean body),
  Dancing Script (the handwritten letter).
- Signature element: a constellation heart in the top-right corner
  that fills in as she scrolls through the story — it's "complete"
  right as the finale begins.
- Respects `prefers-reduced-motion`, has visible keyboard focus
  states throughout, and the custom cursor auto-disables on
  touch/coarse-pointer devices.
- Press `H` at any time after unlocking for a small floating heart —
  a little easter egg, mentioned briefly in a toast after the welcome
  sequence.
