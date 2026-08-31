import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repo at https://wyattk2120.github.io/portfolio/,
  // not the domain root, so every asset URL needs that /portfolio/ prefix —
  // without this, the deployed site loads a blank page (assets 404 against
  // the root instead of /portfolio/).
  base: '/portfolio/',
})
