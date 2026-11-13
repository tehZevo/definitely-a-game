import { MobDef } from '../../monsters/mobdef';
import { testEnemySkill } from '../skills/testEnemySkill';
import {
  cottonHat,
  cottonRobe,
  cottonGloves,
  cottonShoes,
  linenHat,
  linenRobe,
  linenGloves,
  linenShoes,
  leatherHat,
  leatherSuit,
  leatherGloves,
  leatherShoes,
  woodenHelmet,
  woodenSuit,
  woodenGloves,
  woodenBoots,
  copperHelmet,
  copperSuit,
  copperGloves,
  copperBoots,
  hideHat,
  hideSuit,
  hideGloves,
  hideShoes,
} from '../items/armor';
import {
  woodenShortsword,
  woodenLongsword,
  woodenShield,
  copperShortsword,
  copperLongsword,
  copperShield,
} from '../items/weapons';
import { bless } from '../skills/bless';

export const slime = new MobDef(
  'slime',
  'assets/monsters/slime_idle.png',
  5,
  25,
  0,
  [cottonHat, cottonRobe, cottonGloves, cottonShoes, woodenShield],
  [testEnemySkill],
);

export const greenSlime = new MobDef(
  'green_slime',
  'assets/monsters/green_slime_idle.png',
  1,
  10,
  0,
  [linenHat, linenRobe, linenGloves, linenShoes],
  [testEnemySkill],
);

export const brownSlime = new MobDef(
  'brown_slime',
  'assets/monsters/brown_slime_idle.png',
  3,
  18,
  0,
  [woodenHelmet, woodenSuit, woodenGloves, woodenBoots, woodenShortsword, woodenLongsword, woodenShield],
  [testEnemySkill],
);

export const redSlime = new MobDef(
  'red_slime',
  'assets/monsters/red_slime_idle.png',
  10,
  60,
  0,
  [copperHelmet, copperSuit, copperGloves, copperBoots, copperShortsword, copperLongsword, copperShield],
  [testEnemySkill],
);

export const darkSlime = new MobDef(
  'dark_slime',
  'assets/monsters/dark_slime_idle.png',
  7,
  40,
  0,
  [leatherHat, leatherSuit, leatherGloves, leatherShoes],
  [testEnemySkill],
);

export const pinkSlime = new MobDef(
  'pink_slime',
  'assets/monsters/pink_slime_idle.png',
  6,
  35,
  0,
  [hideHat, hideSuit, hideGloves, hideShoes],
  [testEnemySkill],
);

export const purpleSlime = new MobDef(
  'purple_slime',
  'assets/monsters/purple_slime_idle.png',
  4,
  22,
  0,
  [linenHat, linenRobe],
  [testEnemySkill],
);

export const goldSlime = new MobDef(
  'gold_slime',
  'assets/monsters/gold_slime_idle.png',
  8,
  50,
  0,
  [copperHelmet, copperSuit, copperShortsword],
  [testEnemySkill],
);

void bless;
