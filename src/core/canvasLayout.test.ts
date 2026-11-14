import { describe, expect, it } from 'vitest';
import {
  CANVAS_RESOLUTION,
  computeCanvasScale,
  computeCanvasStyle,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
} from './canvasLayout';

describe('canvasLayout', () => {
  it('scales to fill the window with whole pixels', () => {
    expect(computeCanvasScale(1000, 740)).toBe(3);
  });

  it('never scales below one', () => {
    expect(computeCanvasScale(128, 96)).toBe(1);
  });

  it('caps the scale so tiles stay chunky', () => {
    expect(computeCanvasScale(4000, 4000)).toBe(6);
  });

  it('sizes the canvas from the logical size and scale', () => {
    const style = computeCanvasStyle(1000, 740);
    expect(style.scale).toBe(3);
    expect(style.width).toBe(`${LOGICAL_WIDTH * 3}px`);
    expect(style.height).toBe(`${LOGICAL_HEIGHT * 3}px`);
  });

  it('uses a fixed high resolution for crisp rendering', () => {
    expect(CANVAS_RESOLUTION).toBe(4);
  });
});
