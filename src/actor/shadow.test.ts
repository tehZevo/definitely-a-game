import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { SHADOW_OFFSET_Y } from '../constants';
import { Shadow } from './shadow';

describe('Shadow', () => {
  it('uses the Python shadow offset', () => {
    const world = new World();
    const shadow = new Shadow();
    world.createEntity([new Position(0, 0), shadow]);

    expect(shadow.offsetY).toBe(SHADOW_OFFSET_Y);
  });
});
