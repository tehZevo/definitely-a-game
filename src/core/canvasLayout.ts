import { SCREEN_HEIGHT_TILES, SCREEN_WIDTH_TILES, TILE_SIZE } from '../constants';

export const LOGICAL_WIDTH = SCREEN_WIDTH_TILES * TILE_SIZE;
export const LOGICAL_HEIGHT = SCREEN_HEIGHT_TILES * TILE_SIZE;

export interface CanvasStyle {
  width: string;
  height: string;
}

export const MAX_CANVAS_SCALE = 4;

export function computeCanvasScale(windowWidth: number, windowHeight: number): number {
  const fit = Math.min(windowWidth / LOGICAL_WIDTH, windowHeight / LOGICAL_HEIGHT);
  return Math.max(1, Math.min(MAX_CANVAS_SCALE, Math.floor(fit)));
}

export function computeCanvasStyle(windowWidth: number, windowHeight: number): CanvasStyle {
  const scale = computeCanvasScale(windowWidth, windowHeight);
  return {
    width: `${LOGICAL_WIDTH * scale}px`,
    height: `${LOGICAL_HEIGHT * scale}px`,
  };
}
