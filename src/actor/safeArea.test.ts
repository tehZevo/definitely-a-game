import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { SafeArea } from './safeArea';

describe('SafeArea', () => {
  it('expires after its duration', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new SafeArea(2, 3)]);
    const safeArea = entity.getComponent(SafeArea)!;
    expect(safeArea.active).toBe(true);
    world.update(2);
    expect(safeArea.active).toBe(false);
  });
});
