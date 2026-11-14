import { Weapon } from '../../items/weapon';
import { WeaponType } from '../../items/slots';
import { EquipGrade } from '../../items/equipGrade';
import { Rarity } from '../../items/rarity';

export const woodenShortsword = new Weapon({
  id: 'wooden_shortsword',
  weaponType: WeaponType.SHORTSWORD,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_shortsword.png',
  description: 'A practice shortsword carved from sturdy wood.',
  stats: { hp: 0, mp: 0, physAtt: 5, physDef: 0 },
});

export const woodenLongsword = new Weapon({
  id: 'wooden_longsword',
  weaponType: WeaponType.LONGSWORD,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_longsword.png',
  description: 'A heavy training blade with a longer reach.',
  stats: { hp: 0, mp: 0, physAtt: 8, physDef: 0 },
});

export const woodenShield = new Weapon({
  id: 'wooden_shield',
  weaponType: WeaponType.SHIELD,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_shield.png',
  description: 'A simple wooden shield for blocking incoming attacks.',
  stats: { hp: 0, mp: 0, physAtt: 0, physDef: 5 },
});

export const copperShortsword = new Weapon({
  id: 'copper_shortsword',
  weaponType: WeaponType.SHORTSWORD,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_shortsword.png',
  description: 'A copper-edged shortsword for early combat.',
  stats: { hp: 0, mp: 0, physAtt: 10, physDef: 0 },
});

export const copperLongsword = new Weapon({
  id: 'copper_longsword',
  weaponType: WeaponType.LONGSWORD,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_longsword.png',
  description: 'A balanced copper blade built for powerful strikes.',
  stats: { hp: 0, mp: 0, physAtt: 15, physDef: 0 },
});

export const copperShield = new Weapon({
  id: 'copper_shield',
  weaponType: WeaponType.SHIELD,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_shield.png',
  description: 'A reinforced shield plated with copper.',
  stats: { hp: 0, mp: 0, physAtt: 0, physDef: 10 },
});
