import { MapDef } from '../../maps/dfsGenerator';
import { getMap, registerMap } from '../registry';
import { grassWalls, grassFloors, sandWalls, sandFloors, forestWalls, forestFloors } from '../tilePalettes';

export const forest = new MapDef('forest', 'forest', 'dfs');
export const maze = new MapDef('maze', 'sand', 'dfs');
export const plains = new MapDef('plains', 'grass', 'dfs');
export const devMap = new MapDef('dev', 'grass', 'dev');

export const allMaps: MapDef[] = [plains, forest, maze, devMap];

for (const map of allMaps) {
  registerMap(map.id, map);
}

export function resolveMap(map: MapDef | string): MapDef {
  if (typeof map !== 'string') return map;
  return getMap(map) ?? new MapDef(map, 'grass', 'dfs');
}

export function nextMapFor(map: MapDef | string): MapDef {
  const current = resolveMap(map);
  const index = allMaps.findIndex((candidate) => candidate.id === current.id);
  if (index === -1) return allMaps[0] ?? current;
  return allMaps[(index + 1) % allMaps.length];
}

void grassWalls;
void grassFloors;
void sandWalls;
void sandFloors;
void forestWalls;
void forestFloors;
