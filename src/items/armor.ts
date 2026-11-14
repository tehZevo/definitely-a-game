import { Equip, type EquipStats } from './equip';
import { EquipGrade } from './equipGrade';
import type { Rarity } from './rarity';
import { ArmorSlot } from './slots';

export class Armor extends Equip {
  armorSlot: ArmorSlot;
  hideHair: boolean;

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
    armorSlot: ArmorSlot;
    hideHair?: boolean;
  }) {
    super(opts);
    this.armorSlot = opts.armorSlot;
    this.hideHair = opts.hideHair ?? false;
  }
}
