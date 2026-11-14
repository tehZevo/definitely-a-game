import { describe, it, expect } from 'vitest';
import { createMonsterWeapon } from './monsterItems';
import { MOOK, TANK } from '../monsters/archetypes';
import { WeaponSlot } from './slots';
import { Loadout } from './loadout';
import { Stats } from '../actor/stats';

describe('createMonsterWeapon', () => {
  it('uses the base difficulty for every stat', () => {
    const weapon = createMonsterWeapon(20);
    expect(weapon.equipArchetype.PATT).toBe(20);
    expect(weapon.primaryArchetype.STR).toBe(20);
    expect(weapon.slot).toBe(WeaponSlot.PRIMARY);
  });

  it('defaults to a base of 10', () => {
    expect(createMonsterWeapon().equipArchetype.PDEF).toBe(10);
  });

  it('scales stats through each archetype', () => {
    const weapon = createMonsterWeapon(10, [MOOK]);
    expect(weapon.equipArchetype.PATT).toBe(1);
    expect(weapon.primaryArchetype.STR).toBe(1);
  });

  it('stacks archetypes multiplicatively', () => {
    const weapon = createMonsterWeapon(10, [TANK, MOOK]);
    expect(weapon.equipArchetype.PATT).toBeCloseTo(0.5);
    expect(weapon.primaryArchetype.VIT).toBeCloseTo(0.2);
  });

  it('feeds the mob stats through the loadout', () => {
    const loadout = new Loadout();
    loadout.equipWeapon(createMonsterWeapon(10, [MOOK]));
    const stats = new Stats(10, 10, 0, 0, 100, 0, 0, 100, 0);
    stats.recalculate(loadout);
    expect(stats.maxHp).toBeGreaterThan(10);
  });
});
