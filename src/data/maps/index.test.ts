import { describe, expect, it } from 'vitest';
import { MapDef } from '../../maps/dfsGenerator';
import { getMap } from '../registry';
import { allMaps, nextMapFor, resolveMap } from './index';

describe('map registry', () => {
  it('registers known maps', () => {
    expect(getMap('plains')).toBe(resolveMap('plains'));
    expect(getMap('forest')).toBe(resolveMap('forest'));
  });

  it('resolves a MapDef without copying it', () => {
    const map = new MapDef('custom', undefined, 'dfs');
    expect(resolveMap(map)).toBe(map);
  });

  it('cycles through known maps', () => {
    const index = allMaps.findIndex((map) => map.id === 'plains');
    expect(nextMapFor('plains')).toBe(allMaps[(index + 1) % allMaps.length]);
  });
});

describe('map generation options', () => {
  it('gives plains large rooms and a small floor', () => {
    expect(resolveMap('plains').opts).toEqual({ roomSize: 20, floorSize: 2, doorWidth: 1 });
  });

  it('gives forest medium rooms', () => {
    expect(resolveMap('forest').opts).toEqual({ roomSize: 8, floorSize: 3, doorWidth: 1 });
  });

  it('gives maze small rooms and a large floor', () => {
    expect(resolveMap('maze').opts).toEqual({ roomSize: 6, floorSize: 6, doorWidth: 1 });
  });
});
