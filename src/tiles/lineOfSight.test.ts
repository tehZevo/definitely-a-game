import { describe, it, expect } from 'vitest';
import { Tile } from './tile';
import { Tileset } from './tileset';
import { TilePhysics } from './tilePhysics';
import { hasLineOfSight } from './lineOfSight';
import { CHUNK_SIZE, TILE_SIZE } from '../constants';

function physicsWithSolidTile(tileX: number, tileY: number): TilePhysics {
  const tiles: Tile[][] = [];
  for (let y = 0; y < CHUNK_SIZE; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < CHUNK_SIZE; x++) {
      row.push(new Tile('assets/tiles/floor.png', x === tileX && y === tileY));
    }
    tiles.push(row);
  }
  return new TilePhysics(new Map([['0,0', new Tileset(CHUNK_SIZE, CHUNK_SIZE, tiles)]]));
}

describe('hasLineOfSight', () => {
  it('returns true when the path is clear', () => {
    const physics = physicsWithSolidTile(5, 5);
    expect(hasLineOfSight(physics, 0, 0, 2 * TILE_SIZE, 0)).toBe(true);
  });

  it('returns false when a solid tile blocks the path', () => {
    const physics = physicsWithSolidTile(1, 0);
    expect(hasLineOfSight(physics, 0, 0, 2 * TILE_SIZE, 0)).toBe(false);
  });
});
