import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { SkillDef } from './skillDef';
import { TargetType } from './targetType';
import { SectorTarget } from './effects/sectorTarget';
import { Damage } from './effects/damage';
import { SkillSlots } from './skillSlots';
import { SkillSlot } from './skillSlot';

const def = new SkillDef(
  't',
  new SectorTarget(TargetType.ENEMY, 90, 16, 1, [new Damage(10)]),
);

describe('SkillSlots', () => {
  it('returns null for empty slots', () => {
    expect(new SkillSlots().get(SkillSlot.ALPHA)).toBeNull();
  });

  it('gets, sets, and clears a skill', () => {
    const world = new World();
    const e = world.createEntity([
      new Position(0, 0),
      new SkillSlots({ [SkillSlot.ALPHA]: def }),
    ]);
    const slots = e.getComponent(SkillSlots)!;
    expect(slots.get(SkillSlot.ALPHA)).toBe(def);
    slots.set(SkillSlot.BETA, def);
    expect(slots.get(SkillSlot.BETA)).toBe(def);
    slots.set(SkillSlot.BETA, null);
    expect(slots.get(SkillSlot.BETA)).toBeNull();
  });
});
