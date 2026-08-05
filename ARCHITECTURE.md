# Architecture

SafeHaven separates authoritative simulation from rendering and UI.

`FixedStepLoop -> Simulation` advances economy, power, unit orders, combat, projectiles, production, AI and objectives at 20 Hz. `WorldState` is the serializable source of truth. PlayCanvas renders that state but does not own game rules. DOM UI emits commands through `CommandSystem` and reads snapshots. `SaveManager` serializes the world to IndexedDB with `saveVersion: 1`.

The renderer requests PlayCanvas WebGPU then WebGL2. All expensive gameplay neighborhood queries are intended to route through spatial indexing; the current vertical slice already uses a uniform spatial index for local target acquisition/avoidance.

Major boundaries: `core` timing/spatial primitives; `simulation` orchestration; `commands` player intent; `economy`; `combat`; `persistence`; `engine` PlayCanvas view; `input`; `ui`; `tutorial`; `data`; `types`.

Future pathfinding should replace the current direct-steering/local-separation prototype with hierarchical grid/flow-field routing without changing command, UI, save, or rendering contracts.
