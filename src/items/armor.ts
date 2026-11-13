import { Equip, type EquipStats } from './equip';
import { EquipGrade } from './equipGrade';
import type { Rarity } from './rarity';
import { ArmorSlot } from './slots';

export class Armor extends Equip {
  armorSlot: ArmorSlot;

  constructor(opts: {
    id?: string;
    rarity?: Rarity;
    icon?: string;
    miniIcon?: string;
    grade?: EquipGrade;
    stats?: EquipStats;
    armorSlot: ArmorSlot;
  }) {
    super(opts);
    this.armorSlot = opts.armorSlot;
  }
}
