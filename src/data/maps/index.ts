import { MapDef } from '../../maps/dfsGenerator';
import { grassWalls, grassFloors, sandWalls, sandFloors, forestWalls, forestFloors } from '../tilePalettes';

export const forest = new MapDef('forest', 'forest', 'dfs');
export const maze = new MapDef('maze', 'sand', 'dfs');
export const plains = new MapDef('plains', 'grass', 'dfs');
export const devMap = new MapDef('dev', 'grass', 'dev');

void grassWalls;
void grassFloors;
void sandWalls;
void sandFloors;
void forestWalls;
void forestFloors;
