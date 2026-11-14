import { TILE_SIZE } from '../constants';

export function ySortZ(worldY: number, height: number): number {
  return Math.round((worldY - height) / TILE_SIZE);
}
