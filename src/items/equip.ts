import { ItemDef } from './itemDef';
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

export class Equip extends ItemDef {
  grade: EquipGrade;
  stats: EquipStats;
  primaryArchetype: PrimaryStats;
  equipArchetype: PDEquipStats;

  constructor(opts: {
    id?: string;
    rarity?: Rarity;
    icon?: string;
    miniIcon?: string;
    description?: string | null;
    buffs?: string[];
    set?: string | null;
    grade?: EquipGrade;
    stats?: EquipStats;
    primaryArchetype?: PrimaryStats;
    equipArchetype?: PDEquipStats;
  } = {}) {
    super(opts);
    this.grade = opts.grade ?? EquipGrade.UNKNOWN;
    this.stats = opts.stats ?? { hp: 0, mp: 0, physAtt: 0, physDef: 0, magAtt: 0, magDef: 0 };
    this.primaryArchetype = opts.primaryArchetype ?? new PrimaryStats();
    this.equipArchetype = opts.equipArchetype ?? new PDEquipStats();
  }
}
