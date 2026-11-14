import { Component } from '../ecs';
import type { SkillDef } from './skillDef';
import { SKILL_SLOTS, SkillSlot } from './skillSlot';

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

  highestSlot(): SkillSlot | null {
    const assigned = Object.keys(this.slots)
      .map(Number)
      .filter((slot): slot is SkillSlot =>
        SKILL_SLOTS.includes(slot as SkillSlot) && this.slots[slot as SkillSlot] !== undefined);
    if (assigned.length === 0) return null;
    return assigned.reduce((highest, slot) => Math.max(highest, slot), SkillSlot.ALPHA);
  }

  visibleSlots(): SkillSlot[] {
    const highest = this.highestSlot();
    if (highest === null) return [];
    return SKILL_SLOTS.filter((slot) => slot <= highest);
  }
}
