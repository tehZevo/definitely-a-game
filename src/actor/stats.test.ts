import { describe, it, expect } from 'vitest';
import { Stats } from './stats';

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
});
