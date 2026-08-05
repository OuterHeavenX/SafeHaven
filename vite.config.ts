import { defineConfig } from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/SafeHaven/' : '/',
  build: {
    target: 'es2022',
    sourcemap: true,
  },
}));
