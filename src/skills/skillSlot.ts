export enum SkillSlot {
  ALPHA,
  BETA,
  GAMMA,
  DELTA,
  OMEGA,
}

export const SKILL_SLOTS: readonly SkillSlot[] = [
  SkillSlot.ALPHA,
  SkillSlot.BETA,
  SkillSlot.GAMMA,
  SkillSlot.DELTA,
  SkillSlot.OMEGA,
];

export const SKILL_SLOT_KEYS: Record<SkillSlot, string> = {
  [SkillSlot.ALPHA]: 'Space',
  [SkillSlot.BETA]: '1',
  [SkillSlot.GAMMA]: '2',
  [SkillSlot.DELTA]: '3',
  [SkillSlot.OMEGA]: '4',
};
