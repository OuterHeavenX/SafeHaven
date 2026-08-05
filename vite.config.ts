import { defineConfig } from 'vite';

export default defineConfig({
  base: '/SafeHaven/',
  build: {
    target: 'es2022',
    sourcemap: true,
  },
});
