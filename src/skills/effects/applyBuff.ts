import { SkillEffect } from './skillEffect';
import type { Skill } from '../skill';
import type { BuffDef } from '../../buffs/buffDef';
import { Stats } from '../../actor/stats';
import { Buffs } from '../../buffs/buffs';

const noScaling = (_stats: Stats) => 0;

export class ApplyBuff extends SkillEffect {
  constructor(
    public buffdef: BuffDef,
    public flatPower = 0,
    public flatTime = 0,
    public powerScaling: (stats: Stats) => number = noScaling,
    public timeScaling: (stats: Stats) => number = noScaling,
  ) {
    super();
  }

  override start(skill: Skill): unknown {
    if (!skill.target) return null;
    const stats = skill.target.getComponent(Stats);
    const buffs = skill.target.getComponent(Buffs);
    if (!stats || !buffs) return null;
    const power = this.flatPower + this.powerScaling(stats);
    const time = this.flatTime + this.timeScaling(stats);
    buffs.applyBuff(this.buffdef, power, time, skill.user);
    return null;
  }
}
