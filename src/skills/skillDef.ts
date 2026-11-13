import { SkillRank } from './skillRank';
import type { SkillSlot } from './skillSlot';
import type { SkillEffect } from './effects/skillEffect';

export const DEFAULT_SKILL_USE_TIME = 0.5;

export class SkillDef {
  effects: SkillEffect[];

  constructor(
    public id: string,
    effects: SkillEffect | SkillEffect[],
    public isAttack = true,
    public rank: SkillRank = SkillRank.I,
    public cooldown: number | null = null,
    public mpCost = 0,
    public hpCost = 0,
    public useTime = DEFAULT_SKILL_USE_TIME,
    public slot: SkillSlot | string | null = null,
    public icon: string | null = null,
    public miniIcon: string | null = null,
  ) {
    this.effects = Array.isArray(effects) ? effects : [effects];
  }
}
