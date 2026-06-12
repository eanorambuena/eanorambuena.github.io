# Emmanuel Norambuena — Portfolio

Personal portfolio website built with **Astro 5**, **React 19**, **Three.js**, and **Tailwind CSS v4**. Deployed to GitHub Pages.

## Stack

- **Framework**: Astro 5 (islands architecture)
- **UI**: React 19 + TypeScript
- **3D Graphics**: Three.js via @react-three/fiber, @react-three/drei, @react-three/postprocessing
- **Styling**: Tailwind CSS v4 (JIT)
- **Icons**: Lucide React (minimal usage) + inline SVGs
- **i18n**: Custom hook with localStorage persistence (ES/EN)
- **Deployment**: GitHub Pages via GitHub Actions

## Quick Start

```bash
# Install dependencies (use pnpm)
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Preview production build locally
pnpm preview

# Deploy to GitHub Pages
pnpm deploy
```

> **Note**: This project uses **pnpm** as package manager. Do not use `npm` or `yarn` — they will generate a `package-lock.json` or `yarn.lock` which are ignored.

## Project Structure

```
src/
├── components/          # UI components (Astro + React)
│   ├── Hero.astro       # Hero section (static)
│   ├── Hero3D.jsx       # Three.js 3D scene (React island)
│   ├── Navbar.jsx       # Navigation with scroll spy, i18n toggle
│   ├── Skills3D.jsx     # Interactive skill cards (React island)
│   └── ...              # About, Projects, Experience, Contact, etc.
├── layouts/
│   └── Layout.astro     # Root layout, SEO, fonts, global scripts
├── pages/
│   └── index.astro      # Main page composition
└── i18n/
    ├── translations.js  # ES/EN translation objects
    └── useLang.jsx      # React hook for language state
```

## Features

- **3D Hero**: TorusKnot with Bloom + ChromaticAberration post-processing, mouse parallax
- **Interactive Skills**: Animated skill cards with hover/tap reveal, reduced motion support
- **TrustedBy Marquee**: Infinite scrolling logo strip (pause on hover)
- **Experience Timeline**: Vertical timeline with gradient connectors
- **i18n**: Full ES/EN with localStorage persistence, no page reload
- **Accessibility**: Skip link, focus-visible, ARIA labels, reduced motion, semantic HTML
- **Performance**: Astro islands (`client:visible`, `client:idle`), lazy-loaded images, font optimization

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Production build to `./dist` |
| `pnpm preview` | Preview `./dist` locally |
| `pnpm deploy` | Build + deploy to GitHub Pages via `gh-pages` |

## Deployment

Automatic via GitHub Actions on push to `main`:

1. Checkout
2. Setup pnpm 9 + Node 22 (with cache)
3. `pnpm install`
4. `pnpm build`
5. Upload `./dist` artifact
6. Deploy to GitHub Pages

Workflow: `.github/workflows/deploy.yml`

## Accessibility

- WCAG 2.1 AA target
- `prefers-reduced-motion` respected globally
- Skip to main content link
- Keyboard navigable
- Screen reader friendly (ARIA labels, live regions for lang changes)

## Performance

- Three.js loaded via `client:idle` (non-blocking)
- Skills3D loaded via `client:visible` (on scroll)
- Images: lazy-loaded, explicit dimensions (CLS prevention)
- Fonts: preconnect + display swap
- Bundle: Tree-shaken, code-split by island

## License

MIT — see [LICENSE](LICENSE)