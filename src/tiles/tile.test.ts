import { describe, it, expect } from 'vitest';
import { Tile, isFloor, isWall } from './tile';

describe('tile', () => {
  it('floors are not solid and walls are', () => {
    expect(Tile.floor('assets/tiles/grass.png').solid).toBe(false);
    expect(Tile.wall('assets/tiles/grass_wall.png').solid).toBe(true);
  });

  it('classifies tile types', () => {
    expect(isFloor('floor')).toBe(true);
    expect(isFloor('floor_accent')).toBe(true);
    expect(isFloor('wall')).toBe(false);
    expect(isWall('wall')).toBe(true);
    expect(isWall('wall_accent')).toBe(true);
    expect(isWall('floor')).toBe(false);
  });

  it('keeps the explicit constructor signature', () => {
    const t = new Tile('assets/tiles/stone.png', true);
    expect(t.imagePath).toBe('assets/tiles/stone.png');
    expect(t.solid).toBe(true);
  });
});
