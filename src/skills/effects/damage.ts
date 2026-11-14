import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';

export const DAMAGE_SPREAD = 0.5;

export class Damage extends SkillEffect {
  constructor(public power = 100, public hits = 1, public magic = false) {
    super();
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
    const userStats = skill.user.getComponent(Stats);
    const targetStats = skill.target?.getComponent(Stats);
    const targetActor = skill.target?.getComponent(Actor);
    if (!userStats || !targetStats || !targetActor) return null;
    const critRatio = userStats.critical / 100;
    const hits = Array.from({ length: this.hits }, () =>
      this.calculateHit(userStats, targetStats, critRatio),
    );
    targetActor.damageHits(hits);
    return null;
  }
}
