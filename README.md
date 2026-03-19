# nico-site

A personal portfolio website for Nico Vazquez — engineer, founder, and explorer. A slide-based single-page experience with a "Cartographer-Alchemist" design system featuring leather textures, gold accents, and philosophical framing.

**Live:** https://nicovaz.dev (deployed to Vercel)
**GitHub:** https://github.com/Nicoivazquez/nicovaz

## Overview

This is a static personal website with 8 navigable slides that tell a story across multiple dimensions:

1. **Hero** — Introduction (Engineer → Founder → Explorer)
2. **Ventures** — Current companies & projects in health, food, and psychology
3. **Projects** — Research & craft: psychological assessment tools, measurement systems
4. **Athletics** — Physical pursuits: running, climbing, swimming, tennis, yoga
5. **Philosophy** — Mental models: systems thinking, Austrian economics, emotional intelligence
6. **Codex** (Recommendations) — Curated books, tools, gear, food, fitness resources
7. **Vision** — Long-term goal: Patagonia retreat center for inner work
8. **Connect** — Call to action: ideal collaborators and topics of interest

Each slide is richly styled with animations, decorative elements (compass roses, alchemical dividers), and a consistent color palette.

## Tech Stack

- **Framework:** Vite 7 + React 19
- **Styling:** Tailwind CSS v4 (no config file needed — configured via `@tailwindcss/vite`)
- **Fonts:** Playfair Display (headings), Lora (body), Inter (UI)
- **Design:** Cartographer-Alchemist theme system (leather, parchment, gold, verdigris)
- **Deployment:** Vercel (`nico-site` project)
- **Bundler:** Vite with React plugin

## Development

### Prerequisites

- Node.js 18+ (uses ES modules)
- npm

### Setup

```bash
git clone https://github.com/Nicoivazquez/nicovaz.git
cd nicovaz
npm install
```

### Development Server

```bash
npm run dev
```

Starts HMR dev server on `http://localhost:5173` (or next available port).

### Build for Production

```bash
npm run build
```

Outputs static files to `/dist`. Ready for static hosting.

### Preview Build Locally

```bash
npm run preview
```

Serves the `/dist` folder locally to test production build.

### Linting

```bash
npm lint
```

Runs ESLint with React and React Hooks rules (uses oxc when available).

## Architecture

### Directory Structure

```
src/
├── App.jsx           # Main app shell + all slide components + SVG decorative elements
├── main.jsx          # React entry point
└── index.css         # Cartographer-Alchemist design system
```

### Design System (index.css)

Defined in CSS custom properties and utility classes:

- **Colors:** Midnight (#0F1729), Ivory (#EDE0CC), Leather (#2C1810), Gold (#D4A843), etc.
- **Animations:** `breathe` (glowing), `float-mote` (falling particles), `compass-spin` (60s rotation), `fog-clear` (transition), `ink-reveal` (text)
- **Components:** `.parchment-bg`, `.leather-bg`, `.card-alchemist`, `.wax-seal` (button), `.breathing-glow`
- **Textures:** Radial gradients for leather depth, repeating lines for parchment

### App Structure

**App.jsx** contains:
- **Decorative SVG components:** `CompassRose`, `AlchemicalDivider`, `CartoucheLabel`, `GoldenMotes`
- **Slide components:** `HeroSlide`, `VenturesSlide`, `ProjectsSlide`, `AthleticsSlide`, `PhilosophySlide`, `RecommendationsSlide`, `VisionSlide`, `ConnectSlide`
- **App shell:** Navigation (compass + tab bar), slide viewport, footer pagination with dot indicators

**Slide rendering:**
- Active slide determined by state
- Smooth transitions via `fog-clear` animation
- Navigation: tab buttons (header), prev/next buttons (footer), dot indicators (footer)

## Design System Details

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary BG | Midnight | #0F1729 | Page background |
| Text Primary | Ivory | #EDE0CC | Headers, main text |
| Text Secondary | Fog | #8B9DAF | Body copy, descriptions |
| Accent | Gold | #D4A843 | Buttons, borders, highlights |
| Accent Alt | Amber | #C17817 | Tags, secondary accents |
| Tertiary | Verdigris | #4A8B7F | Status badges, accents |
| Tertiary | Amethyst | #6B3FA0 | Status badges |
| Paper | Leather | #2C1810 | Card backgrounds, headers |

### Animations

- **breathe:** 4s opacity/brightness pulse on glowing elements
- **float-mote:** Golden particles rise from bottom with random trajectories
- **compass-spin:** Continuous 60s rotation (infinite)
- **fog-clear:** 0.6s slide transition (blur to clear)
- **ink-reveal:** Text reveal from left to right

### Fonts

| Family | Weights | Usage |
|--------|---------|-------|
| Playfair Display | 400, 600, 700, 800 | Titles, headers, brand |
| Lora | 400, 500, 600, 700 | Body copy, descriptions |
| Inter | 300, 400, 500, 600 | UI labels, tags, buttons |

## Deployment

The project is deployed to **Vercel** under the project name `nico-site`.

```bash
npm run build
# Then push to GitHub — Vercel auto-deploys on push to main
```

No environment variables or build-time configuration needed. Pure static site.

## Notes

- **No backend:** This is a fully static single-page app. No API, no database, no env vars.
- **No TypeScript:** Uses JSX with plain JavaScript (no type checking).
- **Responsive:** Mobile-first Tailwind v4, but designed primarily for desktop (slides assume larger screens).
- **Accessibility:** Semantic HTML, alt-text on images, keyboard navigation via tab buttons.

## Contact

Interested in the philosophy, the ventures, or the design system? Find Nico on the **Connect** slide.

---

**Last Updated:** 2025-03-19
