import { FloorGenerator } from './floorGenerator';
import type { MapDef, DungeonResult } from './dfsGenerator';
import { roomsToTiles } from './dfsGenerator';
import { TileType } from '../tiles/tile';
import { Position } from '../physics/position';
import { Chest } from '../tiles/chest';
import type { ItemDef } from '../items/itemDef';
import {
  woodenShortsword,
  woodenLongsword,
  woodenShield,
  copperShortsword,
} from '../data/items/weapons';
import {
  cottonHat,
  cottonRobe,
  cottonGloves,
  cottonShoes,
  linenHat,
  linenRobe,
} from '../data/items/armor';

const DEV_CHESTS: ItemDef[][] = [
  [woodenShortsword, woodenLongsword, woodenShield],
  [copperShortsword],
  [cottonHat, cottonRobe, cottonGloves, cottonShoes],
  [linenHat, linenRobe],
];

export class DevMapGenerator extends FloorGenerator {
  generate(_mapdef: MapDef): DungeonResult {
    const rooms = [{ x: 0, y: 0, north: false, south: false, east: false, west: false }];
    const tiles = roomsToTiles(rooms, 16, 0, 0);
    const result: DungeonResult = { rooms, tiles: new Map<string, TileType>() };
    for (const [key, tile] of tiles) {
      result.tiles.set(key, tile);
    }
    return result;
  }

  generateChests(): Array<{ pos: Position; items: ItemDef[] }> {
    return DEV_CHESTS.map((items, i) => ({
      pos: new Position(4 + i * 2, 4),
      items,
    }));
  }

  createChests(world: import('../ecs').World): void {
    for (const { pos, items } of this.generateChests()) {
      world.createEntity([pos, new Chest(items)]);
    }
  }
}
