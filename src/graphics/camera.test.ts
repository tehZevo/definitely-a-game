import { describe, it, expect } from 'vitest';
import { cameraTransform } from './camera';
import { Vector2 } from '../utils/vector';

describe('cameraTransform', () => {
  it('centers the target on the viewport', () => {
    const t = cameraTransform(new Vector2(100, 100), 800, 600, 4);
    expect(t.scale).toBe(4);
    expect(t.x).toBeCloseTo(0);
    expect(t.y).toBeCloseTo(-100);
  });
});
