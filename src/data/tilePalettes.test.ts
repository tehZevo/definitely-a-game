import { describe, it, expect } from 'vitest';
import { TilePalette, grassFloors, grassWalls, stoneWalls } from './tilePalettes';

describe('TilePalette', () => {
  it('maps floor types to biome images', () => {
    expect(grassFloors.floors).toEqual(['assets/tiles/grass.png', 'assets/tiles/dirt.png']);
  });

  it('combines floors and walls like Python __add__', () => {
    const plains = grassWalls.add(grassFloors);
    expect(plains.floors).toEqual(grassFloors.floors);
    expect(plains.walls).toEqual(grassWalls.walls);
  });

  it('lets the left side win when both sides define the same kind', () => {
    const combined = grassFloors.add(stoneWalls);
    expect(combined.floors).toEqual(grassFloors.floors);
    expect(combined.walls).toEqual(stoneWalls.walls);
  });

  it('constructs directly', () => {
    const pal = new TilePalette(['a', 'b'], ['c', 'd']);
    expect(pal.floors[1]).toBe('b');
  });
});
