export type TileType = 'floor' | 'floor_accent' | 'wall' | 'wall_accent';

export function isFloor(type: TileType): boolean {
  return type === 'floor' || type === 'floor_accent';
}

export function isWall(type: TileType): boolean {
  return type === 'wall' || type === 'wall_accent';
}

export class Tile {
  constructor(public imagePath: string, public solid = false) {}

  static floor(imagePath = ''): Tile {
    return new Tile(imagePath, false);
  }

  static wall(imagePath = ''): Tile {
    return new Tile(imagePath, true);
  }
}
