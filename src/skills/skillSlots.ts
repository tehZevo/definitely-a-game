import { Component } from '../ecs';
import type { SkillDef } from './skillDef';
import { SkillSlot } from './skillSlot';

export class SkillSlots extends Component {
  constructor(public slots: Partial<Record<SkillSlot, SkillDef>> = {}) {
    super();
  }

  get(slot: SkillSlot): SkillDef | null {
    return this.slots[slot] ?? null;
  }

  set(slot: SkillSlot, def: SkillDef | null): void {
    if (def === null) delete this.slots[slot];
    else this.slots[slot] = def;
  }
}
