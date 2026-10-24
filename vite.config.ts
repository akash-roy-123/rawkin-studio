import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative base paths work for both custom domains and GitHub Pages project URLs.
  base: './',
});
