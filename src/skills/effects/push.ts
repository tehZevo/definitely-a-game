import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import { Position } from '../../physics/position';
import { Physics } from '../../physics/physics';
import { Vector2 } from '../../utils/vector';

export class Push extends SkillEffect {
  constructor(public force = 1, public scaleWithDistance = true) {
    super();
  }

  override start(skill: Skill): unknown {
    if (!skill.target) return null;
    const parentPos = skill.parent?.getComponent(Position);
    const targetPos = skill.target.getComponent(Position);
    const targetPhysics = skill.target.getComponent(Physics);
    if (!parentPos || !targetPos || !targetPhysics) return null;

    const dx = targetPos.x - parentPos.x;
    const dy = targetPos.y - parentPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dir = dist > 0 ? new Vector2(dx / dist, dy / dist) : new Vector2(0, 0);

    let f = this.force;
    if (this.scaleWithDistance) {
      f = f / Math.max(1, dist);
    }
    targetPhysics.applyForce(dir.scale(f));
    return null;
  }
}
