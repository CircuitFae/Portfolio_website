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

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Push the repo to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set **Root Directory** to `portfolio`
4. Deploy

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `portfolio/dist`

## Update Content

Edit [`src/data/portfolio.ts`](src/data/portfolio.ts) for all text, links, experience, projects, and skills.

Replace [`public/Anushka-Thakur-Resume.pdf`](public/Anushka-Thakur-Resume.pdf) to update the downloadable resume.

## Theme

Use the sun/moon toggle in the navbar to switch dark ↔ light mode. Colors animate smoothly across the UI and Three.js scene.

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
