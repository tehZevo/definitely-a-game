import { SkillEffect, type SkillEffectOptions } from './skillEffect';
import type { Skill } from '../../actor/skill';
import { Physics } from '../../physics/physics';
import { Actor } from '../../actor/actor';

export class Rush extends SkillEffect {
  constructor(public force = 1, options: SkillEffectOptions = {}) {
    super(options);
  }

  override start(skill: Skill): unknown {
    if (!skill.target) {
      skill.success = false;
      return null;
    }
    const phys = skill.target.getComponent(Physics);
    const actor = skill.target.getComponent(Actor);
    if (!phys || !actor) {
      skill.success = false;
      return null;
    }
    phys.applyForce(actor.moveDir.scale(this.force * skill.multiplier));
    this.spawnChildren(skill, skill.target);
    return null;
  }
}
