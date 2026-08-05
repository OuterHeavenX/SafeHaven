export type FactionId='haven'|'covenant'|'neutral';
export type ArmorType='LIGHT'|'ARMORED'|'STRUCTURE'|'SUPERNATURAL';
export type DamageType='BLADE'|'PROJECTILE'|'SIEGE'|'HOLY'|'ARCANE';
export type ResourceKind='gold'|'essence';
export type UnitKind='wagon'|'gatherer'|'alchemist'|'warden'|'crossbowman'|'exorcist'|'inquisitor'|'ironWagon'|'sanctifiedRam'|'thrall'|'cultist'|'nightHound'|'bloodGuard'|'graveWraith'|'corruptedBallista';
export type BuildingKind='havenKeep'|'goldRefinery'|'essenceSanctum'|'aetherGenerator'|'barracks'|'ironFoundry'|'watchtower'|'sanctifiedBallista'|'chapelOfSight'|'alchemistLaboratory'|'stoneWall'|'ironGate'|'covenantFortress'|'bloodShrine'|'cryptBarracks'|'corruptedFoundry'|'essenceSpire'|'covenantTower'|'abandonedWatchtower'|'ancientShrine';
export interface Vec2 {x:number;y:number}
export interface WeaponDef {damage:number; range:number; cooldown:number; projectileSpeed:number; damageType:DamageType}
export interface UnitDef {kind:UnitKind;name:string;maxHealth:number;armorType:ArmorType;moveSpeed:number;visionRadius:number;costGold:number;costEssence:number;trainTime:number;weapon?:WeaponDef;role:string}
export interface BuildingDef {kind:BuildingKind;name:string;maxHealth:number;costGold:number;costEssence:number;powerGenerated:number;powerRequired:number;buildTime:number;radius:number;prerequisites:BuildingKind[];category:'building'|'defense'|'technology'}
export interface UnitState {id:string;kind:UnitKind;faction:FactionId;pos:Vec2;hp:number;rank:0|1|2;xp:number;order:UnitOrder;carry:{kind:ResourceKind|null;amount:number};cooldown:number;alive:boolean}
export type UnitOrder={type:'idle'}|{type:'move'|'attackMove';target:Vec2}|{type:'attack';targetId:string}|{type:'gather';targetId:string}|{type:'return';targetId:string}|{type:'guard';targetId:string};
export interface BuildingState {id:string;kind:BuildingKind;faction:FactionId;pos:Vec2;hp:number;construction:number;powered:boolean;queue:ProductionEntry[];rally?:Vec2;alive:boolean}
export interface ProductionEntry {kind:UnitKind;progress:number;total:number;paidGold:number;paidEssence:number}
export interface DepositState {id:string;kind:ResourceKind;pos:Vec2;remaining:number}
export interface ProjectileState {id:string;from:Vec2;pos:Vec2;targetId:string;speed:number;damage:number;damageType:DamageType;faction:FactionId;alive:boolean}
export interface ObjectiveState {id:string;text:string;complete:boolean;optional?:boolean}
export interface WorldState {version:number;elapsed:number;seed:number;resources:{gold:number;essence:number};power:{generated:number;required:number};units:UnitState[];buildings:BuildingState[];deposits:DepositState[];projectiles:ProjectileState[];objectives:ObjectiveState[];explored:number[];tutorialStep:number;victory:boolean;defeat:boolean}
export interface SaveData {saveVersion:number;slot:string;date:string;difficulty:'normal';world:WorldState}
