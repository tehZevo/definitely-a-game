import { describe, it, expect } from 'vitest';
import { SkillDef, weaponFilterFor } from './skillDef';
import { SkillEffect } from './effects/skillEffect';
import { SkillRank } from './skillRank';
import { WeaponType } from '../items/slots';

describe('SkillDef', () => {
  it('wraps a single effect in an array', () => {
    const effect = new SkillEffect();
    const def = new SkillDef('test', effect);
    expect(def.effects).toEqual([effect]);
    expect(def.id).toBe('test');
    expect(def.rank).toBe(SkillRank.I);
    expect(def.mpCost).toBe(0);
    expect(def.description).toBeNull();
  });

  it('stores a description', () => {
    const effect = new SkillEffect();
    const def = new SkillDef('test', effect, true, SkillRank.I, null, 0, 0, 0.5, null, null, null, 'Zaps an enemy.');
    expect(def.description).toBe('Zaps an enemy.');
  });

  it('accepts an array of effects', () => {
    const a = new SkillEffect();
    const b = new SkillEffect();
    const def = new SkillDef('test', [a, b]);
    expect(def.effects).toEqual([a, b]);
  });

  it('uses default weapon filter', () => {
    const def = new SkillDef('test', new SkillEffect());
    expect(def.weaponFilter(WeaponType.SHORTSWORD, WeaponType.SHIELD)).toBe(true);
  });

  it('uses custom weapon filter', () => {
    const def = new SkillDef(
      'test',
      new SkillEffect(),
      true,
      SkillRank.I,
      null,
      0,
      0,
      0.5,
      null,
      null,
      null,
      null,
      weaponFilterFor([WeaponType.STAFF]),
    );
    expect(def.weaponFilter(WeaponType.STAFF, undefined)).toBe(true);
    expect(def.weaponFilter(WeaponType.SHORTSWORD, undefined)).toBe(false);
  });
});
