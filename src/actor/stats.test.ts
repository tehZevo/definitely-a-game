import { describe, it, expect } from 'vitest';
import { Stats } from './stats';
import { Equips } from '../items/equips';
import { woodenShortsword } from '../data/items/weapons';

describe('Stats', () => {
  it('stores initial values', () => {
    const s = new Stats(100, 100, 50, 50);
    expect(s.hp).toBe(100);
    expect(s.maxHp).toBe(100);
    expect(s.mp).toBe(50);
    expect(s.maxMp).toBe(50);
  });

  it('defaults mp/maxMp to 0', () => {
    const s = new Stats(30, 40);
    expect(s.mp).toBe(0);
    expect(s.maxMp).toBe(0);
  });

  it('defaults magic attack and defense', () => {
    const s = new Stats(30, 40);
    expect(s.magAtt).toBe(100);
    expect(s.magDef).toBe(0);
  });

  it('addHp clamps to [0, maxHp]', () => {
    const s = new Stats(50, 100);
    s.addHp(200);
    expect(s.hp).toBe(100);
    s.addHp(-1000);
    expect(s.hp).toBe(0);
  });

  it('addMp clamps to [0, maxMp]', () => {
    const s = new Stats(50, 100, 20, 50);
    s.addMp(1000);
    expect(s.mp).toBe(50);
    s.addMp(-1000);
    expect(s.mp).toBe(0);
  });

  it('snapshots and loads stats', () => {
    const source = new Stats(75, 100, 25, 50, 120, 10, 5, 130, 7);
    const target = new Stats(1, 1);
    target.load(source.snapshot());

    expect(target.snapshot()).toEqual(source.snapshot());
  });

  it('recalculates stats from equipped items', () => {
    const stats = new Stats(75, 100, 25, 50, 100, 0, 0, 100, 0);
    const equips = new Equips();
    equips.equipWeapon(woodenShortsword);

    stats.recalculate(equips);

    expect(stats.maxHp).toBe(100);
    expect(stats.maxMp).toBe(50);
    expect(stats.physAtt).toBe(110);
    expect(stats.hp).toBe(75);
    expect(stats.mp).toBe(25);
  });
});
