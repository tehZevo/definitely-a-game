import { describe, expect, it } from 'vitest';
import { DEFAULT_KEY_MAP } from './keyMap';
import { SKILL_SLOT_KEYS, SkillSlot } from '../skills/skillSlot';

describe('key map', () => {
  it('maps movement to arrows and WASD', () => {
    expect(DEFAULT_KEY_MAP.movement.up).toEqual(['ArrowUp', 'KeyW']);
    expect(DEFAULT_KEY_MAP.movement.down).toEqual(['ArrowDown', 'KeyS']);
    expect(DEFAULT_KEY_MAP.movement.left).toEqual(['ArrowLeft', 'KeyA']);
    expect(DEFAULT_KEY_MAP.movement.right).toEqual(['ArrowRight', 'KeyD']);
  });

  it('maps skill slots to Python key bindings', () => {
    expect(DEFAULT_KEY_MAP.skillSlots).toBe(SKILL_SLOT_KEYS);
    expect(SKILL_SLOT_KEYS[SkillSlot.ALPHA]).toBe('KeyA');
    expect(SKILL_SLOT_KEYS[SkillSlot.OMEGA]).toBe('KeyQ');
  });
});
