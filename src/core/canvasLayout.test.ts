import { describe, expect, it } from 'vitest';
import {
  computeCanvasScale,
  computeCanvasStyle,
  LOGICAL_HEIGHT,
  LOGICAL_WIDTH,
  MAX_CANVAS_SCALE,
} from './canvasLayout';

describe('canvasLayout', () => {
  it('uses an integer scale that fits the window', () => {
    expect(computeCanvasScale(1000, 740)).toBe(3);
  });

  it('caps the scale at the maximum', () => {
    expect(computeCanvasScale(3840, 2160)).toBe(MAX_CANVAS_SCALE);
  });

  it('never scales below one', () => {
    expect(computeCanvasScale(128, 96)).toBe(1);
  });

  it('sizes the canvas from the logical size and scale', () => {
    expect(computeCanvasStyle(1000, 740)).toEqual({
      width: `${LOGICAL_WIDTH * 3}px`,
      height: `${LOGICAL_HEIGHT * 3}px`,
    });
  });
});
