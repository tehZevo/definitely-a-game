import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { PlayerController } from '../actor/playerController';
import { FakeInput } from '../core/input';
import { MobAI } from './mobAI';

function withPlayer(world: World, x: number, y: number): void {
  world.createEntity([new Position(x, y), new PlayerController(new FakeInput(0, 0))]);
}

describe('MobAI', () => {
  it('moves toward the player when within aggro range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobPos = new Position(50, 0);
    world.createEntity([mobPos, new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBeLessThan(50);
    expect(mobPos.x).toBeGreaterThan(0);
  });

  it('does not move when the player is out of range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobPos = new Position(500, 0);
    world.createEntity([mobPos, new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBe(500);
  });

  it('does not move when already within stop range', () => {
    const world = new World();
    withPlayer(world, 0, 0);
    const mobPos = new Position(5, 0);
    world.createEntity([mobPos, new MobAI()]);
    world.update(1);
    expect(mobPos.x).toBe(5);
  });
});
