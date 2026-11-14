import { LoadoutListener } from '../actor/loadoutListener';
import type { Loadout } from '../items/loadout';
import { SKILL_SLOTS } from './skillSlot';
import { SkillSlots } from './skillSlots';

export class SkillSlotLoader extends LoadoutListener {
  override onLoadoutChanged(equips: Loadout): void {
    const slots = this.entity.getComponent(SkillSlots);
    if (!slots) return;
    for (const slot of SKILL_SLOTS) {
      const item = equips.skills[slot];
      if (item) slots.set(slot, item.skilldef);
    }
  }
}
