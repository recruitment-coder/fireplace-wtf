# Decision log

- Keep each ad as a separate HTML, CSS, and JavaScript creative because they are delivered as three separate parts. Use the provided local `lib/gsap.min.js` rather than a CDN, so the animation library is available with the creative files without a runtime network dependency. The shared `reset.css` is linked by the pages; no framework or build step is used.
- Keep Variant A and Variant B in separate repositories so each deliverable has a focused codebase and history and can be run and reviewed independently.
- Use the supplied per-part `bg.jpg` files as each ad's background. The pages reference `assets/top/bg.jpg`, `assets/left/bg.jpg`, and `assets/right/bg.jpg`, rather than one continuous background image, so each creative keeps its own pre-cut background.
- Render the ads at their fixed design dimensions: 1032x250 CSS px for the top and 320x975 CSS px for each skyscraper. The preview places them in fixed-size iframes around a solid `#242424` website placeholder.
- Keep the supplied `assets/top/hl.png` unchanged and animate it as one complete image. The top page does not split the headline into separate lines.
- Keep the supplied `assets/box.png` unchanged and use `clip-path: inset(744.5px 0 61px)` to show only the panel region. The supplied copy image's black area is visually removed with `mix-blend-mode: screen`.
- Keep the supplied logo and CTA images unchanged. The skyscraper CTA is positioned with CSS at `left: 73.75px` and `bottom: 95px`, with a rendered size of 172.5x46.5 CSS px.
- Make each creative a single click-through link using `window.clickTag` when provided and `https://example.com/landing` as the fallback.
- Use local GSAP timelines for intro and idle animation. The intro duration is 4.5 seconds; the idle loop stops after 15 seconds to limit distraction, although the brief suggests about 30 seconds. Consider adding a pause/stop control in the future to improve accessibility. Reduced-motion preferences show the final state without playing the animation.
- Synchronize preview starts with the `start-ad` `postMessage` payload after all three iframes load. Ads accept it only from their parent window and use a five-second fallback when embedded. The sender uses `'*'` as `targetOrigin`.
