import { describe, expect, it } from 'vitest';
import { computeCanvasScale, computeCanvasStyle, LOGICAL_HEIGHT, LOGICAL_WIDTH } from './canvasLayout';

describe('canvasLayout', () => {
  it('scales up when the window is larger than the logical canvas', () => {
    expect(computeCanvasScale(1920, 1080)).toBeCloseTo(Math.min(1920 / LOGICAL_WIDTH, 1080 / LOGICAL_HEIGHT));
  });

  it('scales down when the window is smaller than the logical canvas', () => {
    expect(computeCanvasScale(128, 96)).toBeCloseTo(0.5);
  });

  it('fills the window with the canvas', () => {
    expect(computeCanvasStyle(375, 667)).toEqual({
      width: '375px',
      height: '667px',
    });
  });
});
