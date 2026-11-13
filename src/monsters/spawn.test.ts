import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from '../graphics/sprite';
import { MobDef } from './mobdef';
import { spawnMob } from './spawn';
import { Stats } from '../actor/stats';
import { Actor } from '../actor/actor';

describe('spawnMob', () => {
  it('creates an entity with Position and Sprite from the def', () => {
    const world = new World();
    const def = new MobDef('slime', 'assets/monsters/slime_idle.png', 5, 25, 0);
    const e = spawnMob(world, def, 50, 60);
    expect(world.find(Sprite)).toContain(e);
    expect(e.getComponent(Position)?.x).toBe(50);
    expect(e.getComponent(Sprite)?.frames.default).toEqual([
      'assets/monsters/slime_idle.png',
    ]);
    expect(e.getComponent(Stats)?.maxHp).toBe(25);
    expect(e.getComponent(Actor)?.alive).toBe(true);
  });
});
