# Fireplace Ad

Three separate HTML ad creatives: a 1032x250 top banner and 320x975 left and right skyscrapers. The root-level preview places them around a plain website placeholder.

## Technologies

- HTML5 and CSS
- Vanilla JavaScript (ES6+) with classic script tags
- Local GSAP core from `lib/gsap.min.js`

There is no build step, framework, package manager, or CDN dependency.

## Run locally

1. Open this repository in VS Code and start the Live Server extension from the repository root.
2. Open `/preview.html` on the local server (for example, `http://127.0.0.1:5500/preview.html`).

Each creative can also be opened directly at `/top/top.html`, `/left/left.html`, or `/right/right.html`.

## Current behavior

- The preview starts all three iframe animations after the frames load. An embedded ad accepts the `start-ad` message from its parent and starts after five seconds if the message does not arrive.
- An ad opened on its own starts on page load. With `prefers-reduced-motion`, it displays its final state without playing the animation.
- Each ad is one click-through link. The destination defaults to `https://example.com/landing` and can be overridden with `window.clickTag`.
- The provided assets and local GSAP are about 1.66 MiB combined with the ad and preview files; no image compression step is configured.

## Next steps

- Replace the top headline asset if an approved corrected version is provided; the current page uses the supplied `assets/top/hl.png` as one image.

## Known issues and shortcuts

- The preview and ads use fixed pixel dimensions and are intended for desktop; they do not scale to fit a smaller viewport.
- The preview uses a solid `#242424` area as a stand-in for the website.
- `preview.js` posts to `'*'`; each ad checks that the message came from `window.parent` and that its payload is exactly `start-ad`.
- The supplied panel and copy images have black areas. The panel is cropped with CSS `clip-path`, and the copy uses `mix-blend-mode: screen`; the source assets are left unchanged.
- No automated test suite is included; verify changes in a browser.

## AI note

Claude was used for planning; all other AI-assisted work was done in GitHub Copilot. One AI-generated pass missed the black areas in the supplied panel and copy images. I kept the assets unchanged and corrected the rendering with `clip-path` for the panel and `mix-blend-mode: screen` for the copy.
