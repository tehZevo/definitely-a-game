import { describe, expect, it } from 'vitest';
import {
  CANVAS_RESOLUTION,
  computeCanvasScale,
  computeCanvasStyle,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
} from './canvasLayout';

describe('canvasLayout', () => {
  it('scales to fill the window', () => {
    expect(computeCanvasScale(1000, 740)).toBeCloseTo(3.854, 2);
  });

  it('never scales below one', () => {
    expect(computeCanvasScale(128, 96)).toBe(1);
  });

  it('sizes the canvas from the logical size and scale', () => {
    const style = computeCanvasStyle(1000, 740);
    expect(style.width).toBe(`${LOGICAL_WIDTH * computeCanvasScale(1000, 740)}px`);
    expect(style.height).toBe(`${LOGICAL_HEIGHT * computeCanvasScale(1000, 740)}px`);
    expect(style.scale).toBeCloseTo(3.854, 2);
  });

  it('uses a fixed high resolution for crisp rendering', () => {
    expect(CANVAS_RESOLUTION).toBe(4);
  });
});
