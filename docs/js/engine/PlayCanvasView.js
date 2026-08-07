import * as pc from 'playcanvas';
import { UNIT_DEFS } from '../data/units.js';
import { BUILDING_DEFS } from '../data/buildings.js';
export class PlayCanvasView {
    canvas;
    app;
    camera;
    entities = new Map();
    projectiles = new Map();
    selected = new Set();
    target = { x: -15, y: -12 };
    zoom = 42;
    constructor(canvas) {
        this.canvas = canvas;
    }
    async init() { const device = await pc.createGraphicsDevice(this.canvas, { deviceTypes: [pc.DEVICETYPE_WEBGPU, pc.DEVICETYPE_WEBGL2], antialias: true, powerPreference: 'high-performance' }); this.app = new pc.Application(this.canvas, { graphicsDevice: device }); this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW); this.app.setCanvasResolution(pc.RESOLUTION_AUTO); device.maxPixelRatio = Math.min(window.devicePixelRatio, 1.5); this.app.scene.ambientLight = new pc.Color(.11, .08, .15); this.createScene(); this.app.start(); window.addEventListener('resize', () => this.app.resizeCanvas()); }
    createScene() { const ground = new pc.Entity('Valley Ground'); ground.addComponent('render', { type: 'box' }); ground.setLocalScale(90, .5, 90); ground.setPosition(0, -.5, 0); const mat = new pc.StandardMaterial(); mat.diffuse = new pc.Color(.055, .07, .06); mat.metalness = .05; mat.gloss = .25; mat.update(); ground.render.material = mat; this.app.root.addChild(ground); for (let i = 0; i < 95; i++) {
        const e = new pc.Entity('Tree');
        e.addComponent('render', { type: 'cone' });
        e.setLocalScale(1 + Math.random() * 1.4, 4 + Math.random() * 4, 1 + Math.random() * 1.4);
        const angle = Math.random() * Math.PI * 2, r = 28 + Math.random() * 15;
        e.setPosition(Math.cos(angle) * r, 2, Math.sin(angle) * r);
        const m = new pc.StandardMaterial();
        m.diffuse = new pc.Color(.025, .055, .035);
        m.gloss = .15;
        m.update();
        e.render.material = m;
        this.app.root.addChild(e);
    } const moon = new pc.Entity('Crimson Moonlight'); moon.addComponent('light', { type: 'directional', color: new pc.Color(.45, .35, .55), intensity: 1.3, castShadows: true, shadowDistance: 50 }); moon.setEulerAngles(48, -35, 0); this.app.root.addChild(moon); this.camera = new pc.Entity('RTS Camera'); this.camera.addComponent('camera', { clearColor: new pc.Color(.015, .01, .025), farClip: 180, fov: 48 }); this.app.root.addChild(this.camera); this.positionCamera(); }
    setSelection(ids) { this.selected = new Set(ids); }
    panCamera(dx, dy) { this.target.x += dx; this.target.y += dy; this.positionCamera(); }
    zoomCamera(delta) { this.zoom = Math.max(22, Math.min(62, this.zoom + delta)); this.positionCamera(); }
    focus(p) { this.target = { ...p }; this.positionCamera(); }
    positionCamera() { this.camera?.setPosition(this.target.x, this.zoom * .72, this.target.y + this.zoom * .62); this.camera?.lookAt(this.target.x, 0, this.target.y); }
    render(s) { for (const u of s.units) {
        if (!u.alive)
            continue;
        let e = this.entities.get(u.id);
        if (!e) {
            e = this.makeEntity(u.id, this.unitShape(u.kind), u.faction, u.kind);
            this.entities.set(u.id, e);
        }
        e.setPosition(u.pos.x, this.unitHeight(u.kind), u.pos.y);
        const scale = this.selected.has(u.id) ? 1.18 : 1;
        e.setLocalScale(scale, scale, scale);
    } for (const b of s.buildings) {
        if (!b.alive)
            continue;
        let e = this.entities.get(b.id);
        if (!e) {
            e = this.makeEntity(b.id, 'box', b.faction, b.kind);
            this.entities.set(b.id, e);
        }
        e.setPosition(b.pos.x, 1.4, b.pos.y);
        const d = BUILDING_DEFS[b.kind];
        const c = Math.max(.15, b.construction);
        e.setLocalScale(d.radius * 1.4, 2.8 * c, d.radius * 1.4);
    } for (const [id, e] of this.entities) {
        if (!s.units.some(x => x.id === id && x.alive) && !s.buildings.some(x => x.id === id && x.alive)) {
            e.destroy();
            this.entities.delete(id);
        }
    } for (const p of s.projectiles) {
        let e = this.projectiles.get(p.id);
        if (!e) {
            e = this.makeProjectile(p.faction);
            this.projectiles.set(p.id, e);
        }
        e.setPosition(p.pos.x, .8, p.pos.y);
    } for (const [id, e] of this.projectiles)
        if (!s.projectiles.some(p => p.id === id && p.alive)) {
            e.destroy();
            this.projectiles.delete(id);
        } }
    makeEntity(name, type, faction, kind) { const e = new pc.Entity(name); e.addComponent('render', { type }); const m = new pc.StandardMaterial(); const col = faction === 'haven' ? new pc.Color(.38, .46, .52) : faction === 'covenant' ? new pc.Color(.48, .06, .10) : new pc.Color(.34, .31, .27); m.diffuse = col; m.emissive = faction === 'covenant' ? new pc.Color(.11, .005, .01) : new pc.Color(.01, .015, .02); m.gloss = .45; m.metalness = kind.includes('Wagon') || kind.includes('Foundry') ? .65 : .25; m.update(); e.render.material = m; this.app.root.addChild(e); return e; }
    makeProjectile(f) { const e = new pc.Entity('Projectile'); e.addComponent('render', { type: 'sphere' }); e.setLocalScale(.18, .18, .18); const m = new pc.StandardMaterial(); m.emissive = f === 'haven' ? new pc.Color(.55, .65, 1) : new pc.Color(1, .08, .02); m.diffuse = m.emissive; m.update(); e.render.material = m; this.app.root.addChild(e); return e; }
    unitShape(k) { return k.includes('Wagon') || k.includes('Ram') || k.includes('Ballista') ? 'box' : k.includes('Hound') ? 'capsule' : 'capsule'; }
    unitHeight(k) { return k.includes('Wagon') || k.includes('Ram') ? .65 : 1; }
}
//# sourceMappingURL=PlayCanvasView.js.map