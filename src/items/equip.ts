import { ItemDef, type ItemDefOptions } from './itemDef';
import { EquipGrade } from './equipGrade';
import type { Rarity } from './rarity';
import { PrimaryStats } from '../stats/primaryStats';
import { EquipStats as PDEquipStats } from '../stats/equipStats';

export interface EquipStats {
  hp: number;
  mp: number;
  physAtt: number;
  physDef: number;
  magAtt?: number;
  magDef?: number;
}

export interface EquipOptions extends ItemDefOptions {
  rarity?: Rarity;
  grade?: EquipGrade;
  stats?: EquipStats;
  primaryArchetype?: PrimaryStats;
  equipArchetype?: PDEquipStats;
}

export class Equip extends ItemDef {
  grade: EquipGrade;
  stats: EquipStats;
  primaryArchetype: PrimaryStats;
  equipArchetype: PDEquipStats;

  constructor(opts: EquipOptions = {}) {
    super(opts);
    this.grade = opts.grade ?? EquipGrade.UNKNOWN;
    this.stats = opts.stats ?? { hp: 0, mp: 0, physAtt: 0, physDef: 0, magAtt: 0, magDef: 0 };
    this.primaryArchetype = opts.primaryArchetype ?? new PrimaryStats();
    this.equipArchetype = opts.equipArchetype ?? new PDEquipStats();
  }
}
