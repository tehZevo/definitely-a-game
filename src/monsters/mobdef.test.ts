import { describe, it, expect } from 'vitest';
import { MobDef } from './mobdef';

describe('MobDef', () => {
  it('stores id, sprite, and difficulty', () => {
    const d = new MobDef('slime', 'assets/monsters/slime_idle.png', 5);
    expect(d.id).toBe('slime');
    expect(d.sprite).toBe('assets/monsters/slime_idle.png');
    expect(d.difficulty).toBe(5);
  });

  it('defaults difficulty to 5', () => {
    expect(new MobDef('x', 'y.png').difficulty).toBe(5);
  });

  it('stores and defaults stats', () => {
    const d = new MobDef('x', 'y.png', 5, 30, 12);
    expect(d.maxHp).toBe(30);
    expect(d.maxMp).toBe(12);
    expect(new MobDef('x', 'y.png').maxHp).toBe(10);
  });

  it('defaults magic stats', () => {
    const d = new MobDef('x', 'y.png');
    expect(d.magAtt).toBe(100);
    expect(d.magDef).toBe(0);
  });
});

import { createMonsterWeapon } from '../items/monsterItems';
import { MOOK } from './archetypes';

describe('MobDef monster weapon', () => {
  it('builds a weapon from difficulty and archetypes', () => {
    const d = new MobDef('x', 'y.png', 20, 10, 0, [], [], 100, 0, [MOOK]);
    expect(d.weapon.equipArchetype.PATT).toBe(2);
    expect(d.weapon.primaryArchetype.STR).toBe(2);
  });

  it('uses the default difficulty of 5 as the base', () => {
    expect(new MobDef('x', 'y.png').weapon.equipArchetype.MATT).toBe(5);
  });

  it('matches createMonsterWeapon for the same arguments', () => {
    const d = new MobDef('x', 'y.png', 7, 10, 0, [], [], 100, 0, [MOOK]);
    const expected = createMonsterWeapon(7, [MOOK]);
    expect(d.weapon.equipArchetype.PDEF).toBe(expected.equipArchetype.PDEF);
  });
});
