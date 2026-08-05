import type {UnitDef,UnitKind} from '../types/GameTypes';
const w=(damage:number,range:number,cooldown:number,projectileSpeed:number,damageType:any)=>({damage,range,cooldown,projectileSpeed,damageType});
export const UNIT_DEFS:Record<UnitKind,UnitDef>={
wagon:{kind:'wagon',name:'Haven Construction Wagon',maxHealth:520,armorType:'ARMORED',moveSpeed:3.2,visionRadius:14,costGold:0,costEssence:0,trainTime:0,role:'Deploys the Haven Keep'},
gatherer:{kind:'gatherer',name:'Gatherer',maxHealth:130,armorType:'LIGHT',moveSpeed:3.1,visionRadius:10,costGold:160,costEssence:0,trainTime:12,role:'Collects Gold'},
alchemist:{kind:'alchemist',name:'Alchemist Gatherer',maxHealth:120,armorType:'LIGHT',moveSpeed:3.0,visionRadius:10,costGold:180,costEssence:20,trainTime:14,role:'Collects Essence'},
warden:{kind:'warden',name:'Warden',maxHealth:280,armorType:'ARMORED',moveSpeed:3.4,visionRadius:11,costGold:140,costEssence:0,trainTime:10,weapon:w(34,1.4,.85,0,'BLADE'),role:'Front-line infantry'},
crossbowman:{kind:'crossbowman',name:'Crossbowman',maxHealth:170,armorType:'LIGHT',moveSpeed:3.2,visionRadius:13,costGold:170,costEssence:0,trainTime:12,weapon:w(31,8,1.35,18,'PROJECTILE'),role:'Ranged infantry'},
exorcist:{kind:'exorcist',name:'Exorcist',maxHealth:180,armorType:'LIGHT',moveSpeed:3.0,visionRadius:13,costGold:210,costEssence:40,trainTime:16,weapon:w(35,7,1.45,15,'HOLY'),role:'Anti-supernatural support'},
inquisitor:{kind:'inquisitor',name:'Inquisitor',maxHealth:210,armorType:'LIGHT',moveSpeed:3.2,visionRadius:12,costGold:220,costEssence:20,trainTime:16,weapon:w(24,5,1.2,14,'HOLY'),role:'Captures neutral structures'},
ironWagon:{kind:'ironWagon',name:'Iron Wagon',maxHealth:620,armorType:'ARMORED',moveSpeed:2.4,visionRadius:12,costGold:520,costEssence:30,trainTime:28,weapon:w(78,9,2.2,13,'SIEGE'),role:'Armored ranged vehicle'},
sanctifiedRam:{kind:'sanctifiedRam',name:'Sanctified Ram',maxHealth:850,armorType:'ARMORED',moveSpeed:2.0,visionRadius:10,costGold:620,costEssence:60,trainTime:34,weapon:w(145,1.8,2.6,0,'SIEGE'),role:'Structure assault'},
thrall:{kind:'thrall',name:'Thrall',maxHealth:190,armorType:'LIGHT',moveSpeed:3.2,visionRadius:10,costGold:0,costEssence:0,trainTime:9,weapon:w(25,1.4,1,0,'BLADE'),role:'Melee'},
cultist:{kind:'cultist',name:'Cultist',maxHealth:145,armorType:'LIGHT',moveSpeed:3.0,visionRadius:12,costGold:0,costEssence:0,trainTime:11,weapon:w(27,7,1.4,14,'ARCANE'),role:'Ranged'},
nightHound:{kind:'nightHound',name:'Night Hound',maxHealth:150,armorType:'LIGHT',moveSpeed:5.0,visionRadius:12,costGold:0,costEssence:0,trainTime:12,weapon:w(22,1.2,.7,0,'BLADE'),role:'Fast raider'},
bloodGuard:{kind:'bloodGuard',name:'Blood Guard',maxHealth:460,armorType:'ARMORED',moveSpeed:2.7,visionRadius:11,costGold:0,costEssence:0,trainTime:18,weapon:w(52,1.6,1.15,0,'BLADE'),role:'Heavy infantry'},
graveWraith:{kind:'graveWraith',name:'Grave Wraith',maxHealth:300,armorType:'SUPERNATURAL',moveSpeed:3.8,visionRadius:13,costGold:0,costEssence:0,trainTime:20,weapon:w(40,5,1.25,11,'ARCANE'),role:'Supernatural attacker'},
corruptedBallista:{kind:'corruptedBallista',name:'Corrupted Ballista',maxHealth:500,armorType:'ARMORED',moveSpeed:1.8,visionRadius:13,costGold:0,costEssence:0,trainTime:26,weapon:w(90,11,2.8,12,'SIEGE'),role:'Siege'}
};