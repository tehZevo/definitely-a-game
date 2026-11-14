import { describe, it, expect } from 'vitest';
import {
  ITEM_SLOT_LAYOUT,
  itemForSlot,
  itemSlotLabel,
  itemSlotPosition,
} from './itemSlot';
import { ArmorSlot, WeaponSlot, WeaponType } from '../items/slots';
import { EquipGrade } from '../items/equipGrade';
import { Loadout } from '../items/loadout';
import { Weapon } from '../items/weapon';
import { Armor } from '../items/armor';

describe('itemSlot layout', () => {
  it('orders armor slots left to right, then weapons', () => {
    expect(ITEM_SLOT_LAYOUT.map((kind) => itemSlotLabel(kind))).toEqual([
      'Hat',
      'Suit',
      'Gloves',
      'Shoes',
      'Accessory',
      'Primary',
      'Secondary',
    ]);
  });

  it('anchors the row to the bottom of the screen', () => {
    expect(itemSlotPosition(0, 192)).toEqual({ x: 2, y: 168 });
    expect(itemSlotPosition(1, 192)).toEqual({ x: 28, y: 168 });
    expect(itemSlotPosition(6, 192)).toEqual({ x: 158, y: 168 });
  });
});

describe('itemForSlot', () => {
  it('reads equipped gear out of the loadout', () => {
    const loadout = new Loadout();
    const hat = new Armor({
      id: 'linen_hat',
      armorSlot: ArmorSlot.HAT,
      grade: EquipGrade.D,
    });
    const sword = new Weapon({
      id: 'wooden_shortsword',
      weaponType: WeaponType.SHORTSWORD,
      grade: EquipGrade.E,
    });
    loadout.equipArmor(hat);
    loadout.equipWeapon(sword);

    expect(itemForSlot(loadout, { type: 'armor', slot: ArmorSlot.HAT })).toBe(hat);
    expect(itemForSlot(loadout, { type: 'weapon', slot: WeaponSlot.PRIMARY })).toBe(sword);
    expect(itemForSlot(loadout, { type: 'armor', slot: ArmorSlot.SHOES })).toBeUndefined();
  });

  it('returns the most recently equipped weapon per slot', () => {
    const loadout = new Loadout();
    const first = new Weapon({ id: 'a', weaponType: WeaponType.SHORTSWORD });
    const second = new Weapon({ id: 'b', weaponType: WeaponType.SHORTSWORD });
    loadout.equipWeapon(first);
    loadout.equipWeapon(second);

    expect(itemForSlot(loadout, { type: 'weapon', slot: WeaponSlot.PRIMARY })).toBe(second);
  });
});
