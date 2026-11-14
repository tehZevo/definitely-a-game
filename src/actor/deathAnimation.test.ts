import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { DeathAnimation } from './deathAnimation';

describe('DeathAnimation', () => {
  it('finishes after its duration', () => {
    const world = new World();
    const entity = world.createEntity([new Position(0, 0), new DeathAnimation(1)]);
    const animation = entity.getComponent(DeathAnimation)!;
    expect(animation.finished).toBe(false);
    world.update(1);
    expect(animation.finished).toBe(true);
  });
});
