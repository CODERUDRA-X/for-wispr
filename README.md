# CODERUDRA-X — Build. Break. Rebuild.

A multi-page, static portfolio and hiring pitch for Shreyansh Srivastava (CRX). It is built with Vite, React, TypeScript, HashRouter, Tailwind CSS, Motion, Lenis, GSAP / ScrollTrigger, Three.js, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

`npm run build` generates `public/og-image.svg` and `public/og-image.png`, runs the TypeScript project check, and builds static assets into `dist/`.

## Deploy

### GitHub Pages

1. Push the repository to GitHub.
2. In repository settings, enable Pages from GitHub Actions or deploy the generated `dist/` folder with your preferred static Pages workflow.
3. Keep `HashRouter` enabled: routes use `/#/thread`, `/#/builds`, etc., so the static host does not need rewrite rules.
4. The Vite `base` is `./` for relative asset paths. If a custom workflow changes the hosting base, test the generated Open Graph image URL on the deployed project URL.

### Netlify / Vercel

Set the build command to `npm run build` and the publish/output directory to `dist`. No server functions or environment variables are required.

## Architecture

- `src/content/site.ts` — source of truth for identity, metrics, chapter copy, builds, proposals, links, Q&A, and fill-slot metadata.
- `src/pages/` — one route per portfolio chapter.
- `src/components/` — site shell, voice demo, shader, project explainers, counters, and small visual primitives.
- `src/motion/` — Lenis + GSAP scroll bridge. Motion components use reduced-motion-aware defaults and CSS fallbacks.
- `src/lib/hinglishParser.ts` — small deterministic date parser for Vanshika's interaction.
- `scripts/generate-og.mjs` — build-time SVG-to-PNG Open Graph image generation.

## Design / engineering notes

- No login, backend, paid API, analytics, or tracking code is included.
- The speech demo uses the browser Web Speech API (`en-IN`). Browser recognition support and processing vary. The site does not persist audio or transcript. The sample button is explicitly labelled simulated.
- The AEGIS consensus and VidyutNetra inspection visuals are explanatory interactions, not live model inference. The Vanshika parser is a small honest rule set, not an LLM.
- Three.js is lazy-loaded on Home. It caps device pixel ratio at 2 and stops rendering while the canvas is offscreen or the document is hidden. CSS/SVG is used when WebGL is unavailable or reduced motion is preferred.
- `prefers-reduced-motion` disables smooth scrolling and selects static/quiet visual fallbacks. Keyboard navigation and visible focus are supported; Escape closes the menu.
- There are no stock photos or copied assets. Procedural visuals are generated in code.

## Reference research

- Motion Primitives: use the reference as a technique library, not an asset source. The custom primitives here are implemented in this project.
- Haikei: procedural SVG background ideas informed the custom shader and CSS/SVG scenes; no Haikei assets are copied.
- K95: the short navigation, overlay menu, statement-first home, and curated project presentation informed information architecture; its visual identity is not copied.
- HAOQI: inspected directly and cross-checked against Haoqi Wen’s August 15, 2026 Codrops technical breakdown. Five technique takeaways are documented in `FILL_CHECKLIST.md`; no reference assets or visual identity are copied.

## Known owner inputs still required

See [`FILL_CHECKLIST.md`](./FILL_CHECKLIST.md). The HAOQI reference observations are complete; owner-specific facts and links remain incomplete. Do not publish this as a final hiring pitch until the important role, logistics, project repository, and voice-receipt details have been replaced with verified information.
