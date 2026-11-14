import { describe, expect, it } from 'vitest';
import { DamageNumberType, damageNumberColor, damageNumberIcon } from './damageNumberType';

describe('damageNumberType', () => {
  it('has colors for every damage number type', () => {
    for (const type of Object.values(DamageNumberType).filter((v): v is number => typeof v === 'number')) {
      expect(typeof damageNumberColor(type)).toBe('number');
    }
  });

  it('uses a minus icon for mana drain', () => {
    expect(damageNumberIcon(DamageNumberType.MANA)).toBe('-');
  });

  it('uses a plus icon for mana restore', () => {
    expect(damageNumberIcon(DamageNumberType.MANA_RESTORE)).toBe('+');
  });
});
