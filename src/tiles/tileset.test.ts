import { describe, it, expect } from 'vitest';
import { Tileset } from './tileset';
import { Tile } from './tile';

describe('Tileset', () => {
  const t = new Tile('assets/tiles/grass.png');
  const set = new Tileset(2, 2, [[t, t], [t, t]]);

  it('returns tiles in bounds', () => {
    expect(set.tileAt(0, 0)).toBe(t);
    expect(set.tileAt(1, 1)).toBe(t);
  });

  it('returns undefined out of bounds', () => {
    expect(set.tileAt(2, 0)).toBeUndefined();
    expect(set.tileAt(-1, 0)).toBeUndefined();
    expect(set.tileAt(0, 5)).toBeUndefined();
  });
});
