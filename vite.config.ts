import { defineConfig } from 'vite';
import type { ConfigEnv } from 'vite';

export default defineConfig(({ command }: ConfigEnv) => ({
  base: command === 'build' ? '/SafeHaven/' : '/',
  build: {
    target: 'es2022',
    sourcemap: true,
  },
}));
