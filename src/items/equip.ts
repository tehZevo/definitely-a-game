import { ItemDef } from './itemDef';
import { EquipGrade } from './equipGrade';
import type { Rarity } from './rarity';

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

  constructor(opts: {
    id?: string;
    rarity?: Rarity;
    icon?: string;
    miniIcon?: string;
    grade?: EquipGrade;
    stats?: EquipStats;
  } = {}) {
    super(opts);
    this.grade = opts.grade ?? EquipGrade.UNKNOWN;
    this.stats = opts.stats ?? { hp: 0, mp: 0, physAtt: 0, physDef: 0, magAtt: 0, magDef: 0 };
  }
}
