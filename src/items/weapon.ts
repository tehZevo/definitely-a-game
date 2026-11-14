import { Equip, type EquipOptions } from './equip';
import { WeaponType, weaponSlot, type WeaponSlot } from './slots';
import type { SkillDef } from '../skills/skillDef';

export interface WeaponOptions extends EquipOptions {
  weaponType: WeaponType;
  attackSkill?: SkillDef;
}

export class Weapon extends Equip {
  weaponType: WeaponType;
  attackSkill: SkillDef | null;

  constructor(opts: WeaponOptions) {
    super(opts);
    this.weaponType = opts.weaponType;
    this.attackSkill = opts.attackSkill ?? null;
  }

  get slot(): WeaponSlot {
    return weaponSlot(this.weaponType);
  }
}
