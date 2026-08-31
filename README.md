# Wyatt King — Portfolio

My personal portfolio site, built with React, TypeScript, and Vite. It's set underwater: a fully animated ocean scene (swaying seaweed, scattered rocks, drifting fish schools) sits behind the actual content — profile/bio, credentials, professional experience, tech stack, and projects.

## Features

- **Title card** — name, photo, bio, and credentials
- **Professional experience** — job history with quantified achievements
- **Tech stack** — skills grouped into Frontend/Backend/Other, each category its own circle of icons
- **Projects** — a responsive card carousel (arrows appear only when there isn't room to show every project at once) with a "Code" button linking to each project's GitHub repo
- **Ocean floor scene** — CSS-animated seaweed and rocks, scaled to the viewport
- **Fish schools** — decorative clusters drifting in the empty margins on wide screens, hidden on narrow ones
- Every section scales fluidly with `clamp()`-based `em` sizing rather than fixed breakpoints, so it holds up across phone-to-ultrawide screen widths

## Tech stack

- React 19 + TypeScript
- Vite
- CSS Modules
- [react-icons](https://react-icons.github.io/react-icons/) for tech-stack/skill icons

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
npm run lint     # run ESLint
```

## Project structure

Personal content (name, bio, credentials, experience, skills, projects) lives in `src/App.tsx`. Each visual section is its own component under `src/components/`, each with a co-located CSS Module.
