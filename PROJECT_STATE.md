# PROJECT STATE

Version: **0.1.0 — The Fallen Valley**
Branch: `main` locally
Save version: `1`

## Implemented
- Modular strict-TypeScript-oriented architecture.
- Fixed 20 Hz authoritative simulation decoupled from rendering.
- PlayCanvas standalone renderer requesting WebGPU, falling back to WebGL2.
- Procedural night valley placeholder scene.
- Haven Keep deployment.
- Data-driven building prerequisites/costs/power.
- Construction progress.
- Gold and Essence deposits with worker travel, gather, carry, return and unload.
- Power generation/consumption and low-power production gating.
- Barracks/Foundry/worker production queues.
- Unit move, attack, attack-move, stop and basic guard-order support in command layer.
- Formation offsets and local separation.
- Ranged projectile simulation and melee damage.
- Damage-vs-armor matrix and two veterancy promotions.
- Repair, sell and ownership-transfer capture command.
- Covenant base, production and periodic strategic attack behavior.
- Objectives, victory/defeat.
- IndexedDB autosave and named slot support.
- Animated title screen and functional HUD/pause controls.
- Touch pinch/pan and contextual tap command path.
- Startup error screen instead of silent black screen.

## Unfinished / known limitations
This is a serious foundation build, but it is **not yet the fully polished 33-point completion build described by the master prompt**.

- All 3D art is placeholder procedural geometry; no final glTF gothic asset pack, animation set, PBR texture library, audio, voices or original music has been authored.
- Current movement is direct steering with spatial separation, not final hierarchical A*/flow-field navigation around cliffs/walls.
- Fog-of-war state types/objective design exist but the renderer does not yet render the full three-state tactical fog texture.
- Picking uses a lightweight screen-to-world approximation; replace with PlayCanvas camera raycasts for final map geometry.
- Drag rectangle selection, Shift selection, double-click same-type selection and Ctrl-number groups are not yet wired.
- Minimap/Chapel radar presentation is not yet rendered.
- Watchtower/Ballista autonomous weapon systems are not yet specialized.
- Construction ghost placement visualizer is not yet rendered (validation exists).
- Capture is immediate when adjacent; final timed vulnerable channel remains.
- Save/load serializes authoritative world state but more migration tests are needed before calling it production-safe.
- Tutorial is an objective-driven first-run sequence, not all 20 authored highlight steps yet.
- AI uses real buildings and production but Covenant economy is currently abstracted rather than worker-haul based.
- No headless browser/GPU run was possible in the current build environment because its npm mirror did not provide PlayCanvas/Vite packages; source type validation used the available global TypeScript compiler only.

## Temporary assets
Everything visible in 3D is temporary: units, buildings, trees, terrain, projectiles, moon/title imagery, icons and effects.

## Next recommended milestone
**v0.1.1 — Core RTS Reliability Pass**: finish navigation/path recovery, true ray picking and box selection, fog of war, minimap, defensive towers, full 20-step tutorial, save migration/test harness, and browser/device verification. Do not add Stage 2.
