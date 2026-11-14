import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Actor } from '../actor/actor';
import { Vector2 } from '../utils/vector';
import { LookAt } from './lookAt';

describe('LookAt', () => {
  it('sets the actor look direction', () => {
    const world = new World();
    const actor = new Actor();
    world.createEntity([new Position(0, 0), actor]);

    actor.act(new LookAt(new Vector2(1, 0)));
    actor.currentAction?.update();

    expect(actor.lookDir.x).toBeCloseTo(1);
    expect(actor.lookDir.y).toBeCloseTo(0);
  });
});
