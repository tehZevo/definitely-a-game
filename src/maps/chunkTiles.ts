import { Tileset } from '../tiles/tileset';
import { Tile, type TileType } from '../tiles/tile';
import { CHUNK_SIZE } from '../constants';

const TILE_IMAGES: Record<TileType, string> = {
  floor: 'assets/tiles/grass_floor.png',
  floor_accent: 'assets/tiles/grass_floor_accent.png',
  wall: 'assets/tiles/grass_wall.png',
  wall_accent: 'assets/tiles/grass_wall_accent.png',
};

export function chunkTiles(tiles: Map<string, TileType>): Map<string, Tileset> {
  const chunks = new Map<string, Tileset>();
  for (const [key, tileType] of tiles) {
    const [tx, ty] = key.split(',').map(Number);
    const cx = Math.floor(tx / CHUNK_SIZE);
    const cy = Math.floor(ty / CHUNK_SIZE);
    const chunkKey = `${cx},${cy}`;
    if (!chunks.has(chunkKey)) {
      const grid: Tile[][] = Array.from({ length: CHUNK_SIZE }, () =>
        Array.from({ length: CHUNK_SIZE }, () => new Tile('', false)),
      );
      chunks.set(chunkKey, new Tileset(CHUNK_SIZE, CHUNK_SIZE, grid));
    }
    const chunk = chunks.get(chunkKey)!;
    const localX = tx - cx * CHUNK_SIZE;
    const localY = ty - cy * CHUNK_SIZE;
    chunk.tiles[localY][localX] = new Tile(TILE_IMAGES[tileType], tileType.startsWith('wall'));
  }
  return chunks;
}
