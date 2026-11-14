import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { INTERACT_CURSOR_SPRITE, InteractCursor } from './interactCursor';

describe('InteractCursor', () => {
  it('uses the cursor sprite', () => {
    const world = new World();
    const entity = world.createEntity([new Position(16, 32), new InteractCursor()]);
    const sprite = entity.getComponent(Sprite);

    expect(sprite).toBeDefined();
    expect(sprite?.frames).toEqual({ idle: [INTERACT_CURSOR_SPRITE] });
    expect(sprite?.current).toBe('idle');
  });
});
