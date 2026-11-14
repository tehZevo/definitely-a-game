import { SCREEN_HEIGHT_TILES, SCREEN_WIDTH_TILES, TILE_SIZE } from '../constants';

export const LOGICAL_WIDTH = SCREEN_WIDTH_TILES * TILE_SIZE;
export const LOGICAL_HEIGHT = SCREEN_HEIGHT_TILES * TILE_SIZE;

export interface CanvasStyle {
  width: string;
  height: string;
}

export function computeCanvasScale(windowWidth: number, windowHeight: number): number {
  const scale = Math.min(windowWidth / LOGICAL_WIDTH, windowHeight / LOGICAL_HEIGHT);
  return scale >= 1 ? Math.floor(scale) : scale;
}

export function computeCanvasStyle(windowWidth: number, windowHeight: number): CanvasStyle {
  const scale = computeCanvasScale(windowWidth, windowHeight);
  return {
    width: `${Math.round(LOGICAL_WIDTH * scale)}px`,
    height: `${Math.round(LOGICAL_HEIGHT * scale)}px`,
  };
}
