import { describe, expect, it } from 'vitest';
import { computeCanvasScale, computeCanvasStyle } from './canvasLayout';

describe('canvasLayout', () => {
  it('uses an integer scale when the window is larger than the logical canvas', () => {
    expect(computeCanvasScale(1920, 1080)).toBe(5);
  });

  it('uses a fractional scale when the window is smaller than the logical canvas', () => {
    expect(computeCanvasScale(128, 96)).toBeCloseTo(0.5);
  });

  it('computes canvas CSS size from the logical size and scale', () => {
    expect(computeCanvasStyle(1920, 1080)).toEqual({
      width: '1280px',
      height: '960px',
    });
  });
});
