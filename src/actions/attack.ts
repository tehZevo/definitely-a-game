import { Action } from './action';
import { Actor } from '../actor/actor';
import { Equips } from '../items/equips';
import { UseSkill } from './useSkill';
import type { SkillDef } from '../skills/skillDef';
import { defaultAttack } from '../data/skills/defaultAttack';

export class Attack extends Action {
  constructor() {
    super();
    this.interruptible = false;
  }

  override start(): void {
    if (!this.entity) return;
    const equips = this.entity.getComponent(Equips);
    void equips;
    const skill: SkillDef = defaultAttack;
    this.entity.getComponent(Actor)?.act(new UseSkill(skill));
  }

  serialize(): Record<string, unknown> {
    return {};
  }
}
