import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Actor } from '../../actor/actor';
import { Team } from '../../actor/team';
import { Stats } from '../../actor/stats';
import { Skill } from '../../actor/skill';
import { SkillEffect } from './skillEffect';
import { Target, applyTarget } from './target';
import { TargetType } from '../targetType';
import { teamFilter } from '../targetFilters';

class MarkerEffect extends SkillEffect {}

function setupWorld() {
  const world = new World();
  const user = world.createEntity([
    new Position(0, 0),
    new Actor(),
    new Team(0),
    new Stats(100, 100),
  ]);
  const enemy = world.createEntity([
    new Position(10, 0),
    new Actor(),
    new Team(1),
    new Stats(100, 100),
  ]);
  return { world, user, enemy };
}

describe('applyTarget', () => {
  it('creates child skills for filtered actors and propagates multipliers', () => {
    const { world, user, enemy } = setupWorld();
    const parentEffect = new SkillEffect({ multiplier: 2 });
    const parentEntity = world.createEntity([new Position(0, 0), new Skill(parentEffect, user)]);
    const parentSkill = parentEntity.getComponent(Skill)!;
    const childEffect = new MarkerEffect({ multiplier: 3 });

    const targets = applyTarget(parentSkill, [teamFilter(TargetType.ENEMY)], 1, [childEffect]);

    expect(targets).toEqual([enemy]);
    const childEntity = world.find(Skill).find((entity) => entity !== parentEntity);
    expect(childEntity).toBeDefined();
    const childSkill = childEntity!.getComponent(Skill)!;
    expect(childSkill.effect).toBe(childEffect);
    expect(childSkill.target).toBe(enemy);
    expect(childSkill.parent).toBe(parentEntity);
    expect(childSkill.multiplier).toBe(6);
  });

  it('supports null maxTargets to target every filtered actor', () => {
    const { world, user } = setupWorld();
    world.createEntity([
      new Position(20, 0),
      new Actor(),
      new Team(1),
      new Stats(100, 100),
    ]);
    const parentEffect = new SkillEffect();
    const parentEntity = world.createEntity([new Position(0, 0), new Skill(parentEffect, user)]);
    const parentSkill = parentEntity.getComponent(Skill)!;

    const targets = applyTarget(parentSkill, [teamFilter(TargetType.ENEMY)], null, [new MarkerEffect()]);

    expect(targets.length).toBe(2);
    expect(world.find(Skill).length).toBe(3);
  });
});

describe('Target', () => {
  it('starts by applying its configured filters and children', () => {
    const { world, user, enemy } = setupWorld();
    const childEffect = new MarkerEffect({ multiplier: 3 });
    const targetEffect = new Target(teamFilter(TargetType.ENEMY), 1, [childEffect], 2);
    const targetEntity = world.createEntity([new Position(0, 0), new Skill(targetEffect, user)]);

    const childEntity = world.find(Skill).find((entity) => entity !== targetEntity);
    expect(childEntity).toBeDefined();
    const childSkill = childEntity!.getComponent(Skill)!;
    expect(childSkill.effect).toBe(childEffect);
    expect(childSkill.target).toBe(enemy);
    expect(childSkill.multiplier).toBe(6);
    expect(targetEntity.getComponent(Skill)!.success).toBe(true);
  });

  it('marks the skill as failed when no targets are found', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Actor(),
      new Team(0),
      new Stats(100, 100),
    ]);
    const targetEffect = new Target(teamFilter(TargetType.ENEMY), 1, [new MarkerEffect()], 1);
    const targetEntity = world.createEntity([new Position(0, 0), new Skill(targetEffect, user)]);

    expect(targetEntity.getComponent(Skill)!.success).toBe(false);
    expect(world.find(Skill).length).toBe(1);
  });
});
