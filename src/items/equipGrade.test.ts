import { describe, it, expect } from 'vitest';
import { EquipGrade, equipGradeColor, equipGradeIcon } from './equipGrade';

describe('equipGradeIcon', () => {
  it('maps each grade to its icon path', () => {
    expect(equipGradeIcon(EquipGrade.UNKNOWN)).toBeNull();
    expect(equipGradeIcon(EquipGrade.E)).toBe('assets/icons/e.png');
    expect(equipGradeIcon(EquipGrade.D)).toBe('assets/icons/d.png');
    expect(equipGradeIcon(EquipGrade.C)).toBe('assets/icons/c.png');
    expect(equipGradeIcon(EquipGrade.B)).toBe('assets/icons/b.png');
    expect(equipGradeIcon(EquipGrade.A)).toBe('assets/icons/a.png');
    expect(equipGradeIcon(EquipGrade.S)).toBe('assets/icons/s.png');
    expect(equipGradeIcon(EquipGrade.SS)).toBe('assets/icons/ss.png');
  });
});

describe('equipGradeColor', () => {
  it('maps each grade to a color', () => {
    expect(equipGradeColor(EquipGrade.UNKNOWN)).toBe(0x808080);
    expect(equipGradeColor(EquipGrade.E)).toBe(0xb0b0b0);
    expect(equipGradeColor(EquipGrade.D)).toBe(0x78c878);
    expect(equipGradeColor(EquipGrade.C)).toBe(0x50a0ff);
    expect(equipGradeColor(EquipGrade.B)).toBe(0xc878ff);
    expect(equipGradeColor(EquipGrade.A)).toBe(0xffa040);
    expect(equipGradeColor(EquipGrade.S)).toBe(0xff5050);
    expect(equipGradeColor(EquipGrade.SS)).toBe(0xffd700);
  });
});
