import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { DamageNumber, DAMAGE_NUMBER_TIME } from './damageNumber';
import { DamageNumberType, damageNumberColor } from './damageNumberType';

describe('DamageNumber', () => {
  it('formats the number and records its start position', () => {
    const world = new World();
    const e = world.createEntity([new Position(10, 20), new DamageNumber(42.7)]);
    const dn = e.getComponent(DamageNumber)!;
    expect(dn.number).toBe('43');
    expect(dn.startY).toBe(20);
  });

  it('removes itself after its lifetime', () => {
    const world = new World();
    const e = world.createEntity([new Position(10, 20), new DamageNumber(5)]);
    world.update(DAMAGE_NUMBER_TIME + 0.1);
    expect(e.alive).toBe(false);
  });

  it('colors by type', () => {
    expect(damageNumberColor(DamageNumberType.NORMAL)).toBe(0xfff7ce);
    expect(damageNumberColor(DamageNumberType.HEAL)).toBe(0xc0ffdb);
    expect(damageNumberColor(DamageNumberType.CRIT)).toBe(0xff9494);
  });
});
