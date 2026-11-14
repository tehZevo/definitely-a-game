import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Physics } from '../physics/physics';
import { Actor } from '../actor/actor';
import { Vector2 } from '../utils/vector';
import { PLAYER_MOVE_SPEED, TILE_SIZE } from '../constants';
import { Move } from './move';

describe('Move', () => {
  it('applies force from the base player move speed', () => {
    const world = new World();
    const physics = new Physics();
    const actor = new Actor();
    world.createEntity([new Position(0, 0), physics, actor]);

    actor.act(new Move(new Vector2(1, 0)));
    actor.currentAction?.update();

    expect(physics.force.x).toBeCloseTo(PLAYER_MOVE_SPEED * TILE_SIZE);
    expect(physics.force.y).toBeCloseTo(0);
  });
});
