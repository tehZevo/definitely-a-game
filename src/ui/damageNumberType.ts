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
