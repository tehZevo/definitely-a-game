export enum DamageNumberType {
  NORMAL,
  HEAL,
  CRIT,
  MANA,
  MANA_RESTORE,
}

export function damageNumberColor(t: DamageNumberType): number {
  switch (t) {
    case DamageNumberType.NORMAL:
      return 0xfff7ce;
    case DamageNumberType.HEAL:
      return 0xc0ffdb;
    case DamageNumberType.CRIT:
      return 0xff9494;
    case DamageNumberType.MANA:
      return 0x8fb8ff;
    case DamageNumberType.MANA_RESTORE:
      return 0xbfd9ff;
  }
}

export function damageNumberIcon(t: DamageNumberType): string | null {
  switch (t) {
    case DamageNumberType.NORMAL:
      return null;
    case DamageNumberType.HEAL:
    case DamageNumberType.MANA_RESTORE:
      return '+';
    case DamageNumberType.CRIT:
      return '!';
    case DamageNumberType.MANA:
      return '-';
  }
}
