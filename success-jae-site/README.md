# Success Jae — Scroll-Cinematic Site

A premium black + gold "3D scroll" site for the **Success Jae** personal brand
(AI Integration · Automation · Business Consulting). Built with the
`scroll-cinematic` skill: a canvas image-sequence scrub (Lenis smooth scroll +
scroll-synced overlay copy) across two cinematic sections, plus branded story,
services, results, and contact sections.

## Run it

```bash
cd success-jae-site
python3 -m http.server 8137
# open http://localhost:8137
```

…or double-click **`Launch Demo.command`** (macOS/Linux) — it frees the port,
starts the server, and opens the browser. Keep the window open while recording.

## How the effect works

`scroll-cinematic.js` preloads a numbered JPG sequence per section and paints the
frame chosen by scroll progress onto a `<canvas>` (cover-fit, HiDPI). Scrolling
forward/back "plays" the clip. The "3D" comes entirely from the source footage.
Config lives at the bottom of `index.html` in `window.SCRUB_SECTIONS`.

```
frames/hero/    frame_0001.jpg … frame_0150.jpg   → #hero scrub
frames/reveal/  frame_0001.jpg … frame_0150.jpg   → #reveal scrub
vendor/lenis.min.js                               → smooth scroll (vendored from npm)
```

## Higgsfield assets

A high-end cinematic hero keyframe + two **1080p** clips were generated with the
Higgsfield MCP for this brand (molten liquid-gold on deep black):

| Asset | Higgsfield job id |
|-------|-------------------|
| Hero keyframe (image)      | `c9410e16-a77e-4840-bbd1-68502721ed73` |
| Clip 1 — slow gold orbit   | `66599dc4-2a08-4f63-858a-4bc6a2db41ec` |
| Clip 2 — data-stream fly-through | `8e8375d0-ff21-415a-8b3b-76e8c0491530` |

> **Why the live site currently uses locally-rendered frames:** this build ran
> inside a remote sandbox whose network policy blocks the Higgsfield CDN
> (`*.cloudfront.net`) and `unpkg.com` (`x-deny-reason: host_not_allowed`), so the
> rendered `.mp4`s couldn't be downloaded *into the container* to slice. The two
> scroll sections therefore use an on-brand gold/black hero generated locally with
> ffmpeg. Your own browser is **not** restricted — you can view and download the
> Higgsfield clips from your account and swap them in (below).

## Swap in the real Higgsfield clips

On any machine with normal network access (and `ffmpeg`):

```bash
# 1. Download the two clips from your Higgsfield account (results.rawUrl), e.g.:
curl -L -o hero.mp4   "<rawUrl of 66599dc4-...>"
curl -L -o reveal.mp4 "<rawUrl of 8e8375d0-...>"

# 2. Slice + compress into the existing frame folders (skill scripts):
SK=~/.claude/skills/scroll-cinematic/scripts
bash "$SK/extract-frames.sh"  hero.mp4   frames/hero   150
bash "$SK/extract-frames.sh"  reveal.mp4 frames/reveal 150
bash "$SK/compress-frames.sh" frames/hero   1600 88
bash "$SK/compress-frames.sh" frames/reveal 1600 88
```

`frameCount` is already `150` for both sections — if a clip yields a different
count, update the matching `SCRUB_SECTIONS` entry in `index.html`. No other
changes needed.

## Notes

- Stats in the **Results** section are illustrative placeholders — swap for real numbers.
- All copy is drawn from the brand's existing site; social links are stubs (`#`).
