import { Component } from '../ecs';
import { LoadoutListener } from '../actor/loadoutListener';
import { WeaponSlot, ArmorSlot } from '../items/slots';
import { SkillSlot } from '../skills/skillSlot';
import type { Weapon } from '../items/weapon';
import type { Armor } from '../items/armor';
import type { SkillItem } from './skillItem';

export interface LoadoutData {
  weapons: Partial<Record<WeaponSlot, Weapon>>;
  armor: Partial<Record<ArmorSlot, Armor>>;
  skills?: Partial<Record<SkillSlot, SkillItem>>;
}

export class Loadout extends Component {
  weapons: Partial<Record<WeaponSlot, Weapon>> = {};
  armor: Partial<Record<ArmorSlot, Armor>> = {};
  skills: Partial<Record<SkillSlot, SkillItem>> = {};

  equipWeapon(weapon: Weapon): void {
    this.weapons[weapon.slot] = weapon;
    this.alertListeners();
  }

  unequipWeapon(slot: WeaponSlot): Weapon | undefined {
    const w = this.weapons[slot];
    delete this.weapons[slot];
    return w;
  }

  equipArmor(armor: Armor): void {
    this.armor[armor.armorSlot] = armor;
    this.alertListeners();
  }

  unequipArmor(slot: ArmorSlot): Armor | undefined {
    const a = this.armor[slot];
    delete this.armor[slot];
    return a;
  }

  equipSkill(item: SkillItem): void {
    this.skills[item.slot] = item;
    this.alertListeners();
  }

  unequipSkill(slot: SkillSlot): SkillItem | undefined {
    const item = this.skills[slot];
    delete this.skills[slot];
    return item;
  }

  getSkill(slot: SkillSlot): SkillItem | undefined {
    return this.skills[slot];
  }

  getWeapon(slot: WeaponSlot): Weapon | undefined {
    return this.weapons[slot];
  }

  get primaryWeapon(): Weapon | undefined {
    return this.weapons[WeaponSlot.PRIMARY];
  }

  getArmor(slot: ArmorSlot): Armor | undefined {
    return this.armor[slot];
  }

  allBuffs(): string[] {
    const items = this.equippedItems();
    return [...new Set(items.flatMap((item) => item.buffs))];
  }

  itemIds(): string[] {
    return this.equippedItems().map((item) => item.id);
  }

  itemSets(): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const item of this.equippedItems()) {
      if (!item.set) continue;
      counts[item.set] = (counts[item.set] ?? 0) + 1;
    }
    return counts;
  }

  alertListeners(): void {
    if (!this.entity) return;
    for (const listener of this.entity.find(LoadoutListener)) {
      listener.onLoadoutChanged(this);
    }
  }

  private equippedItems() {
    return [
      ...Object.values(this.weapons),
      ...Object.values(this.armor),
      ...Object.values(this.skills),
    ].filter((item): item is NonNullable<typeof item> => item !== undefined);
  }

  save(): LoadoutData {
    return {
      weapons: { ...this.weapons },
      armor: { ...this.armor },
      skills: { ...this.skills },
    };
  }

  load(data: LoadoutData): void {
    this.weapons = { ...data.weapons };
    this.armor = { ...data.armor };
    this.skills = { ...(data.skills ?? {}) };
    this.alertListeners();
  }
}
