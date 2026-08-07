export class InputManager {
    canvas;
    view;
    getState;
    onMove;
    onAttack;
    onSelection;
    selection = [];
    attackMove = false;
    last = { x: 0, y: 0 };
    constructor(canvas, view, getState, onMove, onAttack, onSelection) {
        this.canvas = canvas;
        this.view = view;
        this.getState = getState;
        this.onMove = onMove;
        this.onAttack = onAttack;
        this.onSelection = onSelection;
        canvas.addEventListener('pointerdown', e => this.pointer(e));
        canvas.addEventListener('wheel', e => { e.preventDefault(); view.zoomCamera(e.deltaY * .02); }, { passive: false });
        window.addEventListener('keydown', e => this.key(e));
        let touches = null;
        canvas.addEventListener('touchstart', e => { touches = e.touches; }, { passive: true });
        canvas.addEventListener('touchmove', e => { if (e.touches.length === 2 && touches?.length === 2) {
            const ax = (e.touches[0].clientX + e.touches[1].clientX) / 2, ay = (e.touches[0].clientY + e.touches[1].clientY) / 2;
            const bx = (touches[0].clientX + touches[1].clientX) / 2, by = (touches[0].clientY + touches[1].clientY) / 2;
            view.panCamera((bx - ax) * .04, (by - ay) * .04);
            const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            const od = Math.hypot(touches[0].clientX - touches[1].clientX, touches[0].clientY - touches[1].clientY);
            view.zoomCamera((od - d) * .025);
            touches = e.touches;
            e.preventDefault();
        } }, { passive: false });
    }
    setAttackMove() { this.attackMove = true; }
    clear() { this.selection = []; this.onSelection([]); }
    pointer(e) { if (e.pointerType === 'touch' && e.isPrimary === false)
        return; const p = this.screenToWorld(e.clientX, e.clientY); const s = this.getState(); const hitU = [...s.units].filter(x => x.alive).sort((a, b) => Math.hypot(a.pos.x - p.x, a.pos.y - p.y) - Math.hypot(b.pos.x - p.x, b.pos.y - p.y))[0]; const hitB = [...s.buildings].filter(x => x.alive).sort((a, b) => Math.hypot(a.pos.x - p.x, a.pos.y - p.y) - Math.hypot(b.pos.x - p.x, b.pos.y - p.y))[0]; if (hitU && Math.hypot(hitU.pos.x - p.x, hitU.pos.y - p.y) < 2) {
        if (hitU.faction === 'haven') {
            this.selection = [hitU.id];
            this.onSelection(this.selection);
        }
        else if (this.selection.length)
            this.onAttack(this.selection, hitU.id);
        return;
    } if (hitB && Math.hypot(hitB.pos.x - p.x, hitB.pos.y - p.y) < 3) {
        if (hitB.faction === 'haven' || hitB.faction === 'neutral') {
            this.selection = [hitB.id];
            this.onSelection(this.selection);
        }
        else if (this.selection.length)
            this.onAttack(this.selection, hitB.id);
        return;
    } if (this.selection.length) {
        this.onMove(this.selection, p, this.attackMove);
        this.attackMove = false;
    }
    else {
        this.last = p;
    } }
    key(e) { if (e.key.toLowerCase() === 'a')
        this.attackMove = true; if (e.key === 'Escape')
        this.clear(); if (['w', 'a', 's', 'd'].includes(e.key.toLowerCase()) && !this.attackMove) {
        const d = 2.5;
        if (e.key.toLowerCase() === 'w')
            this.view.panCamera(0, -d);
        if (e.key.toLowerCase() === 's')
            this.view.panCamera(0, d);
        if (e.key.toLowerCase() === 'a')
            this.view.panCamera(-d, 0);
        if (e.key.toLowerCase() === 'd')
            this.view.panCamera(d, 0);
    } }
    screenToWorld(x, y) { const r = this.canvas.getBoundingClientRect(); return { x: (x / r.width - .5) * 62 - 15, y: (y / r.height - .5) * 52 - 10 }; }
}
//# sourceMappingURL=InputManager.js.map