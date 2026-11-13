export type TileType = 'floor' | 'floor_accent' | 'wall' | 'wall_accent';

export class Tile {
  constructor(public imagePath: string, public solid = false) {}
}
