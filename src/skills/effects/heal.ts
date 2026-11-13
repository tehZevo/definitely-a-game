import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { DAMAGE_SPREAD } from './damage';

export class Heal extends SkillEffect {
  constructor(public power = 100) {
    super();
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    const targetActor = skill.target?.getComponent(Actor);
    if (!userStats || !targetActor) return null;
    const healing = (userStats.physAtt * this.power) / 100;
    targetActor.heal(healing * DAMAGE_SPREAD);
    return null;
  }
}
