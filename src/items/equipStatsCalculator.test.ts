import { describe, expect, it } from 'vitest';
import { woodenShortsword } from '../data/items/weapons';
import { cottonRobe } from '../data/items/armor';
import { calculateStatsFromEquips, gradeMultiplier, partMultiplierForEquip, scaledEquipStats } from './equipStatsCalculator';
import { Equips } from './equips';
import { EquipGrade } from './equipGrade';

describe('equip stats calculator', () => {
  it('uses Python part multipliers', () => {
    expect(partMultiplierForEquip(woodenShortsword)).toBe(0.2);
    expect(partMultiplierForEquip(cottonRobe)).toBe(0.4);
  });

  it('uses Python grade multipliers', () => {
    expect(gradeMultiplier(EquipGrade.E)).toBe(10);
    expect(gradeMultiplier(EquipGrade.D)).toBe(20);
    expect(gradeMultiplier(EquipGrade.C)).toBe(30);
    expect(gradeMultiplier(EquipGrade.B)).toBe(40);
    expect(gradeMultiplier(EquipGrade.A)).toBe(60);
    expect(gradeMultiplier(EquipGrade.S)).toBe(80);
    expect(gradeMultiplier(EquipGrade.SS)).toBe(100);
  });

  it('scales equip stats by part and grade', () => {
    expect(scaledEquipStats(woodenShortsword)).toEqual({
      hp: 0,
      mp: 0,
      physAtt: 10,
      physDef: 0,
      magAtt: 0,
      magDef: 0,
    });
  });

  it('calculates stats from base stats and equips', () => {
    const equips = new Equips();
    equips.equipWeapon(woodenShortsword);
    equips.equipArmor(cottonRobe);

    const stats = calculateStatsFromEquips(
      {
        hp: 75,
        maxHp: 100,
        mp: 25,
        maxMp: 50,
        physAtt: 100,
        physDef: 0,
        critical: 0,
        magAtt: 100,
        magDef: 0,
      },
      equips,
    );

    expect(stats).toEqual({
      hp: 75,
      maxHp: 140,
      mp: 25,
      maxMp: 50,
      physAtt: 110,
      physDef: 8,
      critical: 0,
      magAtt: 100,
      magDef: 0,
    });
  });
});
