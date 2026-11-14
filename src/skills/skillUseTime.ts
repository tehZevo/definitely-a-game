import type { Equips } from '../items/equips';
import { WeaponSlot, weaponSpeed, weaponSpeedModifier } from '../items/slots';
import type { SkillDef } from './skillDef';

export function getSkillUseTime(skillDef: SkillDef, equips?: Equips): number {
  if (!skillDef.isAttack) return skillDef.useTime;

  const weapon = equips?.getWeapon(WeaponSlot.PRIMARY);
  if (!weapon) return skillDef.useTime;

  return skillDef.useTime * weaponSpeedModifier(weaponSpeed(weapon.weaponType));
}
