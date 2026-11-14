import { describe, expect, it } from 'vitest';
import {
  WeaponSpeed,
  WeaponType,
  weaponSpeed,
  weaponSpeedModifier,
} from './slots';

describe('weapon speed', () => {
  it('maps weapon types to speeds', () => {
    expect(weaponSpeed(WeaponType.DAGGER)).toBe(WeaponSpeed.VERY_FAST);
    expect(weaponSpeed(WeaponType.SHORTSWORD)).toBe(WeaponSpeed.FAST);
    expect(weaponSpeed(WeaponType.BOW)).toBe(WeaponSpeed.MEDIUM);
    expect(weaponSpeed(WeaponType.LONGSWORD)).toBe(WeaponSpeed.SLOW);
    expect(weaponSpeed(WeaponType.POLEARM)).toBe(WeaponSpeed.VERY_SLOW);
  });

  it('maps speeds to use-time modifiers', () => {
    expect(weaponSpeedModifier(WeaponSpeed.VERY_FAST)).toBe(0.8);
    expect(weaponSpeedModifier(WeaponSpeed.FAST)).toBe(0.9);
    expect(weaponSpeedModifier(WeaponSpeed.MEDIUM)).toBe(1.0);
    expect(weaponSpeedModifier(WeaponSpeed.SLOW)).toBe(1.1);
    expect(weaponSpeedModifier(WeaponSpeed.VERY_SLOW)).toBe(1.2);
  });
});
