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
    const map = new MapDef('custom', 'grass', 'dfs');
    expect(resolveMap(map)).toBe(map);
  });

  it('cycles through known maps', () => {
    const index = allMaps.findIndex((map) => map.id === 'plains');
    expect(nextMapFor('plains')).toBe(allMaps[(index + 1) % allMaps.length]);
  });
});
