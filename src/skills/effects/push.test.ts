import { describe, it, expect } from 'vitest';
import { World } from '../../ecs';
import { Position } from '../../physics/position';
import { Physics } from '../../physics/physics';
import { Stats } from '../../actor/stats';
import { Actor } from '../../actor/actor';
import { Skill } from '../skill';
import { Heal } from './heal';
import { Push } from './push';
import { Vector2 } from '../../utils/vector';

describe('Heal', () => {
  it('heals target based on user physAtt', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(50, 100, 0, 0, 200, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(1, 1),
      new Stats(30, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const skill = new Skill(new Heal(100), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    world.update(0);
    const targetStats = target.getComponent(Stats)!;
    expect(targetStats.hp).toBeGreaterThan(30);
  });

  it('does nothing without target actor', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(50, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([new Position(1, 1)]);
    const skill = new Skill(new Heal(100), user, undefined, target);
    world.createEntity([new Position(0, 0), skill]);
    expect(() => world.update(0)).not.toThrow();
  });
});

describe('Push', () => {
  it('applies force to target physics', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(10, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
      new Physics(),
    ]);
    const parentEntity = world.createEntity([new Position(0, 0)]);
    const skill = new Skill(new Push(10), user, parentEntity, target);
    world.createEntity([new Position(0, 0), skill]);
    const physics = target.getComponent(Physics)!;
    expect(physics.force.x).toBeGreaterThan(0);
  });

  it('does nothing without target physics', () => {
    const world = new World();
    const user = world.createEntity([
      new Position(0, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const target = world.createEntity([
      new Position(10, 0),
      new Stats(100, 100, 0, 0, 100, 0, 0),
      new Actor(),
    ]);
    const parentEntity = world.createEntity([new Position(0, 0)]);
    const skill = new Skill(new Push(10), user, parentEntity, target);
    world.createEntity([new Position(0, 0), skill]);
    expect(() => world.update(0)).not.toThrow();
  });
});

describe('Physics', () => {
  it('applies force and updates position', () => {
    const world = new World();
    const entity = world.createEntity([
      new Position(0, 0),
      new Physics(),
    ]);
    const physics = entity.getComponent(Physics)!;
    physics.applyForce(new Vector2(100, 0));
    world.update(1);
    const pos = entity.getComponent(Position)!;
    expect(pos.x).toBeGreaterThan(0);
  });

  it('friction reduces velocity', () => {
    const world = new World();
    const entity = world.createEntity([
      new Position(0, 0),
      new Physics(),
    ]);
    const physics = entity.getComponent(Physics)!;
    physics.applyForce(new Vector2(100, 0));
    world.update(1);
    const v1 = physics.vel.x;
    world.update(1);
    expect(physics.vel.x).toBeLessThan(v1);
  });
});
