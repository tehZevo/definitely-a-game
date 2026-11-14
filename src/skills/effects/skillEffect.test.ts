import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Skill } from '../skill';
import { SkillEffect, createChildSkill, spawnEffectChildren } from './skillEffect';

class MarkerEffect extends SkillEffect {}

describe('SkillEffect', () => {
  it('creates a child skill with the product of parent and child multipliers', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const parentEffect = new SkillEffect({ multiplier: 2 });
    const parentEntity = world.createEntity([new Position(1, 2), new Skill(parentEffect, user)]);
    const parentSkill = parentEntity.getComponent(Skill)!;
    const target = world.createEntity([new Position(3, 4)]);
    const childEffect = new MarkerEffect({ multiplier: 3 });

    const childEntity = createChildSkill(world, parentSkill, childEffect, target);
    const childSkill = childEntity.getComponent(Skill)!;
    const childPos = childEntity.getComponent(Position)!;

    expect(childSkill.effect).toBe(childEffect);
    expect(childSkill.user).toBe(user);
    expect(childSkill.parent).toBe(parentEntity);
    expect(childSkill.target).toBe(target);
    expect(childSkill.multiplier).toBe(6);
    expect(childSkill.success).toBe(true);
    expect(childPos.x).toBe(3);
    expect(childPos.y).toBe(4);
  });

  it('spawns all configured children from a parent skill', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const target = world.createEntity([new Position(5, 6)]);
    const children = [new MarkerEffect({ multiplier: 2 }), new MarkerEffect({ multiplier: 3 })];
    const parentEffect = new SkillEffect({ children, multiplier: 4 });
    const parentEntity = world.createEntity([new Position(7, 8), new Skill(parentEffect, user)]);
    const parentSkill = parentEntity.getComponent(Skill)!;

    const created = parentEffect.spawnChildren(parentSkill, target);

    expect(created.length).toBe(2);
    expect(world.find(Skill).length).toBe(3);
    expect(created.map((entity) => entity.getComponent(Skill)!.multiplier)).toEqual([8, 12]);
  });

  it('does not spawn children when the parent skill failed', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const parentEffect = new SkillEffect({ children: [new MarkerEffect()], success: false });
    const parentEntity = world.createEntity([new Position(0, 0), new Skill(parentEffect, user)]);
    const parentSkill = parentEntity.getComponent(Skill)!;

    expect(parentSkill.success).toBe(false);
    expect(parentEffect.spawnChildren(parentSkill)).toEqual([]);
    expect(spawnEffectChildren(parentSkill, [new MarkerEffect()])).toEqual([]);
    expect(world.find(Skill).length).toBe(1);
  });
});
