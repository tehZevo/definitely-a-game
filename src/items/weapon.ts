import { Equip, type EquipOptions } from './equip';
import { WeaponType, weaponSlot, type WeaponSlot } from './slots';

export class Weapon extends Equip {
  weaponType: WeaponType;

  constructor(opts: EquipOptions & { weaponType: WeaponType }) {
    super(opts);
    this.weaponType = opts.weaponType;
  }

  get slot(): WeaponSlot {
    return weaponSlot(this.weaponType);
  }
}
