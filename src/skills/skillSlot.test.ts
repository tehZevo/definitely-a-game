import { describe, it, expect } from 'vitest';
import { SkillSlot, SKILL_SLOTS, SKILL_SLOT_KEYS } from './skillSlot';

describe('skillSlot', () => {
  it('lists all five slots in order', () => {
    expect(SKILL_SLOTS).toEqual([
      SkillSlot.ALPHA,
      SkillSlot.BETA,
      SkillSlot.GAMMA,
      SkillSlot.DELTA,
      SkillSlot.OMEGA,
    ]);
  });

  it('maps each slot to a key binding', () => {
    expect(SKILL_SLOT_KEYS[SkillSlot.ALPHA]).toBe('Space');
    expect(SKILL_SLOT_KEYS[SkillSlot.BETA]).toBe('1');
    expect(SKILL_SLOT_KEYS[SkillSlot.OMEGA]).toBe('4');
  });
});
