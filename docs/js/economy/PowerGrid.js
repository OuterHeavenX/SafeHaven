import { BUILDING_DEFS } from '../data/buildings.js';
export function updatePower(s) { let generated = 0, required = 0; for (const b of s.buildings)
    if (b.alive && b.construction >= 1 && b.faction === 'haven') {
        const d = BUILDING_DEFS[b.kind];
        generated += d.powerGenerated;
        required += d.powerRequired;
    } const low = generated < required; for (const b of s.buildings)
    if (b.faction === 'haven')
        b.powered = !low || BUILDING_DEFS[b.kind].powerRequired === 0; s.power = { generated, required }; }
//# sourceMappingURL=PowerGrid.js.map