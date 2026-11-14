import { describe, expect, it } from 'vitest';
import { woodenShortsword } from '../data/items/weapons';
import { cottonRobe } from '../data/items/armor';
import { Equips } from './equips';
import { WeaponSlot, ArmorSlot } from './slots';

describe('Equips', () => {
  it('saves and loads equipped items', () => {
    const source = new Equips();
    source.equipWeapon(woodenShortsword);
    source.equipArmor(cottonRobe);

    const target = new Equips();
    target.load(source.save());

    expect(target.getWeapon(WeaponSlot.PRIMARY)).toBe(woodenShortsword);
    expect(target.getArmor(ArmorSlot.SUIT)).toBe(cottonRobe);
  });
});
