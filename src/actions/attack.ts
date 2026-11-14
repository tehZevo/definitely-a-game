import { Action } from './action';
import { Actor } from '../actor/actor';
import { Loadout } from '../items/loadout';
import { WeaponSlot } from '../items/slots';
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
    const equips = this.entity.getComponent(Loadout);
    const weapon = equips?.getWeapon(WeaponSlot.PRIMARY);
    const skill: SkillDef = weapon?.attackSkill ?? defaultAttack;
    this.entity.getComponent(Actor)?.act(new UseSkill(skill));
  }

  serialize(): Record<string, unknown> {
    return {};
  }
}
