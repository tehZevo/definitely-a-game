import { describe, expect, it } from 'vitest';
import { woodenShortsword } from '../data/items/weapons';
import { cottonRobe } from '../data/items/armor';
import { Loadout } from './loadout';
import { WeaponSlot, ArmorSlot } from './slots';

describe('Loadout', () => {
  it('saves and loads equipped items', () => {
    const source = new Loadout();
    source.equipWeapon(woodenShortsword);
    source.equipArmor(cottonRobe);

    const target = new Loadout();
    target.load(source.save());

    expect(target.getWeapon(WeaponSlot.PRIMARY)).toBe(woodenShortsword);
    expect(target.getArmor(ArmorSlot.SUIT)).toBe(cottonRobe);
  });
});
