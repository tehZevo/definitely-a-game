import { SkillEffect, type SkillEffectOptions } from './skillEffect';
import type { Skill } from '../../actor/skill';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Physics } from '../../physics/physics';
import { Position } from '../../physics/position';
import { Vector2 } from '../../utils/vector';
import { KNOCKBACK_FORCE } from '../../constants';

export const DAMAGE_SPREAD = 0.5;

export class Damage extends SkillEffect {
  constructor(
    public power = 100,
    public hits = 1,
    public magic = false,
    options: SkillEffectOptions = {},
  ) {
    super(options);
  }

  calculateHit(userStats: Stats, targetStats: Stats, critRatio: number): [number, boolean] {
    const isCrit = Math.random() < critRatio;
    const critDamageRate = 2 + Math.max(critRatio - 1, 0);
    const attack = this.magic ? userStats.magAtt : userStats.physAtt;
    const defense = this.magic ? targetStats.magDef : targetStats.physDef;
    let damage = (attack * this.power) / 100 - defense;
    if (isCrit) damage = damage * critDamageRate;
    damage = damage * DAMAGE_SPREAD + damage * (1 - DAMAGE_SPREAD) * Math.random();
    damage = Math.max(damage, 1);
    return [damage, isCrit];
  }

  override start(skill: Skill): unknown {
    const target = skill.target;
    const userStats = skill.user.getComponent(Stats);
    const targetStats = target?.getComponent(Stats);
    const targetActor = target?.getComponent(Actor);
    if (!target || !userStats || !targetStats || !targetActor) {
      skill.success = false;
      return null;
    }
    const critRatio = userStats.critical / 100;
    const hits = Array.from({ length: this.hits }, () => {
      const [damage, isCrit] = this.calculateHit(userStats, targetStats, critRatio);
      return [damage * skill.multiplier, isCrit] as [number, boolean];
    });
    targetActor.damageHits(hits);
    const totalDamage = hits.reduce((sum, [damage]) => sum + damage, 0);
    if (totalDamage > targetStats.maxHp * 0.1) {
      const targetPhysics = target.getComponent(Physics);
      const userPos = skill.user.getComponent(Position);
      const targetPos = target.getComponent(Position);
      if (targetPhysics && userPos && targetPos) {
        const dir = new Vector2(targetPos.x - userPos.x, targetPos.y - userPos.y);
        if (dir.length() > 0) {
          targetPhysics.applyForce(dir.normalize().scale(KNOCKBACK_FORCE));
        }
      }
    }
    this.spawnChildren(skill, target);
    return null;
  }
}
