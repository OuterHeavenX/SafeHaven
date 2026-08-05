import { defineConfig } from 'vite';
import type { ConfigEnv } from 'vite';

export default defineConfig(({ command, isPreview }: ConfigEnv) => ({
  base: command === 'build' || isPreview ? '/SafeHaven/' : '/',
  build: {
    target: 'es2022',
    sourcemap: true,
  },
}));
