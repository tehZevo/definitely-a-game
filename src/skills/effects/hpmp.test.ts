import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Skill } from '../skill';
import { ConsumeHP, StealHP, UserHPScaling } from './hpmp';
import { Damage } from './damage';

function makeWorld() {
  const world = new World();
  const user = world.createEntity([
    new Position(10, 10),
    new Stats(80, 100, 50, 50, 200, 10, 0),
    new Actor(),
  ]);
  const target = world.createEntity([
    new Position(20, 20),
    new Stats(60, 100, 0, 0, 100, 5, 0),
    new Actor(),
  ]);
  return { world, user, target };
}

describe('ConsumeHP', () => {
  it('damages user by percent of current hp', () => {
    const { world, user, target } = makeWorld();
    const skill = new Skill(new ConsumeHP(10), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    world.update(0);
    const stats = user.getComponent(Stats)!;
    expect(stats.hp).toBe(72);
  });

  it('does nothing without stats', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const target = world.createEntity([new Position(1, 1)]);
    const skill = new Skill(new ConsumeHP(10), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    expect(() => world.update(0)).not.toThrow();
  });
});

describe('StealHP', () => {
  it('heals user based on damage formula', () => {
    const { world, user, target } = makeWorld();
    const skill = new Skill(new StealHP(100), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    world.update(0);
    const userStats = user.getComponent(Stats)!;
    expect(userStats.hp).toBe(100);
  });

  it('heals capped at target hp', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(50, 100, 0, 0, 1000, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(1, 1),
      new Stats(5, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const skill = new Skill(new StealHP(100), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    world.update(0);
    expect(user.getComponent(Stats)!.hp).toBe(55);
  });
});

describe('UserHPScaling', () => {
  it('creates child skill entities', () => {
    const { world, user, target } = makeWorld();
    const effect = new UserHPScaling((hp) => [new Damage(hp)]);
    const skill = new Skill(effect, user, undefined, target);
    world.createEntity([new Position(5, 5), skill]);
    const entities = world.find(Skill);
    expect(entities.length).toBeGreaterThanOrEqual(2);
  });

  it('does nothing without user stats', () => {
    const world = new World();
    const user = world.createEntity([new Position(0, 0)]);
    const target = world.createEntity([new Position(1, 1)]);
    const skill = new Skill(new UserHPScaling(), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    expect(() => world.update(0)).not.toThrow();
  });
});
