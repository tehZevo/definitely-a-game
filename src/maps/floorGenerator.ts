import type { World } from '../ecs';
import type { MapDef, DungeonResult } from './dfsGenerator';
import { generateDungeon } from './dfsGenerator';

export abstract class FloorGenerator {
  abstract generate(mapdef: MapDef): DungeonResult;

  populateWorld(world: World, mapdef: MapDef): void {
    const result = this.generate(mapdef);
    void world;
    for (const [, tileType] of result.tiles) {
      void tileType;
    }
  }
}

export class DFSFloorGenerator extends FloorGenerator {
  generate(mapdef: MapDef): DungeonResult {
    void mapdef;
    return generateDungeon();
  }
}
