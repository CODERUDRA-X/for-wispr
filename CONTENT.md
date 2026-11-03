# Editing site content

The typed content source is `src/content/site.ts`. Edit that file for owner facts, links, metrics, chapter summaries, campaign proposals, Q&A answers, and the project list.

## Rules

1. Only use claims you can substantiate. Keep the source terminology and exact figures.
2. `metrics` contains the supplied Home-strip figures. Update the `note` when you have a verified date or definition.
3. `chapters` drives the five-chapter Thread page. Each chapter uses the same four-part structure: did, wrong, learned, next. Missing values are represented with `null` and a visible fill chip in the page.
4. `builds` describes the three selected projects. Set `repo` to an exact public URL only after verifying it. Current missing AEGIS-SWARM and Vanshika links are intentionally not guessed.
5. `campaigns` are proposed growth experiments. Keep the `PROPOSAL` tag and metrics labelled as proposed until measured results exist.
6. `askItems` provides the six local, pre-written Q&A answers. No AI API is called.
7. `fills` maps visible fill chips to the file path and the specific information required. Keep it in sync if a placeholder is added or removed.

## Page-specific content

- Home reads `identity`, `metrics`, and `campaigns`.
- The Thread reads `chapters` and `fills`.
- Builds reads `builds` and `arsenal`; project interactions are in `src/components/BuildVisuals.tsx`.
- Community uses the 600+ and 2 attendee figures and the fill checklist in `src/pages/Community.tsx`.
- Campaigns reads `campaigns` and preserves the proposal framing.
- Voice receipts are intentionally left as fill chips in `src/pages/Voice.tsx` until a real raw/cleaned pair is supplied.
- Ask reads `askItems`.
- Contact reads `identity` and `links`; logistics are fill chips until the owner provides confirmed details.

## Vanshika parser

`src/lib/hinglishParser.ts` contains the deterministic grammar. It supports numeric `ghante` / `minute` + `baad`, and date/day-part tokens `kal`, `parso`, `subah`, `shaam`, and `raat`. It intentionally states assumptions and limitations in the UI. Expand the parser only with tested examples and explicit grammar rules.
