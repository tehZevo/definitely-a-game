import type { TileType } from '../tiles/tile';

export interface TilePalette {
  floors: TileType[];
  walls: TileType[];
}

const t = (x: string) => `assets/tiles/${x}.png`;

export const grassFloors: TileType[] = ['floor', 'floor_accent'];
export const grassWalls: TileType[] = ['wall', 'wall_accent'];
export const stoneFloors: TileType[] = ['floor', 'floor_accent'];
export const stoneWalls: TileType[] = ['wall', 'wall_accent'];
export const sandFloors: TileType[] = ['floor', 'floor_accent'];
export const sandWalls: TileType[] = ['wall', 'wall_accent'];
export const forestFloors: TileType[] = ['floor', 'floor_accent'];
export const forestWalls: TileType[] = ['wall', 'wall_accent'];
export const dirtFloors: TileType[] = ['floor', 'floor_accent'];
export const dirtWalls: TileType[] = ['wall', 'wall_accent'];

export const TILE_IMAGES: Record<string, string> = {
  grass: t('grass'),
  dirt: t('dirt'),
  stone: t('stone'),
  sand: t('sand'),
  dark_forest: t('dark_forest'),
  dark_dirt: t('dark_dirt'),
};
