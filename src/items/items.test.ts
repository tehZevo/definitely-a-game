import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Equips } from '../items/equips';
import { WeaponSlot, ArmorSlot, WeaponType, weaponHandedness, Handedness, SWINGABLE_PRIMARIES } from '../items/slots';
import { Rarity, rarityColor, rarityDropRate } from '../items/rarity';
import { EquipGrade, equipGradeIcon } from '../items/equipGrade';
import { ItemDef, BASE_DROP_RATE } from '../items/itemDef';
import { woodenShortsword, woodenShield, copperLongsword } from '../data/items/weapons';
import { cottonHat, leatherSuit, copperHelmet } from '../data/items/armor';

describe('ItemDef', () => {
  it('has default values', () => {
    const item = new ItemDef();
    expect(item.id).toBe('');
    expect(item.icon).toBe('assets/unknown.png');
    expect(item.rarity).toBe(Rarity.COMMON);
  });

  it('calcDropRate uses rarity', () => {
    const item = new ItemDef({ rarity: Rarity.RARE });
    expect(item.calcDropRate()).toBe(BASE_DROP_RATE * 0.5);
  });
});

describe('Rarity', () => {
  it('rarityColor returns correct colors', () => {
    expect(rarityColor(Rarity.COMMON)).toBe(0xe6e6e6);
    expect(rarityColor(Rarity.RARE)).toBe(0x64a0e6);
  });

  it('rarityDropRate decreases with rarity', () => {
    expect(rarityDropRate(Rarity.COMMON)).toBe(1);
    expect(rarityDropRate(Rarity.LEGENDARY)).toBe(1 / 8);
  });
});

describe('EquipGrade', () => {
  it('equipGradeIcon returns paths', () => {
    expect(equipGradeIcon(EquipGrade.E)).toBe('assets/icons/e.png');
    expect(equipGradeIcon(EquipGrade.UNKNOWN)).toBeNull();
  });
});

describe('Weapon', () => {
  it('woodenShortsword is PRIMARY slot', () => {
    expect(woodenShortsword.slot).toBe(WeaponSlot.PRIMARY);
  });

  it('woodenShield is SECONDARY slot', () => {
    expect(woodenShield.slot).toBe(WeaponSlot.SECONDARY);
  });

  it('weaponHandedness correct for LONGSWORD', () => {
    expect(weaponHandedness(WeaponType.LONGSWORD)).toBe(Handedness.TWO_HANDED);
  });

  it('SWINGABLE_PRIMARIES includes SHORTSWORD', () => {
    expect(SWINGABLE_PRIMARIES).toContain(WeaponType.SHORTSWORD);
  });
});

describe('Equips component', () => {
  it('equip and unequip weapon', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new Equips()]);
    const equips = entity.getComponent(Equips)!;
    equips.equipWeapon(woodenShortsword);
    expect(equips.getWeapon(WeaponSlot.PRIMARY)).toBe(woodenShortsword);
    equips.unequipWeapon(WeaponSlot.PRIMARY);
    expect(equips.getWeapon(WeaponSlot.PRIMARY)).toBeUndefined();
  });

  it('equip and unequip armor', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new Equips()]);
    const equips = entity.getComponent(Equips)!;
    equips.equipArmor(cottonHat);
    expect(equips.getArmor(ArmorSlot.HAT)).toBe(cottonHat);
    equips.unequipArmor(ArmorSlot.HAT);
    expect(equips.getArmor(ArmorSlot.HAT)).toBeUndefined();
  });

  it('replaces existing equipment in same slot', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new Equips()]);
    const equips = entity.getComponent(Equips)!;
    equips.equipWeapon(woodenShortsword);
    equips.equipWeapon(copperLongsword);
    expect(equips.getWeapon(WeaponSlot.PRIMARY)).toBe(copperLongsword);
  });
});

describe('Item data', () => {
  it('weapons have correct types', () => {
    expect(woodenShortsword.weaponType).toBe(WeaponType.SHORTSWORD);
    expect(copperLongsword.weaponType).toBe(WeaponType.LONGSWORD);
  });

  it('armor has correct slots', () => {
    expect(cottonHat.armorSlot).toBe(ArmorSlot.HAT);
    expect(leatherSuit.armorSlot).toBe(ArmorSlot.SUIT);
    expect(copperHelmet.armorSlot).toBe(ArmorSlot.HAT);
  });
});
