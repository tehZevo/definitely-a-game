import { Armor } from '../../items/armor';
import { ArmorSlot } from '../../items/slots';
import { EquipGrade } from '../../items/equipGrade';
import { Rarity } from '../../items/rarity';

export const cottonHat = new Armor({
  id: 'cotton_hat',
  armorSlot: ArmorSlot.HAT,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/cotton_hat.png',
  description: 'A soft cotton cap offering light protection.',
  stats: { hp: 5, mp: 0, physAtt: 0, physDef: 1 },
});

export const cottonRobe = new Armor({
  id: 'cotton_robe',
  armorSlot: ArmorSlot.SUIT,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/cotton_robe.png',
  description: 'A simple robe woven from basic cotton cloth.',
  stats: { hp: 10, mp: 0, physAtt: 0, physDef: 2 },
});

export const cottonGloves = new Armor({
  id: 'cotton_gloves',
  armorSlot: ArmorSlot.GLOVES,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/cotton_gloves.png',
  description: 'Thin gloves that keep your hands steady.',
  stats: { hp: 3, mp: 0, physAtt: 0, physDef: 1 },
});

export const cottonShoes = new Armor({
  id: 'cotton_shoes',
  armorSlot: ArmorSlot.SHOES,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/cotton_shoes.png',
  description: 'Light cloth shoes for everyday travel.',
  stats: { hp: 3, mp: 0, physAtt: 0, physDef: 1 },
});

export const linenHat = new Armor({
  id: 'linen_hat',
  armorSlot: ArmorSlot.HAT,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/linen_hat.png',
  description: 'A neatly stitched linen hat.',
  stats: { hp: 8, mp: 0, physAtt: 0, physDef: 2 },
});

export const linenRobe = new Armor({
  id: 'linen_robe',
  armorSlot: ArmorSlot.SUIT,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/linen_robe.png',
  description: 'A durable linen robe for beginner adventurers.',
  stats: { hp: 15, mp: 0, physAtt: 0, physDef: 4 },
});

export const leatherHat = new Armor({
  id: 'leather_hat',
  armorSlot: ArmorSlot.HAT,
  grade: EquipGrade.C,
  rarity: Rarity.COMMON,
  icon: 'assets/items/leather_hat.png',
  description: 'A hardened leather cap for head protection.',
  stats: { hp: 12, mp: 0, physAtt: 0, physDef: 3 },
});

export const leatherSuit = new Armor({
  id: 'leather_suit',
  armorSlot: ArmorSlot.SUIT,
  grade: EquipGrade.C,
  rarity: Rarity.COMMON,
  icon: 'assets/items/leather_suit.png',
  description: 'A fitted suit made from cured leather panels.',
  stats: { hp: 25, mp: 0, physAtt: 0, physDef: 6 },
});

export const woodenHelmet = new Armor({
  id: 'wooden_helmet',
  armorSlot: ArmorSlot.HAT,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_helmet.png',
  description: 'A basic helmet shaped from reinforced wood.',
  stats: { hp: 6, mp: 0, physAtt: 0, physDef: 2 },
});

export const woodenSuit = new Armor({
  id: 'wooden_suit',
  armorSlot: ArmorSlot.SUIT,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_suit.png',
  description: 'Crude wooden armor used for training and defense.',
  stats: { hp: 12, mp: 0, physAtt: 0, physDef: 3 },
});

export const copperHelmet = new Armor({
  id: 'copper_helmet',
  armorSlot: ArmorSlot.HAT,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_helmet.png',
  description: 'A copper helmet polished to a dull shine.',
  stats: { hp: 10, mp: 0, physAtt: 0, physDef: 4 },
});

export const copperSuit = new Armor({
  id: 'copper_suit',
  armorSlot: ArmorSlot.SUIT,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_suit.png',
  description: 'A suit reinforced with thin copper plating.',
  stats: { hp: 20, mp: 0, physAtt: 0, physDef: 8 },
});

