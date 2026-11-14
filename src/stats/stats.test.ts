import { describe, it, expect } from 'vitest';
import { PrimaryStat, PrimaryStats } from './primaryStats';
import { EquipStat, EquipStats } from './equipStats';
import { SecondaryStats } from './secondaryStats';
import { Stats } from './stats';
import {
  weaponPhysicalStatAssignment,
  weaponMagicalStatAssignment,
  calculateSecondaryFromPrimaryAndEquip,
  calculateStats,
} from './calculator';
import { WeaponType } from '../items/slots';

describe('PrimaryStats', () => {
  it('defaults to zeros', () => {
    const s = new PrimaryStats();
    expect(s.STR).toBe(0);
    expect(s.VIT).toBe(0);
    expect(s.DEX).toBe(0);
    expect(s.AGI).toBe(0);
    expect(s.INT).toBe(0);
    expect(s.WIS).toBe(0);
  });

  it('adds two PrimaryStats', () => {
    const a = new PrimaryStats(1, 2, 3, 4, 5, 6);
    const b = new PrimaryStats(10, 20, 30, 40, 50, 60);
    const c = a.add(b);
    expect(c.STR).toBe(11);
    expect(c.VIT).toBe(22);
    expect(c.DEX).toBe(33);
    expect(c.AGI).toBe(44);
    expect(c.INT).toBe(55);
    expect(c.WIS).toBe(66);
  });

  it('multiplies by scalar', () => {
    const a = new PrimaryStats(1, 2, 3, 4, 5, 6);
    const b = a.multiply(3);
    expect(b.STR).toBe(3);
    expect(b.WIS).toBe(18);
  });

  it('multiplies by PrimaryStats', () => {
    const a = new PrimaryStats(2, 3, 4, 5, 6, 7);
    const b = new PrimaryStats(10, 10, 10, 10, 10, 10);
    const c = a.multiply(b);
    expect(c.STR).toBe(20);
    expect(c.WIS).toBe(70);
  });

  it('gets stat by enum', () => {
    const s = new PrimaryStats(1, 2, 3, 4, 5, 6);
    expect(s.get(PrimaryStat.STR)).toBe(1);
    expect(s.get(PrimaryStat.VIT)).toBe(2);
    expect(s.get(PrimaryStat.DEX)).toBe(3);
    expect(s.get(PrimaryStat.AGI)).toBe(4);
    expect(s.get(PrimaryStat.INT)).toBe(5);
    expect(s.get(PrimaryStat.WIS)).toBe(6);
  });

  it('Base() returns 10s', () => {
    const s = PrimaryStats.Base();
    expect(s.STR).toBe(10);
    expect(s.WIS).toBe(10);
  });
});

describe('EquipStats', () => {
  it('defaults to zeros', () => {
    const s = new EquipStats();
    expect(s.PATT).toBe(0);
    expect(s.MATT).toBe(0);
    expect(s.PDEF).toBe(0);
    expect(s.MDEF).toBe(0);
  });

  it('adds two EquipStats', () => {
    const a = new EquipStats(1, 2, 3, 4);
    const b = new EquipStats(10, 20, 30, 40);
    const c = a.add(b);
    expect(c.PATT).toBe(11);
    expect(c.MATT).toBe(22);
    expect(c.PDEF).toBe(33);
    expect(c.MDEF).toBe(44);
  });

  it('multiplies by scalar', () => {
    const a = new EquipStats(1, 2, 3, 4);
    const b = a.multiply(3);
    expect(b.PATT).toBe(3);
    expect(b.MDEF).toBe(12);
  });

  it('One() returns 1s', () => {
    const s = EquipStats.One();
    expect(s.PATT).toBe(1);
    expect(s.MATT).toBe(1);
    expect(s.PDEF).toBe(1);
    expect(s.MDEF).toBe(1);
  });

  it('gets stat by enum', () => {
    const s = new EquipStats(1, 2, 3, 4);
    expect(s.get(EquipStat.PATT)).toBe(1);
    expect(s.get(EquipStat.MATT)).toBe(2);
    expect(s.get(EquipStat.PDEF)).toBe(3);
    expect(s.get(EquipStat.MDEF)).toBe(4);
  });
});

