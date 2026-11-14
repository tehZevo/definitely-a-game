import { SKILL_SLOT_KEYS, SkillSlot } from '../skills/skillSlot';

export type MovementDirection = 'up' | 'down' | 'left' | 'right';

export interface KeyMap {
  movement: Record<MovementDirection, string[]>;
  attack: string[];
  skillSlots: Record<SkillSlot, string>;
  confirm: string;
  cancel: string;
  stats: string;
}

export const DEFAULT_KEY_MAP: KeyMap = {
  movement: {
    up: ['ArrowUp', 'KeyW'],
    down: ['ArrowDown', 'KeyS'],
    left: ['ArrowLeft', 'KeyA'],
    right: ['ArrowRight', 'KeyD'],
  },
  attack: ['Space', 'KeyZ'],
  skillSlots: SKILL_SLOT_KEYS,
  confirm: 'Enter',
  cancel: 'Escape',
  stats: 'Enter',
};
