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
  [SkillSlot.ALPHA]: 'KeyA',
  [SkillSlot.BETA]: 'KeyS',
  [SkillSlot.GAMMA]: 'KeyD',
  [SkillSlot.DELTA]: 'KeyF',
  [SkillSlot.OMEGA]: 'KeyQ',
};
