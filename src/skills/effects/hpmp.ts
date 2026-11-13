import { SkillEffect } from './skillEffect';
import { Skill } from '../skill';
import { Position } from '../../physics/position';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { DamageNumberType } from '../../ui/damageNumberType';

export class ConsumeHP extends SkillEffect {
  constructor(public percent = 10) {
    super();
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    const userActor = skill.user.getComponent(Actor);
    if (!userStats || !userActor) return null;
    userActor.damage((userStats.hp * this.percent) / 100, DamageNumberType.NORMAL);
    return null;
  }
}

export class StealHP extends SkillEffect {
  constructor(public power = 100) {
    super();
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    const targetStats = skill.target?.getComponent(Stats);
    const userActor = skill.user.getComponent(Actor);
    if (!userStats || !targetStats || !userActor) return null;
    let damage = (userStats.physAtt * this.power) / 100 - targetStats.physDef;
    damage = Math.max(damage, 0);
    const amountToHeal = Math.min(damage, targetStats.hp);
    userActor.heal(amountToHeal);
    return null;
  }
}

export class UserHPScaling extends SkillEffect {
  constructor(public childrenF: (hp: number) => SkillEffect[] = () => []) {
    super();
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    if (!userStats) return null;
    const children = this.childrenF(userStats.hp);
    const world = skill.entity.world;
    if (!world) return null;
    const parentPos = skill.entity.getComponent(Position);
    const pos = parentPos
      ? new Position(parentPos.x, parentPos.y)
      : new Position(0, 0);
    for (const child of children) {
      world.createEntity([pos, new Skill(child, skill.user, skill.entity, skill.target)]);
    }
    return null;
  }
}
