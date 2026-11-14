export enum EquipGrade {
  UNKNOWN,
  E,
  D,
  C,
  B,
  A,
  S,
  SS,
}

export function equipGradeIcon(grade: EquipGrade): string | null {
  switch (grade) {
    case EquipGrade.UNKNOWN:
      return null;
    case EquipGrade.E:
      return 'assets/icons/e.png';
    case EquipGrade.D:
      return 'assets/icons/d.png';
    case EquipGrade.C:
      return 'assets/icons/c.png';
    case EquipGrade.B:
      return 'assets/icons/b.png';
    case EquipGrade.A:
      return 'assets/icons/a.png';
    case EquipGrade.S:
      return 'assets/icons/s.png';
    case EquipGrade.SS:
      return 'assets/icons/ss.png';
  }
}

export function equipGradeColor(grade: EquipGrade): number {
  switch (grade) {
    case EquipGrade.UNKNOWN:
      return 0x808080;
    case EquipGrade.E:
      return 0xb0b0b0;
    case EquipGrade.D:
      return 0x78c878;
    case EquipGrade.C:
      return 0x50a0ff;
    case EquipGrade.B:
      return 0xc878ff;
    case EquipGrade.A:
      return 0xffa040;
    case EquipGrade.S:
      return 0xff5050;
    case EquipGrade.SS:
      return 0xffd700;
  }
}
