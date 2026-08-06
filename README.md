# SafeHaven

**SafeHaven v0.1.0 — The Fallen Valley** is an original gothic 3D RTS vertical slice built for the browser with TypeScript, native ES modules, IndexedDB and the standalone PlayCanvas Engine.

## Direct-browser architecture

SafeHaven deliberately does **not** use Vite or another framework-specific runtime. The production result is ordinary static HTML, CSS, JavaScript and assets suitable for GitHub Pages, Cloudflare Pages or any standards-compliant static HTTP server.

Boot chain:

`index.html → dist/js/main.js → GameApp → PlayCanvas → title/game`

A plain HTML/CSS boot shell is present before the engine starts. Startup failures remain visible with diagnostic information rather than collapsing into a blank white screen.

## Install and run

```bash
npm install
npm run build
npm run serve -- --dist
```

Development from compiled output:

```bash
npm run compile
npm run serve -- --dist
```

Useful commands:

```bash
npm run typecheck
npm run compile
npm run build
npm run serve -- --dist
npm run clean
npm run test
```

There is no `vite.config.ts`, no Vite dependency and no Vite build/preview command.

## Rendering

PlayCanvas 2.21 is vendor-copied into the static production directory during `npm run build`. Browser import maps resolve `playcanvas` directly to `./vendor/playcanvas/playcanvas.mjs`. SafeHaven requests WebGPU first when available and WebGL2 as the fallback.

## Current playable slice

Deploy the construction wagon, create power/economy/production structures, train units, gather resources through physical hauling, fight Covenant units, damage the enemy production base, and destroy the Covenant Fortress. IndexedDB autosave/manual save support is included.

The current v0.1.0 visuals use procedural primitive placeholder models for many battlefield objects. They are mechanically representative, not final art.

See `PROJECT_STATE.md`, `ARCHITECTURE.md`, `GAME_DESIGN.md`, and `CONTROLS.md`.
