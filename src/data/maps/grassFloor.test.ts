import { describe, it, expect } from 'vitest';
import { grassFloor } from './grassFloor';

describe('grassFloor', () => {
  it('builds a full grid of grass tiles', () => {
    const set = grassFloor(3, 2);
    expect(set.width).toBe(3);
    expect(set.height).toBe(2);
    expect(set.tileAt(0, 0)?.imagePath).toBe('assets/tiles/grass.png');
    expect(set.tileAt(2, 1)?.imagePath).toBe('assets/tiles/grass.png');
  });
});
