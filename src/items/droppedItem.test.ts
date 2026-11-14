import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { DroppedItem, pushForce, withinPushRange } from './droppedItem';
import { ItemDropper } from './itemDropper';
import { Actor } from '../actor/actor';
import { Loadout } from './loadout';
import { Position } from '../physics/position';
import { Physics } from '../physics/physics';
import { Weapon } from './weapon';
import { WeaponSlot, WeaponType } from './slots';
import { ITEM_PUSH_DISTANCE, ITEM_PUSH_FORCE, TILE_SIZE } from '../constants';
import { woodenShortsword } from '../data/items/weapons';

describe('dropped item physics', () => {
  it('drops items with physics so they can move', () => {
    const world = new World();
    const holder = world.createEntity([
      new Position(100, 100),
      new Actor(),
      new Loadout(),
      new ItemDropper(),
    ]);

    const dropped = holder.getComponent(ItemDropper)!.drop(woodenShortsword, new Position(0, 0));
    expect(dropped.getComponent(DroppedItem)?.item).toBe(woodenShortsword);
    expect(dropped.getComponent(Physics)).toBeDefined();
  });

  it('pushes away from a neighbouring item within range', () => {
    const a = new Position(0, 0);
    const b = new Position(TILE_SIZE / 2, 0);
    expect(withinPushRange(a, b)).toBe(true);

    const force = pushForce(a, b);
    expect(force.length()).toBeCloseTo(ITEM_PUSH_FORCE);
    expect(force.x).toBeLessThan(0);
  });

  it('ignores items beyond the push distance', () => {
    const a = new Position(0, 0);
    const b = new Position(ITEM_PUSH_DISTANCE * TILE_SIZE + 1, 0);
    expect(withinPushRange(a, b)).toBe(false);
  });

  it('applies the push force to its own physics body', () => {
    const world = new World();
    const near = world.createEntity([
      new Position(0, 0),
      new Physics(),
      new DroppedItem(woodenShortsword),
    ]);
    world.createEntity([
      new Position(TILE_SIZE / 4, 0),
      new Physics(),
      new DroppedItem(woodenShortsword),
    ]);

    world.update(0);

    const force = near.getComponent(Physics)!.force;
    expect(force.length()).toBeCloseTo(ITEM_PUSH_FORCE);
  });

  it('leaves a lone item alone', () => {
    const world = new World();
    const alone = world.createEntity([
      new Position(0, 0),
      new Physics(),
      new DroppedItem(new Weapon({ id: 'x', weaponType: WeaponType.SHORTSWORD })),
    ]);

    world.update(0);

    expect(alone.getComponent(Physics)!.force.length()).toBe(0);
  });
});
