# FILL checklist — owner action required

The site intentionally renders each missing item as a dashed chip. Replace these with verified details; do not turn proposals into claimed results.

| # | Missing input | Current location | What to supply |
|---:|---|---|---|
| 1 | Origin: what went wrong | `src/content/site.ts` → `chapters[0].wrong` | One short, matter-of-fact sentence. |
| 2 | Builder: what went wrong | `src/content/site.ts` → `chapters[1].wrong` | A concrete builder setback. |
| 3 | Wispr Flow: personal product-fit reason | `src/content/site.ts` → `askItems[4]` | Why this product and why now, grounded in your experience. |
| 4 | How Vibe Coding Hack reached 600+ attendees | `src/pages/Community.tsx` | Exact role, distribution channels, partners, and what drove attendance. |
| 5 | Brand Ideathon learning | `src/content/site.ts` → `chapters[2].learned` | What you misread and what changed in your approach. |
| 6 | Community changes after the Ideathon | `src/pages/Community.tsx` | Concrete changes to validation, event design, or distribution. |
| 7 | Next community target | `src/pages/Community.tsx` | Target number, timeframe, and success definition. |
| 8 | Exact Innovate 2026 role | `src/content/site.ts` → `chapters[3]`, `askItems` | Official title, scope, decisions owned, team size, and reporting line. |
| 9 | Internship availability | `src/pages/Contact.tsx` | Earliest start, weekly hours, semester constraints, and duration. |
| 10 | Bangalore plan | `src/pages/Contact.tsx` | Relocation possibility, timeline, and constraints. |
| 11 | AEGIS-SWARM public repository URL | `src/content/site.ts` → `builds[0].repo` | Exact public repo URL. |
| 12 | Vanshika public repository URL | `src/content/site.ts` → `builds[2].repo` | Exact public repo URL. |
| 13 | Raw spoken excerpt | `src/pages/Voice.tsx` | A real, unedited voice transcript. |
| 14 | Cleaned version of that excerpt | `src/pages/Voice.tsx` | Faithful edit of the same transcript. |
| 15 | Builder: what I learned | `src/content/site.ts` → `chapters[1].learned` | A specific lesson from the three selected builds. |
| 16 | Builder: what I did next | `src/content/site.ts` → `chapters[1].next` | Concrete next action after this builder chapter. |
| 17 | Why growth | `src/content/site.ts` → `askItems[2]` | Fact-backed reason for growth work, with an example. |
| 18 | Scale: what I learned | `src/content/site.ts` → `chapters[3].learned` | Operational lesson from Innovate 2026. |
| 19 | Scale: what I did next | `src/content/site.ts` → `chapters[3].next` | Concrete next step after the event. |
| 20 | Now: what I learned | `src/content/site.ts` → `chapters[4].learned` | What you learned that informs the growth plan. |
| 21 | Now: next action | `src/content/site.ts` → `chapters[4].next` | Specific next action, separate from the proposed campaigns. |

| 22 | Scale: what went wrong | `src/content/site.ts` → `chapters[3].wrong` | A real operational setback from Innovate 2026, or confirm there was none you want to report. |

## HAOQI reference takeaways (researched)

1. **One source of truth for pointer coordinates.** Normalize pointer coordinates once and share them across DOM and WebGL effects; reset them when the pointer leaves or the tab loses focus.
2. **One scroll source.** Keep DOM scroll and WebGL motion on the same timing source so pinned or scrubbed scenes do not drift.
3. **Give DOM and WebGL different jobs.** DOM owns content, typography, structure, and accessibility; shaders should be reserved for effects that genuinely benefit from them.
4. **Build a reusable interaction language.** A dot-matrix reveal can connect project-card hover, image entry, loading, and navigation transitions without copying the reference's visual identity.
5. **Budget effects before polishing them.** Reduced-motion should skip shader transitions, and mobile shutoff conditions/performance budgets should be decided early—not bolted on after the showcase animation.

Sources: [HAOQI.DESIGN](https://haoqi.design/) and [Codrops technical breakdown by Haoqi Wen (15 Aug 2026)](https://tympanus.net/codrops/2026/08/15/inside-haoqi-design-letting-dom-and-webgl-share-a-retro-futurist-stage/). These are technique notes, not copied assets or styling.

## Optional assets / polish

- Add screenshots, logos, or photos only when they are supplied and cleared for use. Current visuals are procedural SVG, CSS, canvas, or WebGL.
- Add a verified contact email only when ready; the current CTA points to LinkedIn instead of inventing an address.
- Confirm each metric's date, source, and exact definition before public release, especially the 1,700+ rating and 2,390 follower snapshot.

## Publish gate

Do not publish until all high-impact fields are complete: exact Innovate role, Vibe Coding Hack acquisition story, community learning/next target, Wispr Flow fit, availability/Bangalore plan, and both project repository links. The voice receipts should remain visibly marked until real paired source/edit excerpts exist.
