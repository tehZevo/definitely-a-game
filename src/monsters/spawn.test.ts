import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { MobDef } from './mobdef';
import { spawnMob } from './spawn';

describe('spawnMob', () => {
  it('creates an entity with Position and Sprite from the def', () => {
    const world = new World();
    const def = new MobDef('slime', 'assets/monsters/slime_idle.png');
    const e = spawnMob(world, def, 50, 60);
    expect(world.find(Sprite)).toContain(e);
    expect(e.getComponent(Position)?.x).toBe(50);
    expect(e.getComponent(Sprite)?.textures).toEqual([
      'assets/monsters/slime_idle.png',
    ]);
  });
});
