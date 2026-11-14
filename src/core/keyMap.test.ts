import { describe, expect, it } from 'vitest';
import { DEFAULT_KEY_MAP } from './keyMap';
import { SKILL_SLOT_KEYS, SkillSlot } from '../skills/skillSlot';

describe('key map', () => {
  it('maps movement to the arrow keys', () => {
    expect(DEFAULT_KEY_MAP.movement.up).toEqual(['ArrowUp']);
    expect(DEFAULT_KEY_MAP.movement.down).toEqual(['ArrowDown']);
    expect(DEFAULT_KEY_MAP.movement.left).toEqual(['ArrowLeft']);
    expect(DEFAULT_KEY_MAP.movement.right).toEqual(['ArrowRight']);
  });

  it('maps skill slots to Python key bindings', () => {
    expect(DEFAULT_KEY_MAP.skillSlots).toBe(SKILL_SLOT_KEYS);
    expect(SKILL_SLOT_KEYS[SkillSlot.ALPHA]).toBe('KeyA');
    expect(SKILL_SLOT_KEYS[SkillSlot.OMEGA]).toBe('KeyQ');
  });
});
