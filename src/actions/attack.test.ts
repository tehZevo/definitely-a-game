import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Attack } from './attack';
import { UseSkill } from './useSkill';
import { Actor } from '../actor/actor';
import { Loadout } from '../items/loadout';
import { woodenShortsword } from '../data/items/weapons';
import { staffOfHealing } from '../data/items/staffs';
import { defaultAttack } from '../data/skills/defaultAttack';
import { WeaponSlot } from '../items/slots';

function attackSkillOf(entity: ReturnType<World['createEntity']>) {
  entity.getComponent(Actor)!.act(new Attack());
  const action = entity.getComponent(Actor)!.nextAction as UseSkill | null;
  return action?.skilldef;
}

describe('attack action', () => {
  it('uses the default attack with no weapon equipped', () => {
    const world = new World();
    const entity = world.createEntity([new Actor(), new Loadout()]);
    expect(attackSkillOf(entity)).toBe(defaultAttack);
  });

  it('uses the equipped primary weapon attack skill', () => {
    const world = new World();
    const entity = world.createEntity([new Actor(), new Loadout()]);
    entity.getComponent(Loadout)!.equipWeapon(staffOfHealing);
    expect(attackSkillOf(entity)).toBe(staffOfHealing.attackSkill);
  });

  it('falls back to the default attack for weapons without a skill', () => {
    const world = new World();
    const entity = world.createEntity([new Actor(), new Loadout()]);
    const loadout = entity.getComponent(Loadout)!;
    loadout.equipWeapon(woodenShortsword);
    expect(woodenShortsword.slot).toBe(WeaponSlot.PRIMARY);
    expect(attackSkillOf(entity)).toBe(defaultAttack);
  });
});
