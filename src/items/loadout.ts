import { Component } from '../ecs';
import { WeaponSlot, ArmorSlot } from '../items/slots';
import type { Weapon } from '../items/weapon';
import type { Armor } from '../items/armor';

export interface LoadoutData {
  weapons: Partial<Record<WeaponSlot, Weapon>>;
  armor: Partial<Record<ArmorSlot, Armor>>;
}

export class Loadout extends Component {
  weapons: Partial<Record<WeaponSlot, Weapon>> = {};
  armor: Partial<Record<ArmorSlot, Armor>> = {};

  equipWeapon(weapon: Weapon): void {
    this.weapons[weapon.slot] = weapon;
  }

  unequipWeapon(slot: WeaponSlot): Weapon | undefined {
    const w = this.weapons[slot];
    delete this.weapons[slot];
    return w;
  }

  equipArmor(armor: Armor): void {
    this.armor[armor.armorSlot] = armor;
  }

  unequipArmor(slot: ArmorSlot): Armor | undefined {
    const a = this.armor[slot];
    delete this.armor[slot];
    return a;
  }

  getWeapon(slot: WeaponSlot): Weapon | undefined {
    return this.weapons[slot];
  }

  getArmor(slot: ArmorSlot): Armor | undefined {
    return this.armor[slot];
  }

  allBuffs(): string[] {
    const items = [
      ...Object.values(this.weapons),
      ...Object.values(this.armor),
    ].filter((item): item is NonNullable<typeof item> => item !== undefined);
    return [...new Set(items.flatMap((item) => item.buffs))];
  }

  save(): LoadoutData {
    return {
      weapons: { ...this.weapons },
      armor: { ...this.armor },
    };
  }

  load(data: LoadoutData): void {
    this.weapons = { ...data.weapons };
    this.armor = { ...data.armor };
  }
}
