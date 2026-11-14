import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Actor } from '../actor/actor';
import { Stats } from '../actor/stats';
import { PlayerController } from '../actor/playerController';
import { FakeInput } from '../core/input';
import { MobAI } from './mobAI';
import { Vector2 } from '../utils/vector';
import { Skill } from '../actor/skill';
import { SkillSlot } from '../skills/skillSlot';
import { SkillSlots } from '../skills/skillSlots';
import { defaultAttack } from '../data/skills/defaultAttack';
import { MobDef } from './mobdef';
import { Physics } from '../physics/physics';
import { Move } from '../actions/move';
import { ENEMY_MOVE_SPEED } from '../constants';
import { Sprite } from '../graphics/sprite';

function withPlayer(world: World, x: number, y: number): void {
  world.createEntity([new Position(x, y), new PlayerController(new FakeInput(0, 0))]);
}

describe('MobAI', () => {
  it('moves toward the player when within aggro range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobPos = new Position(50, 0);
    const mobActor = new Actor();
    world.createEntity([mobPos, mobActor, new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBeLessThan(50);
    expect(mobPos.x).toBeGreaterThan(0);
    expect(mobActor.lookDir).toEqual(new Vector2(-1, 0));
  });

  it('does not move when the player is out of range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobPos = new Position(500, 0);
    const mobActor = new Actor();
    world.createEntity([mobPos, mobActor, new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBe(500);
    expect(mobActor.lookDir).toEqual(new Vector2(0, -1));
  });

  it('faces the target when already within stop range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobPos = new Position(5, 0);
    const mobActor = new Actor();
    world.createEntity([mobPos, mobActor, new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBe(5);
    expect(mobActor.lookDir).toEqual(new Vector2(-1, 0));
  });

  it('attacks the player when within attack range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobActor = new Actor();
    world.createEntity([
      new Position(10, 0),
      new Stats(10, 10),
      mobActor,
      new MobAI(),
      new SkillSlots({ [SkillSlot.ALPHA]: defaultAttack }),
    ]);

    world.update(1);

    expect(mobActor.currentAction).not.toBeNull();
    expect(world.find(Skill).length).toBe(1);
  });

  it('targets the nearest player in range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    withPlayer(world, 90, 0);
    const mobPos = new Position(50, 0);
    world.createEntity([mobPos, new Actor(), new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBeGreaterThan(50);
    expect(mobPos.x).toBeLessThan(90);
  });

  it('uses a random skill from the mob definition', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobActor = new Actor();
    const def = new MobDef('test', 'test.png', 5, 10, 0, [], [defaultAttack]);
    world.createEntity([new Position(10, 0), new Stats(10, 10), mobActor, new MobAI(def)]);
    world.update(1);
    expect(mobActor.currentAction).not.toBeNull();
  });

  it('flips the sprite toward the target while moving', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const sprite = new Sprite({ default: ['test.png'] });
    world.createEntity([new Position(50, 0), new Actor(), new MobAI(), sprite]);
    world.update(1);
    expect(sprite.flip).toBe('x');
  });
});
describe('MobAI movement', () => {
  it('uses the Move action when the mob has physics', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobActor = new Actor();
    world.createEntity([
      new Position(50, 0),
      new Stats(10, 10),
      new Physics(),
      mobActor,
      new MobAI(),
    ]);
    world.update(1);
    expect(mobActor.currentAction).toBeInstanceOf(Move);
  });

  it('slows mobs via the move speed multiplier', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const stats = new Stats(10, 10);
    world.createEntity([new Position(50, 0), stats, new Physics(), new Actor(), new MobAI()]);
    world.update(0);
    expect(stats.moveSpeedMultiplier).toBe(ENEMY_MOVE_SPEED);
  });
});
