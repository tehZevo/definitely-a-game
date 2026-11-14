import { describe, it, expect } from 'vitest';
import { SkillRank, skillRankColor, skillRankIcon } from './skillRank';

describe('skillRankIcon', () => {
  it('maps each rank to its icon path', () => {
    expect(skillRankIcon(SkillRank.I)).toBe('assets/icons/i.png');
    expect(skillRankIcon(SkillRank.II)).toBe('assets/icons/ii.png');
    expect(skillRankIcon(SkillRank.III)).toBe('assets/icons/iii.png');
    expect(skillRankIcon(SkillRank.IV)).toBe('assets/icons/iv.png');
  });
});

describe('skillRankColor', () => {
  it('maps each rank to a color', () => {
    expect(skillRankColor(SkillRank.I)).toBe(0x9ad07a);
    expect(skillRankColor(SkillRank.II)).toBe(0x64a0e6);
    expect(skillRankColor(SkillRank.III)).toBe(0xa000ff);
    expect(skillRankColor(SkillRank.IV)).toBe(0xe69632);
  });
});
