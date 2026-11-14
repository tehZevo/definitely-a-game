import { SkillEffect, spawnEffectChildren, type SkillEffectOptions } from './skillEffect';
import type { Skill } from '../../actor/skill';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { DamageNumberType } from '../../ui/damageNumberType';

export class ConsumeHP extends SkillEffect {
  constructor(public percent = 10, options: SkillEffectOptions = {}) {
    super(options);
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    const userActor = skill.user.getComponent(Actor);
    if (!userStats || !userActor) {
      skill.success = false;
      return null;
    }
    userActor.damage(((userStats.hp * this.percent) / 100) * skill.multiplier, DamageNumberType.NORMAL);
    this.spawnChildren(skill, skill.target);
    return null;
  }
}

export class StealHP extends SkillEffect {
  constructor(public power = 100, options: SkillEffectOptions = {}) {
    super(options);
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    const targetStats = skill.target?.getComponent(Stats);
    const userActor = skill.user.getComponent(Actor);
    if (!userStats || !targetStats || !userActor) {
      skill.success = false;
      return null;
    }
    let damage = ((userStats.physAtt * this.power) / 100 - targetStats.physDef) * skill.multiplier;
    damage = Math.max(damage, 0);
    const amountToHeal = Math.min(damage, targetStats.hp);
    userActor.heal(amountToHeal);
    this.spawnChildren(skill, skill.target);
    return null;
  }
}

export class UserHPScaling extends SkillEffect {
  constructor(
    public childrenF: (hp: number) => SkillEffect[] = () => [],
    options: SkillEffectOptions = {},
  ) {
    super(options);
  }

  override start(skill: Skill): unknown {
    const userStats = skill.user.getComponent(Stats);
    if (!userStats) {
      skill.success = false;
      return null;
    }
    const children = [...this.childrenF(userStats.hp), ...this.children];
    spawnEffectChildren(skill, children, skill.target);
    return null;
  }
}
