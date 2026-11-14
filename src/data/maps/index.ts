import { MapDef } from '../../maps/dfsGenerator';
import { getMap, registerMap } from '../registry';
import { grassWalls, grassFloors, sandFloors, stoneWalls, forestWalls } from '../tilePalettes';

export const forest = new MapDef('forest', forestWalls.add(grassFloors), 'dfs', { roomSize: 8, floorSize: 3, doorWidth: 1 });
export const maze = new MapDef('maze', sandFloors.add(stoneWalls), 'dfs', { roomSize: 6, floorSize: 6, doorWidth: 1 });
export const plains = new MapDef('plains', grassWalls.add(grassFloors), 'dfs', { roomSize: 20, floorSize: 2, doorWidth: 1 });
export const devMap = new MapDef('dev', grassFloors.add(stoneWalls), 'dev');

export const allMaps: MapDef[] = [plains, forest, maze, devMap];

for (const map of allMaps) {
  registerMap(map.id, map);
}

export function resolveMap(map: MapDef | string): MapDef {
  if (typeof map !== 'string') return map;
  return getMap(map) ?? new MapDef(map, grassWalls.add(grassFloors), 'dfs');
}

export function nextMapFor(map: MapDef | string): MapDef {
  const current = resolveMap(map);
  const index = allMaps.findIndex((candidate) => candidate.id === current.id);
  if (index === -1) return allMaps[0] ?? current;
  return allMaps[(index + 1) % allMaps.length];
}

