# Anushka Thakur — Portfolio

Cinematic 3D portfolio built with **React**, **Vite**, **Three.js (React Three Fiber)**, **GSAP**, and **Tailwind CSS**.

Features animated dark/light theme, scroll-driven 3D camera, aurora shader background, particle field, interactive hero mesh, and full resume content.

## Quick Start

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deployed on (Netlify)
  https://anushkathakurportfoliowebsite.netlify.app/ 


## Project Structure

```
src/
├── components/
│   ├── three/     # WebGL scenes (aurora, hero, particles)
│   └── ui/        # HTML sections
├── context/       # Theme provider
├── data/          # Portfolio content
├── hooks/         # Lenis, scroll, theme colors
└── utils/         # GSAP helpers, color palette
```

## Tech Stack

- React 19 + TypeScript + Vite
- Three.js + @react-three/fiber + @react-three/drei
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Framer Motion
- Tailwind CSS v4
