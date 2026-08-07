export class EventBus {
    m = new Map();
    on(k, f) { const s = this.m.get(k) ?? new Set(); s.add(f); this.m.set(k, s); return () => s.delete(f); }
    emit(k, v) { this.m.get(k)?.forEach(f => f(v)); }
    clear() { this.m.clear(); }
}
//# sourceMappingURL=EventBus.js.map