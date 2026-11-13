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
