import { Weapon } from './weapon';
import { WeaponType } from './slots';
import { EquipStats } from '../stats/equipStats';
import { PrimaryStats } from '../stats/primaryStats';
import type { ArchetypeFn } from '../monsters/archetypes';

export const MONSTER_WEAPON_BASE = 10;

export function createMonsterWeapon(
  base: number = MONSTER_WEAPON_BASE,
  archetypes: ArchetypeFn[] = [],
): Weapon {
  let equip = new EquipStats(base, base, base, base);
  let primary = new PrimaryStats(base, base, base, base, base, base);

  for (const archetype of archetypes) {
    [equip, primary] = archetype(equip, primary);
  }

  return new Weapon({
    id: 'monster_weapon',
    weaponType: WeaponType.SHORTSWORD,
    primaryArchetype: primary,
    equipArchetype: equip,
  });
}
