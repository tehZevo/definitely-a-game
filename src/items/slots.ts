export enum WeaponSlot {
  PRIMARY,
  SECONDARY,
}

export enum ArmorSlot {
  HAT,
  SUIT,
  GLOVES,
  SHOES,
  ACCESSORY,
}

export enum Handedness {
  ONE_HANDED,
  TWO_HANDED,
  SECONDARY,
}

export enum WeaponType {
  SHORTSWORD,
  SHORTSWORD_L,
  LONGSWORD,
  POLEARM,
  MACE,
  KNUCKLES,
  BOW,
  DAGGER,
  DAGGER_L,
  REPEATER,
  REPEATER_L,
  STAFF,
  SHIELD,
  ORB,
  TOME,
}

export const SWINGABLE_PRIMARIES: readonly WeaponType[] = [
  WeaponType.SHORTSWORD,
  WeaponType.LONGSWORD,
  WeaponType.POLEARM,
  WeaponType.MACE,
  WeaponType.DAGGER,
  WeaponType.STAFF,
];

export const CAN_CAST_MAGIC_PRIMARIES: readonly WeaponType[] = [
  ...SWINGABLE_PRIMARIES,
  WeaponType.KNUCKLES,
];

export function weaponHandedness(wt: WeaponType): Handedness {
  switch (wt) {
    case WeaponType.LONGSWORD:
    case WeaponType.POLEARM:
    case WeaponType.BOW:
    case WeaponType.KNUCKLES:
      return Handedness.TWO_HANDED;
    case WeaponType.SHORTSWORD_L:
    case WeaponType.DAGGER_L:
    case WeaponType.REPEATER_L:
    case WeaponType.SHIELD:
    case WeaponType.ORB:
    case WeaponType.TOME:
      return Handedness.SECONDARY;
    default:
      return Handedness.ONE_HANDED;
  }
}

export function weaponSlot(wt: WeaponType): WeaponSlot {
  const h = weaponHandedness(wt);
  return h === Handedness.SECONDARY ? WeaponSlot.SECONDARY : WeaponSlot.PRIMARY;
}

export enum WeaponSpeed {
  VERY_SLOW,
  SLOW,
  MEDIUM,
  FAST,
  VERY_FAST,
}

export function weaponSpeed(wt: WeaponType): WeaponSpeed {
  switch (wt) {
    case WeaponType.DAGGER:
      return WeaponSpeed.VERY_FAST;
    case WeaponType.SHORTSWORD:
    case WeaponType.KNUCKLES:
    case WeaponType.REPEATER:
      return WeaponSpeed.FAST;
    case WeaponType.MACE:
    case WeaponType.BOW:
      return WeaponSpeed.MEDIUM;
    case WeaponType.LONGSWORD:
    case WeaponType.STAFF:
      return WeaponSpeed.SLOW;
    case WeaponType.POLEARM:
      return WeaponSpeed.VERY_SLOW;
    default:
      return WeaponSpeed.MEDIUM;
  }
}

export function weaponSpeedModifier(speed: WeaponSpeed): number {
  switch (speed) {
    case WeaponSpeed.VERY_FAST:
      return 0.8;
    case WeaponSpeed.FAST:
      return 0.9;
    case WeaponSpeed.MEDIUM:
      return 1.0;
    case WeaponSpeed.SLOW:
      return 1.1;
    case WeaponSpeed.VERY_SLOW:
      return 1.2;
  }
}
