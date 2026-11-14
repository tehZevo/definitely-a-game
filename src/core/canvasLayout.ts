import { SCREEN_HEIGHT_TILES, SCREEN_WIDTH_TILES, TILE_SIZE } from '../constants';

export const LOGICAL_WIDTH = SCREEN_WIDTH_TILES * TILE_SIZE;
export const LOGICAL_HEIGHT = SCREEN_HEIGHT_TILES * TILE_SIZE;

export interface CanvasStyle {
  width: string;
  height: string;
  scale: number;
}

export const CANVAS_RESOLUTION = 4;

export function computeCanvasScale(windowWidth: number, windowHeight: number): number {
  return Math.max(1, Math.min(windowWidth / LOGICAL_WIDTH, windowHeight / LOGICAL_HEIGHT));
}

export function computeCanvasStyle(windowWidth: number, windowHeight: number): CanvasStyle {
  const scale = computeCanvasScale(windowWidth, windowHeight);
  return {
    width: `${LOGICAL_WIDTH * scale}px`,
    height: `${LOGICAL_HEIGHT * scale}px`,
    scale,
  };
}
