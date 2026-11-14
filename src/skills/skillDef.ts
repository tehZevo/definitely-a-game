import { SkillRank } from './skillRank';
import type { SkillSlot } from './skillSlot';
import type { SkillEffect } from './effects/skillEffect';
import type { WeaponType } from '../items/slots';

export const DEFAULT_SKILL_USE_TIME = 0.5;

export type WeaponFilter = (
  primary: WeaponType | undefined,
  secondary: WeaponType | undefined,
) => boolean;

export const DEFAULT_WEAPON_FILTER: WeaponFilter = () => true;

export function weaponFilterFor(types: readonly WeaponType[]): WeaponFilter {
  return (primary) => primary !== undefined && types.includes(primary);
}

export class SkillDef {
  effects: SkillEffect[];
  weaponFilter: WeaponFilter;

  constructor(
    public id: string,
    effects: SkillEffect | SkillEffect[],
    public isAttack = true,
    public rank: SkillRank = SkillRank.I,
    public cooldown: number | null = null,
    public mpCost = 0,
    public hpCost = 0,
    public useTime = DEFAULT_SKILL_USE_TIME,
    public slot: SkillSlot | string | null = null,
    public icon: string | null = null,
    public miniIcon: string | null = null,
    public description: string | null = null,
    weaponFilter: WeaponFilter = DEFAULT_WEAPON_FILTER,
  ) {
    this.effects = Array.isArray(effects) ? effects : [effects];
    this.weaponFilter = weaponFilter;
  }
}
