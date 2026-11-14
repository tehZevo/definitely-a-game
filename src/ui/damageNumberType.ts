export enum DamageNumberType {
  NORMAL,
  HEAL,
  CRIT,
}

export function damageNumberColor(t: DamageNumberType): number {
  switch (t) {
    case DamageNumberType.NORMAL:
      return 0xfff7ce;
    case DamageNumberType.HEAL:
      return 0xc0ffdb;
    case DamageNumberType.CRIT:
      return 0xff9494;
  }
}

export function damageNumberIcon(t: DamageNumberType): string | null {
  switch (t) {
    case DamageNumberType.NORMAL:
      return null;
    case DamageNumberType.HEAL:
      return '+';
    case DamageNumberType.CRIT:
      return '!';
  }
}
