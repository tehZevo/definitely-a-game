import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';

export class RestoreHealth extends SkillEffect {
  constructor(public percent = 100) {
    super();
  }

  override start(skill: Skill): unknown {
    const stats = skill.user.getComponent(Stats);
    const targetActor = skill.target?.getComponent(Actor);
    if (!stats || !targetActor) return null;
    const missingHp = Math.max(stats.maxHp - stats.hp, 0);
    const amountToHeal = Math.min(missingHp, (stats.maxHp * this.percent) / 100);
    if (amountToHeal > 0) {
      targetActor.heal(amountToHeal);
    }
    return null;
  }
}

export class RestoreMana extends SkillEffect {
  constructor(public percent = 100) {
    super();
  }

  override start(skill: Skill): unknown {
    const stats = skill.user.getComponent(Stats);
    const targetActor = skill.target?.getComponent(Actor);
    if (!stats || !targetActor) return null;
    const missingMp = Math.max(stats.maxMp - stats.mp, 0);
    const amountToHeal = Math.min(missingMp, (stats.maxMp * this.percent) / 100);
    if (amountToHeal > 0) {
      targetActor.healMp(amountToHeal);
    }
    return null;
  }
}
