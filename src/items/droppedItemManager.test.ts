import { describe, it, expect } from 'vitest';
import { World } from '../ecs';
import { MAX_DROPPED_ITEMS } from '../constants';
import { DroppedItem } from './droppedItem';
import { DroppedItemManager, excessDroppedItems } from './droppedItemManager';
import { Position } from '../physics/position';
import { Weapon } from './weapon';
import { WeaponType } from './slots';

function drop(world: World, id: string, x = 0) {
  return world.createEntity([
    new Position(x, 0),
    new DroppedItem(new Weapon({ id, weaponType: WeaponType.SHORTSWORD })),
  ]);
}

describe('excessDroppedItems', () => {
  it('keeps the most recent drops', () => {
    const items = Array.from({ length: MAX_DROPPED_ITEMS + 3 }, (_, i) => i);
    expect(excessDroppedItems(items)).toEqual([0, 1, 2]);
  });

  it('removes nothing while under the cap', () => {
    const items = Array.from({ length: MAX_DROPPED_ITEMS }, (_, i) => i);
    expect(excessDroppedItems(items)).toEqual([]);
  });
});

describe('DroppedItemManager', () => {
  it('prunes dropped items down to the cap', () => {
    const world = new World();
    world.createEntity([new DroppedItemManager()]);
    const drops = Array.from({ length: MAX_DROPPED_ITEMS + 4 }, (_, i) =>
      drop(world, `sword_${i}`, i),
    );

    world.update(0);

    const alive = world.find(DroppedItem);
    expect(alive).toHaveLength(MAX_DROPPED_ITEMS);
    expect(alive).toContain(drops[MAX_DROPPED_ITEMS]);
    expect(alive).toContain(drops[MAX_DROPPED_ITEMS + 3]);
    expect(alive).not.toContain(drops[0]);
  });

  it('leaves a full world untouched', () => {
    const world = new World();
    world.createEntity([new DroppedItemManager()]);
    const drops = Array.from({ length: 3 }, (_, i) => drop(world, `sword_${i}`, i));

    world.update(0);

    expect(world.find(DroppedItem)).toEqual(drops);
  });
});
