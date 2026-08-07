import { IndexedDBStore } from './IndexedDBStore.js';
export class SaveManager {
    store = new IndexedDBStore();
    async save(slot, s) { const data = { saveVersion: 1, slot, date: new Date().toISOString(), difficulty: 'normal', world: structuredClone(s) }; await this.store.set(slot, data); return data; }
    async load(slot) { const d = await this.store.get(slot); if (!d)
        return; if (d.saveVersion !== 1)
        throw new Error(`Unsupported save version ${d.saveVersion}`); return structuredClone(d.world); }
    async hasAny() { return (await this.store.keys()).length > 0; }
    async autosave(s) { return this.save('autosave', s); }
}
//# sourceMappingURL=SaveManager.js.map