import { describe, it, expect } from 'vitest';
import { Vector2 } from './vector';

describe('Vector2', () => {
  it('adds', () => {
    expect(new Vector2(1, 2).add(new Vector2(3, 4))).toEqual(new Vector2(4, 6));
  });

  it('scales', () => {
    expect(new Vector2(2, 3).scale(2)).toEqual(new Vector2(4, 6));
  });

  it('length', () => {
    expect(new Vector2(3, 4).length()).toBe(5);
  });

  it('normalizes', () => {
    const n = new Vector2(3, 4).normalize();
    expect(n.x).toBeCloseTo(0.6);
    expect(n.y).toBeCloseTo(0.8);
  });

  it('normalize of zero is zero', () => {
    expect(new Vector2(0, 0).normalize()).toEqual(new Vector2(0, 0));
  });
});
