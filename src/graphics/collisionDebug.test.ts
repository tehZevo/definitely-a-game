import { describe, it, expect } from 'vitest';
import { Container } from 'pixi.js';
import { drawCollisionDebug } from './collisionDebug';
import { TilePhysics } from '../tiles/tilePhysics';
import { Tileset } from '../tiles/tileset';
import { Tile } from '../tiles/tile';
import { CHUNK_SIZE } from '../constants';

describe('drawCollisionDebug', () => {
  it('draws collision rects into a container', () => {
    const tiles: Tile[][] = [];
    for (let y = 0; y < CHUNK_SIZE; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < CHUNK_SIZE; x++) {
        row.push(new Tile('assets/tiles/floor.png', x === 1 && y === 1));
      }
      tiles.push(row);
    }
    const physics = new TilePhysics(new Map([['0,0', new Tileset(CHUNK_SIZE, CHUNK_SIZE, tiles)]]));
    const parent = new Container();

    const debug = drawCollisionDebug(physics, parent);

    expect(parent.children).toContain(debug);
    expect(debug.children.length).toBe(1);
  });
});
