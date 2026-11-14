import type { StatsData } from '../actor/stats';
import type { Equip, EquipStats } from './equip';
import { EquipGrade } from './equipGrade';
import type { Equips } from './equips';
import { ArmorSlot } from './slots';
import { Weapon } from './weapon';
import { Armor } from './armor';

function int(value: number): number {
  return Math.floor(value);
}

export function partMultiplierForEquip(equip: Equip): number {
  if (equip instanceof Weapon) return 0.2;
  if (equip instanceof Armor) {
    switch (equip.armorSlot) {
      case ArmorSlot.SUIT:
        return 0.4;
      case ArmorSlot.HAT:
      case ArmorSlot.GLOVES:
      case ArmorSlot.SHOES:
        return 0.1;
      case ArmorSlot.ACCESSORY:
        return 0;
    }
  }
  return 0;
}

export function gradeMultiplier(grade: EquipGrade): number {
  switch (grade) {
    case EquipGrade.E:
      return 10;
    case EquipGrade.D:
      return 20;
    case EquipGrade.C:
      return 30;
    case EquipGrade.B:
      return 40;
    case EquipGrade.A:
      return 60;
    case EquipGrade.S:
      return 80;
    case EquipGrade.SS:
      return 100;
    case EquipGrade.UNKNOWN:
      return 10;
  }
}

export function scaleEquipStats(stats: EquipStats, multiplier: number): Required<EquipStats> {
  return {
    hp: int(stats.hp * multiplier),
    mp: int(stats.mp * multiplier),
    physAtt: int(stats.physAtt * multiplier),
    physDef: int(stats.physDef * multiplier),
    magAtt: int((stats.magAtt ?? 0) * multiplier),
    magDef: int((stats.magDef ?? 0) * multiplier),
  };
}

export function scaledEquipStats(equip: Equip): Required<EquipStats> {
  return scaleEquipStats(equip.stats, partMultiplierForEquip(equip) * gradeMultiplier(equip.grade));
}

export function sumScaledEquipStats(equips: Equips): Required<EquipStats> {
  const total: Required<EquipStats> = { hp: 0, mp: 0, physAtt: 0, physDef: 0, magAtt: 0, magDef: 0 };
  const all: Equip[] = [];

  for (const weapon of Object.values(equips.weapons)) {
    if (weapon) all.push(weapon);
  }
  for (const armor of Object.values(equips.armor)) {
    if (armor) all.push(armor);
  }

  for (const equip of all) {
    const stats = scaledEquipStats(equip);
    total.hp += stats.hp;
    total.mp += stats.mp;
    total.physAtt += stats.physAtt;
    total.physDef += stats.physDef;
    total.magAtt += stats.magAtt;
    total.magDef += stats.magDef;
  }

  return total;
}

export function calculateStatsFromEquips(base: StatsData, equips: Equips): StatsData {
  const equipStats = sumScaledEquipStats(equips);
  const maxHp = base.maxHp + equipStats.hp;
  const maxMp = base.maxMp + equipStats.mp;

  return {
    hp: Math.min(base.hp, maxHp),
    maxHp,
    mp: Math.min(base.mp, maxMp),
    maxMp,
    physAtt: base.physAtt + equipStats.physAtt,
    physDef: base.physDef + equipStats.physDef,
    critical: base.critical,
    magAtt: base.magAtt + equipStats.magAtt,
    magDef: base.magDef + equipStats.magDef,
  };
}
