import { describe, it, expect } from 'vitest';
import { SkillRank, skillRankIcon } from './skillRank';

describe('skillRankIcon', () => {
  it('maps each rank to its icon path', () => {
    expect(skillRankIcon(SkillRank.I)).toBe('assets/icons/i.png');
    expect(skillRankIcon(SkillRank.II)).toBe('assets/icons/ii.png');
    expect(skillRankIcon(SkillRank.III)).toBe('assets/icons/iii.png');
    expect(skillRankIcon(SkillRank.IV)).toBe('assets/icons/iv.png');
  });
});
