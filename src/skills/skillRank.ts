export enum SkillRank {
  I,
  II,
  III,
  IV,
}

export function skillRankIcon(rank: SkillRank): string {
  switch (rank) {
    case SkillRank.I:
      return 'assets/icons/i.png';
    case SkillRank.II:
      return 'assets/icons/ii.png';
    case SkillRank.III:
      return 'assets/icons/iii.png';
    case SkillRank.IV:
      return 'assets/icons/iv.png';
  }
}
