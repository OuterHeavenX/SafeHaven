export class SpatialIndex {
    size;
    cells = new Map();
    constructor(size = 8) {
        this.size = size;
    }
    rebuild(items) { this.cells.clear(); for (const i of items)
        if (i.alive) {
            const k = this.key(i.pos);
            const a = this.cells.get(k) ?? [];
            a.push(i);
            this.cells.set(k, a);
        } }
    query(pos, r) { const out = []; const n = Math.ceil(r / this.size); const cx = Math.floor(pos.x / this.size), cy = Math.floor(pos.y / this.size); for (let y = cy - n; y <= cy + n; y++)
        for (let x = cx - n; x <= cx + n; x++)
            for (const i of this.cells.get(`${x}:${y}`) ?? [])
                if ((i.pos.x - pos.x) ** 2 + (i.pos.y - pos.y) ** 2 <= r * r)
                    out.push(i); return out; }
    key(p) { return `${Math.floor(p.x / this.size)}:${Math.floor(p.y / this.size)}`; }
}
//# sourceMappingURL=SpatialIndex.js.map