describe('SecondaryStats', () => {
  it('adds two SecondaryStats', () => {
    const a = new SecondaryStats(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    const b = new SecondaryStats(10, 20, 30, 40, 50, 60, 70, 80, 90, 100);
    const c = a.add(b);
    expect(c.hp).toBe(11);
    expect(c.mp).toBe(22);
    expect(c.critical).toBe(110);
  });

  it('Base() has moveSpeed 100', () => {
    const s = SecondaryStats.Base();
    expect(s.moveSpeed).toBe(100);
    expect(s.hp).toBe(0);
  });
});

describe('Stats', () => {
  it('adds two Stats', () => {
    const a = new Stats(new EquipStats(1, 0, 0, 0), new PrimaryStats(1, 0, 0, 0, 0, 0));
    const b = new Stats(new EquipStats(0, 1, 0, 0), new PrimaryStats(0, 1, 0, 0, 0, 0));
    const c = a.add(b);
    expect(c.equip.PATT).toBe(1);
    expect(c.equip.MATT).toBe(1);
    expect(c.primary.STR).toBe(1);
    expect(c.primary.VIT).toBe(1);
  });

  it('One has equip 1s and primary 1s', () => {
    const s = Stats.One;
    expect(s.equip.PATT).toBe(1);
    expect(s.primary.STR).toBe(1);
  });

  it('convenience constructors', () => {
    const e = Stats.Equip(10, 20, 30, 40);
    expect(e.equip.PATT).toBe(10);
    expect(e.primary.STR).toBe(0);

    const p = Stats.Primary(1, 2, 3, 4, 5, 6);
    expect(p.primary.STR).toBe(1);
    expect(p.equip.PATT).toBe(0);
  });
});

describe('weaponPhysicalStatAssignment', () => {
  it('returns STR,DEX for shortsword', () => {
    const [pri, sec] = weaponPhysicalStatAssignment(WeaponType.SHORTSWORD);
    expect(pri).toBe(PrimaryStat.STR);
    expect(sec).toBe(PrimaryStat.DEX);
  });

  it('returns STR,VIT for polearm', () => {
    const [pri, sec] = weaponPhysicalStatAssignment(WeaponType.POLEARM);
    expect(pri).toBe(PrimaryStat.STR);
    expect(sec).toBe(PrimaryStat.VIT);
  });

  it('returns DEX,STR for dagger', () => {
    const [pri, sec] = weaponPhysicalStatAssignment(WeaponType.DAGGER);
    expect(pri).toBe(PrimaryStat.DEX);
    expect(sec).toBe(PrimaryStat.STR);
  });

  it('returns INT,WIS for staff', () => {
    const [pri, sec] = weaponMagicalStatAssignment(WeaponType.STAFF);
    expect(pri).toBe(PrimaryStat.INT);
    expect(sec).toBe(PrimaryStat.WIS);
  });
});

describe('calculateSecondaryFromPrimaryAndEquip', () => {
  it('computes hp from VIT squared', () => {
    const primary = new PrimaryStats(10, 10, 10, 10, 10, 10);
    const equip = EquipStats.One();
    const sec = calculateSecondaryFromPrimaryAndEquip(primary, equip, WeaponType.SHORTSWORD);
    expect(sec.hp).toBe(150); // 50 base + 10^2
    expect(sec.mp).toBe(130); // 30 base + 10^2
  });

  it('computes physAtt from PATT * (STR*2 + DEX*1) for shortsword', () => {
    const primary = new PrimaryStats(10, 10, 10, 10, 10, 10);
    const equip = new EquipStats(2, 1, 1, 1);
    const sec = calculateSecondaryFromPrimaryAndEquip(primary, equip, WeaponType.SHORTSWORD);
    expect(sec.physAtt).toBe(2 * (10 * 2 + 10 * 1)); // PATT * (STR*2 + DEX*1) = 2*30 = 60
  });

  it('computes physDef from PDEF * VIT * 2', () => {
    const primary = new PrimaryStats(10, 10, 10, 10, 10, 10);
    const equip = new EquipStats(1, 1, 2, 1);
    const sec = calculateSecondaryFromPrimaryAndEquip(primary, equip, WeaponType.SHORTSWORD);
    expect(sec.physDef).toBe(2 * 10 * 2); // PDEF * VIT * 2 = 40
  });

  it('computes accuracy from DEX * 20', () => {
    const primary = new PrimaryStats(10, 10, 10, 10, 10, 10);
    const equip = EquipStats.One();
    const sec = calculateSecondaryFromPrimaryAndEquip(primary, equip, WeaponType.SHORTSWORD);
    expect(sec.accuracy).toBe(200); // 10 * 20
    expect(sec.evasion).toBe(200); // 10 * 20
    expect(sec.critical).toBe(10); // 10 * 1
  });
});

describe('calculateStats', () => {
  it('computes full stats pipeline with base values', () => {
    const basePrimary = PrimaryStats.Base();
    const baseEquip = EquipStats.One();
    const flat = new Stats();
    const scaling = Stats.One;
    const result = calculateStats(basePrimary, baseEquip, new PrimaryStats(), new EquipStats(), flat, scaling, WeaponType.SHORTSWORD);
    expect(result.primary.STR).toBe(10);
    expect(result.equip.PATT).toBe(1);
    expect(result.secondary.hp).toBe(150); // 50 base + 10^2
    expect(result.secondary.physAtt).toBe(30); // 1 * (10*2 + 10*1)
  });

  it('applies flat modifiers', () => {
    const basePrimary = PrimaryStats.Base();
    const baseEquip = EquipStats.One();
    const flat = Stats.Primary(5, 0, 0, 0, 0, 0);
    const scaling = Stats.One;
    const result = calculateStats(basePrimary, baseEquip, new PrimaryStats(), new EquipStats(), flat, scaling, WeaponType.SHORTSWORD);
    expect(result.primary.STR).toBe(15);
    expect(result.secondary.hp).toBe(150);
  });

  it('applies scaling modifiers', () => {
    const basePrimary = PrimaryStats.Base();
    const baseEquip = EquipStats.One();
    const flat = new Stats();
    const scaling = Stats.One.add(Stats.Primary(1, 0, 0, 0, 0, 0));
    const result = calculateStats(basePrimary, baseEquip, new PrimaryStats(), new EquipStats(), flat, scaling, WeaponType.SHORTSWORD);
    expect(result.primary.STR).toBe(20);
    expect(result.secondary.hp).toBe(150);
  });

  it('applies equip archetype bonuses', () => {
    const basePrimary = PrimaryStats.Base();
    const baseEquip = EquipStats.One();
    const archetypePrimary = new PrimaryStats(4, 2, 0, 0, 0, 0);
    const archetypeEquip = new EquipStats(1, 0, 0, 0);
    const flat = new Stats();
    const scaling = Stats.One;
    const result = calculateStats(basePrimary, baseEquip, archetypePrimary, archetypeEquip, flat, scaling, WeaponType.SHORTSWORD);
    expect(result.primary.STR).toBe(14);
    expect(result.primary.VIT).toBe(12);
    expect(result.equip.PATT).toBe(2);
    expect(result.secondary.hp).toBe(194); // 50 base + 12^2
    expect(result.secondary.physAtt).toBe(2 * (14 * 2 + 10 * 1)); // PATT * (STR*2 + DEX*1)
  });
});
