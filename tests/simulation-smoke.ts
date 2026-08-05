import { createWorld, makeBuilding, makeUnit } from '../src/world/WorldFactory';
import { Simulation } from '../src/simulation/Simulation';
import { CommandSystem } from '../src/commands/CommandSystem';

function assert(v: unknown, msg: string): asserts v { if (!v) throw new Error(msg); }

const state = createWorld();
state.units.filter(u=>u.faction==='covenant').forEach(u=>u.alive=false);
state.buildings.filter(b=>b.faction==='covenant'&&b.kind!=='covenantFortress').forEach(b=>b.alive=false);
const cmd = new CommandSystem(state);
const sim = new Simulation(state);
const wagon = state.units.find(u => u.kind === 'wagon')!;
assert(cmd.deployWagon(wagon.id), 'wagon should deploy');
const keep = state.buildings.find(b => b.kind === 'havenKeep')!;
keep.construction = 1;
state.buildings.push(makeBuilding('aetherGenerator','haven',-18,-20,1));
state.buildings.push(makeBuilding('goldRefinery','haven',-12,-18,1));
state.buildings.push(makeBuilding('barracks','haven',-18,-14,1));
const g = makeUnit('gatherer','haven',-12,-18);
state.units.push(g);
const gold = state.deposits.find(d => d.kind === 'gold')!;
cmd.gather(g.id, gold.id);
const before = state.resources.gold;
for (let i=0;i<1600;i++) sim.tick(1/20);
assert(state.resources.gold > before, 'physical hauling should credit gold after return');
assert(state.power.generated >= 100, 'generator should produce power');
const barracks = state.buildings.find(b => b.kind === 'barracks')!;
const unitsBefore = state.units.length;
assert(cmd.queue(barracks.id,'warden'), 'barracks should queue warden');
for (let i=0;i<240;i++) sim.tick(1/20);
assert(state.units.length > unitsBefore, 'production queue should spawn unit');
const fortress = state.buildings.find(b => b.kind === 'covenantFortress')!;
fortress.hp = 1;
const attacker = makeUnit('sanctifiedRam','haven',fortress.pos.x-1,fortress.pos.y);
state.units.push(attacker);
cmd.attack([attacker.id],fortress.id);
for (let i=0;i<100;i++) sim.tick(1/20);
assert(state.victory, 'destroying fortress should trigger victory');
console.log(JSON.stringify({goldBefore:before,goldAfter:state.resources.gold,power:state.power,unitCount:state.units.length,victory:state.victory},null,2));
