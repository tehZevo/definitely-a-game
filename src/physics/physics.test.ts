import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from './position';
import { Physics } from './physics';
import { TilePhysics } from '../tiles/tilePhysics';
import { Tileset } from '../tiles/tileset';
import { Tile } from '../tiles/tile';
import { CHUNK_SIZE, TILE_SIZE } from '../constants';

function worldWithSolidTile(tileX: number, tileY: number): World {
  const tiles: Tile[][] = [];
  for (let y = 0; y < CHUNK_SIZE; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < CHUNK_SIZE; x++) {
      row.push(new Tile('assets/tiles/floor.png', x === tileX && y === tileY));
    }
    tiles.push(row);
  }
  const world = new World();
  world.createEntity([new TilePhysics(new Map([['0,0', new Tileset(CHUNK_SIZE, CHUNK_SIZE, tiles)]]))]);
  return world;
}

describe('Physics', () => {
  it('moves freely when there is no collision', () => {
    const world = worldWithSolidTile(5, 5);
    const entity = world.createEntity([new Position(0, 0), new Physics()]);
    const physics = entity.getComponent(Physics)!;
    physics.vel.x = 16;
    entity.update(1);
    expect(entity.getComponent(Position)!.x).toBe(16);
  });

  it('snaps to the edge of a wall when moving right', () => {
    const world = worldWithSolidTile(1, 0);
    const entity = world.createEntity([new Position(0, 0), new Physics()]);
    const physics = entity.getComponent(Physics)!;
    physics.vel.x = 16;
    entity.update(1);
    expect(entity.getComponent(Position)!.x).toBe((1 - 0.5) * TILE_SIZE);
    expect(physics.vel.x).toBe(0);
  });

  it('snaps to the edge of a wall when moving down', () => {
    const world = worldWithSolidTile(0, 1);
    const entity = world.createEntity([new Position(0, 0), new Physics()]);
    const physics = entity.getComponent(Physics)!;
    physics.vel.y = 16;
    entity.update(1);
    expect(entity.getComponent(Position)!.y).toBe((1 - 0.5) * TILE_SIZE);
    expect(physics.vel.y).toBe(0);
  });
});
