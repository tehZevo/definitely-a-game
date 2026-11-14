import { describe, expect, it } from 'vitest';
import { isBehindTile } from './tileRenderer';

describe('isBehindTile', () => {
  it('detects a player standing behind a wall tile', () => {
    expect(isBehindTile(4.5, 4.2, 5, 5)).toBe(true);
  });

  it('does not mark a player in front of a wall tile', () => {
    expect(isBehindTile(4.5, 5.2, 5, 5)).toBe(false);
  });

  it('does not mark a player far away from a wall tile', () => {
    expect(isBehindTile(8, 5, 5, 5)).toBe(false);
  });
});
