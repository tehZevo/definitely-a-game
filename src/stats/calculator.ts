import { EquipStats } from './equipStats';
import { PrimaryStats } from './primaryStats';
import { SecondaryStats } from './secondaryStats';
import { Stats } from './stats';
import { WeaponType } from '../items/slots';

const PRIMARY_PATT_MULTIPLIER = 2;
const SECONDARY_PATT_MULTIPLIER = 1;
const PRIMARY_MATT_MULTIPLIER = 2;
const SECONDARY_MATT_MULTIPLIER = 1;
const VIT_PDEF_MULTIPLIER = 2;
const WIS_MDEF_MULTIPLIER = 2;
const DEX_ACC_MULTIPLIER = 20;
const AGI_EVA_MULTIPLIER = 20;
const AGI_MOVE_MULTIPLIER = 1;
const DEX_CRIT_MULTIPLIER = 1;

const BASE_SECONDARY_STATS = new SecondaryStats(50, 30, 0, 0, 0, 0, 0, 0, 100, 0);

export function weaponPhysicalStatAssignment(wt: WeaponType): [number, number] {
  switch (wt) {
    case WeaponType.POLEARM:
    case WeaponType.MACE:
      return [0, 1]; // STR, VIT
    case WeaponType.BOW:
    case WeaponType.DAGGER:
    case WeaponType.DAGGER_L:
      return [2, 0]; // DEX, STR
    case WeaponType.REPEATER:
    case WeaponType.REPEATER_L:
      return [2, 3]; // DEX, AGI
    default:
      return [0, 2]; // STR, DEX
  }
}

export function weaponMagicalStatAssignment(_wt: WeaponType): [number, number] {
  return [4, 5]; // INT, WIS
}

export function calculateSecondaryFromPrimaryAndEquip(
  primary: PrimaryStats,
  equip: EquipStats,
  weaponType: WeaponType,
): SecondaryStats {
  const [physPri, physSec] = weaponPhysicalStatAssignment(weaponType);
  const [magPri, magSec] = weaponMagicalStatAssignment(weaponType);

  const hp = primary.VIT ** 2;
  const mp = primary.WIS ** 2;
  const physAtt = equip.PATT * (primary.get(physPri) * PRIMARY_PATT_MULTIPLIER + primary.get(physSec) * SECONDARY_PATT_MULTIPLIER);
  const magAtt = equip.MATT * (primary.get(magPri) * PRIMARY_MATT_MULTIPLIER + primary.get(magSec) * SECONDARY_MATT_MULTIPLIER);
  const physDef = equip.PDEF * primary.VIT * VIT_PDEF_MULTIPLIER;
  const magDef = equip.MDEF * primary.WIS * WIS_MDEF_MULTIPLIER;
  const accuracy = primary.DEX * DEX_ACC_MULTIPLIER;
  const evasion = primary.AGI * AGI_EVA_MULTIPLIER;
  const moveSpeed = primary.AGI * AGI_MOVE_MULTIPLIER;
  const critical = primary.DEX * DEX_CRIT_MULTIPLIER;

  return BASE_SECONDARY_STATS.add(new SecondaryStats(hp, mp, physAtt, magAtt, physDef, magDef, accuracy, evasion, moveSpeed, critical));
}

export function calculateStats(
  basePrimary: PrimaryStats,
  baseEquip: EquipStats,
  equipPrimaryBonus: PrimaryStats,
  equipEquipBonus: EquipStats,
  flatModifiers: Stats,
  scalingModifiers: Stats,
  weaponType: WeaponType,
): Stats {
  const primaryStats = basePrimary
    .add(equipPrimaryBonus)
    .add(flatModifiers.primary)
    .multiply(scalingModifiers.primary);

  const equipStats = baseEquip
    .add(equipEquipBonus)
    .add(flatModifiers.equip)
    .multiply(scalingModifiers.equip);

  const baseSecondary = calculateSecondaryFromPrimaryAndEquip(primaryStats, equipStats, weaponType);

  const secondaryStats = baseSecondary
    .add(equipSecondaryBonus(equipPrimaryBonus, equipEquipBonus))
    .add(flatModifiers.secondary)
    .multiply(scalingModifiers.secondary);

  return new Stats(equipStats, primaryStats, secondaryStats).asInts();
}

function equipSecondaryBonus(_primary: PrimaryStats, _equip: EquipStats): SecondaryStats {
  return new SecondaryStats();
}

export function calculateStatsFromLoadout(
  basePrimary: PrimaryStats,
  baseEquip: EquipStats,
  weaponType: WeaponType,
  flatModifiers: Stats,
  scalingModifiers: Stats,
): Stats {
  return calculateStats(
    basePrimary,
    baseEquip,
    new PrimaryStats(),
    new EquipStats(),
    flatModifiers,
    scalingModifiers,
    weaponType,
  );
}