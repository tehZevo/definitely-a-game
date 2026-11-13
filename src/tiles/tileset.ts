import { Tile } from './tile';

export class Tileset {
  constructor(public width: number, public height: number, public tiles: Tile[][]) {}

  tileAt(x: number, y: number): Tile | undefined {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return undefined;
    return this.tiles[y][x];
  }
}
