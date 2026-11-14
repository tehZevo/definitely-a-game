import { ArmorSlot, WeaponSlot } from '../items/slots';
import type { Loadout } from '../items/loadout';
import type { Equip } from '../items/equip';

export type ItemSlotKind =
  | { type: 'armor'; slot: ArmorSlot }
  | { type: 'weapon'; slot: WeaponSlot };

export const ITEM_SLOT_SIZE = 24;
export const ITEM_SLOT_GAP = 2;
export const ITEM_SLOT_BASE_X = 2;

export const ITEM_SLOT_LAYOUT: ItemSlotKind[] = [
  { type: 'armor', slot: ArmorSlot.HAT },
  { type: 'armor', slot: ArmorSlot.SUIT },
  { type: 'armor', slot: ArmorSlot.GLOVES },
  { type: 'armor', slot: ArmorSlot.SHOES },
  { type: 'armor', slot: ArmorSlot.ACCESSORY },
  { type: 'weapon', slot: WeaponSlot.PRIMARY },
  { type: 'weapon', slot: WeaponSlot.SECONDARY },
];

const ARMOR_LABELS: Record<ArmorSlot, string> = {
  [ArmorSlot.HAT]: 'Hat',
  [ArmorSlot.SUIT]: 'Suit',
  [ArmorSlot.GLOVES]: 'Gloves',
  [ArmorSlot.SHOES]: 'Shoes',
  [ArmorSlot.ACCESSORY]: 'Accessory',
};

const WEAPON_LABELS: Record<WeaponSlot, string> = {
  [WeaponSlot.PRIMARY]: 'Primary',
  [WeaponSlot.SECONDARY]: 'Secondary',
};

export function itemSlotPosition(index: number, screenH: number): { x: number; y: number } {
  return {
    x: ITEM_SLOT_BASE_X + index * (ITEM_SLOT_SIZE + ITEM_SLOT_GAP),
    y: screenH - ITEM_SLOT_SIZE,
  };
}

export function itemForSlot(loadout: Loadout, kind: ItemSlotKind): Equip | undefined {
  return kind.type === 'armor'
    ? loadout.getArmor(kind.slot)
    : loadout.getWeapon(kind.slot);
}

export function itemSlotLabel(kind: ItemSlotKind): string {
  return kind.type === 'armor' ? ARMOR_LABELS[kind.slot] : WEAPON_LABELS[kind.slot];
}

export function itemSlotKey(kind: ItemSlotKind): string {
  return `${kind.type}:${kind.slot}`;
}
