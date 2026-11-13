import { Tileset } from '../../tiles/tileset';
import { Tile } from '../../tiles/tile';

const GRASS = new Tile('assets/tiles/grass.png');

export function grassFloor(width = 24, height = 16): Tileset {
  const rows: Tile[][] = [];
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) row.push(GRASS);
    rows.push(row);
  }
  return new Tileset(width, height, rows);
}
