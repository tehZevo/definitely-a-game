import { ItemDef } from './itemDef';
import type { SkillDef } from '../skills/skillDef';
import type { SkillSlot } from '../skills/skillSlot';
import type { Rarity } from './rarity';

export interface SkillItemOptions {
  skilldef: SkillDef;
  id?: string;
  rarity?: Rarity;
  icon?: string;
  miniIcon?: string;
  description?: string | null;
  buffs?: string[];
  set?: string | null;
  slot?: SkillSlot;
}

export class SkillItem extends ItemDef {
  skilldef: SkillDef;
  slot: SkillSlot;

  constructor(opts: SkillItemOptions) {
    super({
      id: opts.id ?? opts.skilldef.id,
      rarity: opts.rarity,
      icon: opts.icon ?? opts.skilldef.icon ?? undefined,
      miniIcon: opts.miniIcon ?? opts.skilldef.miniIcon ?? undefined,
      description: opts.description ?? opts.skilldef.description,
      buffs: opts.buffs,
      set: opts.set,
    });
    this.skilldef = opts.skilldef;
    this.slot = opts.slot ?? (opts.skilldef.slot as SkillSlot);
  }
}

export function isSkillItem(item: ItemDef): item is SkillItem {
  return (item as SkillItem).skilldef !== undefined;
}
