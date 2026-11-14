import { describe, expect, it } from 'vitest';
import { ySortZ } from './ySort';
import { TILE_SIZE } from '../constants';

describe('ySortZ', () => {
  it('sorts by the bottom edge of the drawn object', () => {
    expect(ySortZ(80, 16)).toBe(64);
  });

  it('keeps a tile and a same-height sprite at the same y equal', () => {
    expect(ySortZ(5 * TILE_SIZE, TILE_SIZE)).toBe(ySortZ(5 * TILE_SIZE, TILE_SIZE));
  });
});
