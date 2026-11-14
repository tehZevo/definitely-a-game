import { describe, expect, it } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Skill } from '../skill';
import { SkillEffect } from './skillEffect';
import { Sequence } from './sequence';

class MarkerEffect extends SkillEffect {}

describe('Sequence', () => {
  it('spawns child skills one at a time after each delay', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const effect = new Sequence([new MarkerEffect(), new MarkerEffect()], 0.5);
    const skill = new Skill(effect, user);
    const entity = world.createEntity([new Position(0, 0), skill]);

    expect(world.find(Skill).length).toBe(1);

    world.update(0);
    expect(world.find(Skill).length).toBe(2);
    expect(entity.alive).toBe(true);

    world.update(0.5);
    expect(world.find(Skill).length).toBe(1);
    expect(entity.alive).toBe(false);
  });

  it('completes immediately when empty', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const skill = new Skill(new Sequence([]), user);
    const entity = world.createEntity([new Position(0, 0), skill]);

    world.update(0);
    expect(entity.alive).toBe(false);
    expect(world.find(Skill).length).toBe(0);
  });
});
