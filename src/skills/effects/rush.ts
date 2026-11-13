import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import { Physics } from '../../physics/physics';
import { Actor } from '../../actor/actor';

export class Rush extends SkillEffect {
  constructor(public force = 1) {
    super();
  }

  override start(skill: Skill): unknown {
    if (!skill.target) return null;
    const phys = skill.target.getComponent(Physics);
    const actor = skill.target.getComponent(Actor);
    if (!phys || !actor) return null;
    phys.applyForce(actor.moveDir.scale(this.force));
    return null;
  }
}
