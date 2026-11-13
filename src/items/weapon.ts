import { Equip, type EquipStats } from './equip';
import { EquipGrade } from './equipGrade';
import type { Rarity } from './rarity';
import { WeaponType, weaponSlot, type WeaponSlot } from './slots';

export class Weapon extends Equip {
  weaponType: WeaponType;

  constructor(opts: {
    id?: string;
    rarity?: Rarity;
    icon?: string;
    miniIcon?: string;
    grade?: EquipGrade;
    stats?: EquipStats;
    weaponType: WeaponType;
  }) {
    super(opts);
    this.weaponType = opts.weaponType;
  }

  get slot(): WeaponSlot {
    return weaponSlot(this.weaponType);
  }
}