export const hideHat = new Armor({
  id: 'hide_hat',
  armorSlot: ArmorSlot.HAT,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/hide_hat.png',
  description: 'A rough cap stitched from animal hide.',
  stats: { hp: 8, mp: 0, physAtt: 0, physDef: 2 },
});

export const hideSuit = new Armor({
  id: 'hide_suit',
  armorSlot: ArmorSlot.SUIT,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/hide_suit.png',
  description: 'A simple hide suit for early expeditions.',
  stats: { hp: 18, mp: 0, physAtt: 0, physDef: 5 },
});

export const linenGloves = new Armor({
  id: 'linen_gloves',
  armorSlot: ArmorSlot.GLOVES,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/linen_gloves.png',
  description: 'Gloves woven from fine linen thread.',
  stats: { hp: 5, mp: 0, physAtt: 0, physDef: 2 },
});

export const linenShoes = new Armor({
  id: 'linen_shoes',
  armorSlot: ArmorSlot.SHOES,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/linen_shoes.png',
  description: 'Quiet shoes made from layered linen.',
  stats: { hp: 5, mp: 0, physAtt: 0, physDef: 2 },
});

export const woodenGloves = new Armor({
  id: 'wooden_gloves',
  armorSlot: ArmorSlot.GLOVES,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_gloves.png',
  description: 'Wooden hand guards used in practice bouts.',
  stats: { hp: 3, mp: 0, physAtt: 0, physDef: 1 },
});

export const woodenBoots = new Armor({
  id: 'wooden_boots',
  armorSlot: ArmorSlot.SHOES,
  grade: EquipGrade.E,
  rarity: Rarity.COMMON,
  icon: 'assets/items/wooden_boots.png',
  description: 'Sturdy boots reinforced with wooden plates.',
  stats: { hp: 3, mp: 0, physAtt: 0, physDef: 1 },
});

export const copperGloves = new Armor({
  id: 'copper_gloves',
  armorSlot: ArmorSlot.GLOVES,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_gloves.png',
  description: 'Gloves fitted with thin copper guards.',
  stats: { hp: 6, mp: 0, physAtt: 0, physDef: 3 },
});

export const copperBoots = new Armor({
  id: 'copper_boots',
  armorSlot: ArmorSlot.SHOES,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/copper_boots.png',
  description: 'Boots protected by copper toe caps.',
  stats: { hp: 6, mp: 0, physAtt: 0, physDef: 3 },
});

export const leatherGloves = new Armor({
  id: 'leather_gloves',
  armorSlot: ArmorSlot.GLOVES,
  grade: EquipGrade.C,
  rarity: Rarity.COMMON,
  icon: 'assets/items/leather_gloves.png',
  description: 'Durable gloves crafted from supple leather.',
  stats: { hp: 8, mp: 0, physAtt: 0, physDef: 3 },
});

export const leatherShoes = new Armor({
  id: 'leather_shoes',
  armorSlot: ArmorSlot.SHOES,
  grade: EquipGrade.C,
  rarity: Rarity.COMMON,
  icon: 'assets/items/leather_shoes.png',
  description: 'Comfortable leather shoes built for long journeys.',
  stats: { hp: 8, mp: 0, physAtt: 0, physDef: 3 },
});

export const hideGloves = new Armor({
  id: 'hide_gloves',
  armorSlot: ArmorSlot.GLOVES,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/hide_gloves.png',
  description: 'Rough gloves made from scavenged hide.',
  stats: { hp: 5, mp: 0, physAtt: 0, physDef: 2 },
});

export const hideShoes = new Armor({
  id: 'hide_shoes',
  armorSlot: ArmorSlot.SHOES,
  grade: EquipGrade.D,
  rarity: Rarity.COMMON,
  icon: 'assets/items/hide_shoes.png',
  description: 'Simple footwear wrapped from tough hide.',
  stats: { hp: 5, mp: 0, physAtt: 0, physDef: 2 },
});
