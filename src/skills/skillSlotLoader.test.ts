import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { SkillSlotLoader } from './skillSlotLoader';
import { SkillSlots } from './skillSlots';
import { SkillSlot } from './skillSlot';
import { Loadout } from '../items/loadout';
import { SkillItem } from '../items/skillItem';
import { SkillDef } from './skillDef';
import { defaultAttack } from '../data/skills/defaultAttack';
import { SkillRank } from './skillRank';
import { Damage } from './effects/damage';
import { SectorTarget } from './effects/sectorTarget';
import { TargetType } from './targetType';

const slash = new SkillDef(
  'slash',
  new SectorTarget(TargetType.ENEMY, 180, 32, 1, [new Damage(50, 2)]),
  true,
  SkillRank.I,
  null,
  10,
  0,
  0.5,
  SkillSlot.BETA,
  'assets/skills/slash.png',
);

function playerWithSlots() {
  const world = new World();
  return world.createEntity([new SkillSlotLoader(), new SkillSlots(), new Loadout()]);
}

describe('SkillSlotLoader', () => {
  it('copies an equipped skill item into its skill slot', () => {
    const player = playerWithSlots();
    const loadout = player.getComponent(Loadout)!;
    const slots = player.getComponent(SkillSlots)!;

    loadout.equipSkill(new SkillItem({ skilldef: slash }));

    expect(slots.get(SkillSlot.BETA)).toBe(slash);
  });

  it('replaces the skill already in that slot', () => {
    const player = playerWithSlots();
    const loadout = player.getComponent(Loadout)!;
    const slots = player.getComponent(SkillSlots)!;
    slots.set(SkillSlot.BETA, defaultAttack);

    loadout.equipSkill(new SkillItem({ skilldef: slash }));

    expect(slots.get(SkillSlot.BETA)).toBe(slash);
  });

  it('leaves slots without an equipped skill item alone', () => {
    const player = playerWithSlots();
    const loadout = player.getComponent(Loadout)!;
    const slots = player.getComponent(SkillSlots)!;
    slots.set(SkillSlot.ALPHA, defaultAttack);

    loadout.equipSkill(new SkillItem({ skilldef: slash }));

    expect(slots.get(SkillSlot.BETA)).toBe(slash);
    expect(slots.get(SkillSlot.ALPHA)).toBeNull();
  });
});

describe('SkillSlotLoader clearing', () => {
  it('clears a skill slot when its skill item is unequipped', () => {
    const world = new World();
    const player = world.createEntity([new SkillSlotLoader(), new SkillSlots(), new Loadout()]);
    const loadout = player.getComponent(Loadout)!;
    const slots = player.getComponent(SkillSlots)!;

    loadout.equipSkill(new SkillItem({ skilldef: slash }));
    expect(slots.get(SkillSlot.BETA)).toBe(slash);

    loadout.equipSkill(new SkillItem({ skilldef: defaultAttack, slot: SkillSlot.BETA }));
    expect(slots.get(SkillSlot.BETA)).toBe(defaultAttack);
  });

  it('clears slots with no equipped skill item', () => {
    const world = new World();
    const player = world.createEntity([new SkillSlotLoader(), new SkillSlots(), new Loadout()]);
    const loadout = player.getComponent(Loadout)!;
    const slots = player.getComponent(SkillSlots)!;
    slots.set(SkillSlot.GAMMA, defaultAttack);

    loadout.equipSkill(new SkillItem({ skilldef: slash }));

    expect(slots.get(SkillSlot.BETA)).toBe(slash);
    expect(slots.get(SkillSlot.GAMMA)).toBeNull();
  });
});
