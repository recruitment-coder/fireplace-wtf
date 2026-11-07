# Decision log

- Use the supplied `assets/top/hl.png` unchanged, even though its headline differs from the reference design. Do not recreate or replace the artwork without an approved asset; revisit this decision if a corrected file is provided.
- Use each part's supplied `bg.jpg` as its self-contained background. The ads are delivered as separate creatives, and these images are already cropped to each part's dimensions, avoiding manual offsets from a single shared image. This also lets us replace or adjust one part's background independently. Verify that the seams align in `preview.html`.
- Keep the supplied `assets/box.png` unchanged and use CSS `clip-path` to show only the lower text-panel region. This hides the asset's opaque black area outside the panel without editing the provided file.
- Treat `assets/top/hl.png` as a single finished image and animate it as one layer rather than splitting its rasterized text into lines. Animate only the top assets that are actually provided; do not invent missing logo or CTA layers.
