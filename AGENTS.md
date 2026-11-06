# AGENTS.md

## Project
Fireplace Ad (variant B): three separate ads (top 1032x250, left 320x975, right 320x975 CSS px) and preview.html showing them side by side. Task description: docs/TASK-B.md.
Talk to me in Polish. Code, comments and commits in English.

## Stack (nothing else)
Plain HTML, CSS and vanilla JS (ES6+, classic script tags). GSAP core from lib/gsap.min.js. No frameworks, bundlers, npm packages, CDN or tests. Desktop browsers.

## Files
variant-b-fireplace/: top, left, right, preview, each with its own .html, .css and .js. Plus lib/ and assets/ (provided: do not edit, rename or add files there).
README.md and DECISIONS.md at the repo root.

## Rules
- Images are 2x: render them at 50% of their pixel size with explicit width and height.
- Use only the positions and texts I give in the prompt. Never guess them from an image.
- CSS: BEM (block__element--modifier), classes only, no ids, no inline styles, no !important. Blocks: "ad" and "preview". JS uses the same classes.
- Animate only transform and opacity. Start the intro on window load. Respect prefers-reduced-motion (final state, no motion). The idle loop is calm and stops after about 30 s.
- Clickout: const clickTag = window.clickTag || 'https://example.com/landing'; each part is one <a> with href=clickTag, target="_blank", rel="noopener noreferrer", wrapping all layers.
- Accessibility: visible :focus-visible outline, alt text only from the words I give (decorative images alt=""), <html lang> and <title> set, iframes in preview have a title.
- Keep it simple. Small diffs, no extra files or dependencies, no refactoring I did not ask for. Ask if something is unclear. After each change explain in 3-5 sentences what and why.

## Git
- Run `git status` before a new task. If there are uncommitted changes, stop and tell me.
- Never commit or push. Propose a commit message: `type(scope): description` (chore, feat, fix, perf, docs).
- Never rewrite history. Never add node_modules or large files.