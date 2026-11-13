import { Action } from './action';
import { Actor } from '../actor/actor';
import { Stats } from '../actor/stats';
import { Position } from '../physics/position';
import { Skill } from '../skills/skill';
import type { SkillDef } from '../skills/skillDef';
import { DT } from '../constants';

export class UseSkill extends Action {
  skilldef: SkillDef;
  useTime: number;

  constructor(skilldef: SkillDef) {
    super();
    this.interruptible = false;
    this.active = false;
    this.skilldef = skilldef;
    this.useTime = skilldef.useTime;
  }

  override start(): void {
    if (!this.entity) return;
    const stats = this.entity.getComponent(Stats);
    const actor = this.entity.getComponent(Actor);
    if (!stats || !actor) return;

    if (this.skilldef.isAttack) actor.enterCombat();
    if (stats.hp < this.skilldef.hpCost) return;
    if (stats.mp < this.skilldef.mpCost) return;

    this.active = true;
    stats.addHp(-this.skilldef.hpCost);
    stats.addMp(-this.skilldef.mpCost);

    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    if (!world || !pos) return;
    for (const effect of this.skilldef.effects) {
      world.createEntity([
        new Position(pos.x, pos.y),
        new Skill(effect, this.entity),
      ]);
    }
  }

  override update(_dt?: number): void {
    if (!this.active) return;
    this.useTime -= DT;
    if (this.useTime <= 0) this.active = false;
  }

  serialize(): Record<string, unknown> {
    return { skilldef: this.skilldef.id };
  }
}
