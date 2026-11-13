import { describe, it, expect } from 'vitest';
import { SkillDef } from './skillDef';
import { SkillEffect } from './effects/skillEffect';
import { SkillRank } from './skillRank';

describe('SkillDef', () => {
  it('wraps a single effect in an array', () => {
    const effect = new SkillEffect();
    const def = new SkillDef('test', effect);
    expect(def.effects).toEqual([effect]);
    expect(def.id).toBe('test');
    expect(def.rank).toBe(SkillRank.I);
    expect(def.mpCost).toBe(0);
  });

  it('accepts an array of effects', () => {
    const a = new SkillEffect();
    const b = new SkillEffect();
    const def = new SkillDef('test', [a, b]);
    expect(def.effects).toEqual([a, b]);
  });
});
