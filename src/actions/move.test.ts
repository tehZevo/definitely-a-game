import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Physics } from '../physics/physics';
import { Actor } from '../actor/actor';
import { Sprite } from '../graphics/sprite';
import { Vector2 } from '../utils/vector';
import { CHUNK_SIZE, PLAYER_MOVE_SPEED, PLAYER_MOVE_SPEED_SCALE, TILE_SIZE } from '../constants';
import { Tile } from '../tiles/tile';
import { TilePhysics } from '../tiles/tilePhysics';
import { Tileset } from '../tiles/tileset';
import { Move } from './move';

describe('Move', () => {
  it('applies force from the base player move speed', () => {
    const world = new World();
    const physics = new Physics();
    const actor = new Actor();
    world.createEntity([new Position(0, 0), physics, actor]);

    actor.act(new Move(new Vector2(1, 0)));
    actor.currentAction?.update();

    expect(physics.force.x).toBeCloseTo(PLAYER_MOVE_SPEED * PLAYER_MOVE_SPEED_SCALE * TILE_SIZE);
    expect(physics.force.y).toBeCloseTo(0);
  });

  it('uses idle animation when blocked by a wall', () => {
    const world = new World();
    const grid = Array.from({ length: CHUNK_SIZE }, (_, y) =>
      Array.from({ length: CHUNK_SIZE }, (_, x) => new Tile('', x === 1 && y === 0)),
    );
    world.createEntity([new TilePhysics(new Map([['0,0', new Tileset(CHUNK_SIZE, CHUNK_SIZE, grid)]]))]);

    const pos = new Position(TILE_SIZE, 0);
    const physics = new Physics();
    const actor = new Actor();
    const sprite = new Sprite({ idle: ['assets/unknown.png'], walk: ['assets/unknown.png'] }, 'walk');
    world.createEntity([pos, physics, actor, sprite]);

    actor.act(new Move(new Vector2(1, 0)));
    actor.currentAction?.update();

    expect(sprite.current).toBe('idle');
  });
});
