# SafeHaven

**SafeHaven v0.1.0 — The Fallen Valley** is an original gothic 3D RTS vertical slice built for the browser with TypeScript, Vite and the standalone PlayCanvas Engine.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

PlayCanvas 2.21 uses WebGPU when requested and supported, with WebGL2 fallback. The project explicitly requests WebGPU first and WebGL2 second.

## Current playable slice

Deploy the construction wagon, create power/economy/production structures, train units, gather resources through physical hauling, fight Covenant units, damage the enemy production base, and destroy the Covenant Fortress. IndexedDB autosave/manual save support is included.

This repository intentionally uses procedural primitive placeholder models in v0.1.0. They are mechanically representative, not final art.

See `PROJECT_STATE.md`, `ARCHITECTURE.md`, `GAME_DESIGN.md`, and `CONTROLS.md`.
