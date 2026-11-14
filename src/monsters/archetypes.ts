import { EquipStats } from '../stats/equipStats';
import { PrimaryStats } from '../stats/primaryStats';

export type ArchetypeFn = (
  equip: EquipStats,
  primary: PrimaryStats,
) => [EquipStats, PrimaryStats];

export function MOOK(equip: EquipStats, primary: PrimaryStats): [EquipStats, PrimaryStats] {
  return [equip.multiply(0.1), primary.multiply(0.1)];
}

export function TANK(equip: EquipStats, primary: PrimaryStats): [EquipStats, PrimaryStats] {
  return [equip.multiply(0.5), primary.multiply(0.2)];
}

export function GLASS_CANNON(
  equip: EquipStats,
  primary: PrimaryStats,
): [EquipStats, PrimaryStats] {
  return [equip.multiply(0.05), primary.multiply(0.8)];
}

export function MAGIC(equip: EquipStats, primary: PrimaryStats): [EquipStats, PrimaryStats] {
  return [equip.multiply(0.3), primary.multiply(0.6)];
}

export function PHYSICAL(
  equip: EquipStats,
  primary: PrimaryStats,
): [EquipStats, PrimaryStats] {
  return [equip.multiply(0.6), primary.multiply(0.4)];
}

export function BOSS(equip: EquipStats, primary: PrimaryStats): [EquipStats, PrimaryStats] {
  return [equip.multiply(1.0), primary.multiply(1.0)];
}
