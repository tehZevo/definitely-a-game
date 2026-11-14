import { describe, expect, it } from 'vitest';
import { World } from '../ecs';
import { Position } from '../physics/position';
import { Chest, CHEST_SPAWN_FORCE } from './chest';
import { DroppedItem } from '../items/droppedItem';
import { Physics } from '../physics/physics';
import { ItemDef } from '../items/itemDef';
import { TILE_SIZE } from '../constants';

describe('Chest', () => {
  const item = new ItemDef({ id: 'loot', icon: 'assets/items/x.png' });

  it('ejects its loot on interact and removes itself', () => {
    const world = new World();
    const chest = world.createEntity([new Position(64, 48), new Chest([item])]);

    chest.getComponent(Chest)!.interact(world.createEntity([]));
    world.update(0);

    const dropped = world.find(DroppedItem);
    expect(dropped).toHaveLength(1);
    expect(dropped[0].getComponent(DroppedItem)!.item).toBe(item);
    expect(world.find(Chest)).toHaveLength(0);
  });

  it('applies a random spawn force to ejected loot', () => {
    const world = new World();
    const chest = world.createEntity([new Position(64, 48), new Chest([item])]);

    chest.getComponent(Chest)!.interact(world.createEntity([]));

    const dropped = world.find(DroppedItem)[0];
    const force = dropped.getComponent(Physics)!.force;
    expect(Math.round(force.length())).toBeCloseTo(CHEST_SPAWN_FORCE, -3);
  });

  it('scales the spawn force to pixels', () => {
    expect(CHEST_SPAWN_FORCE).toBe(1000 * TILE_SIZE);
  });
});
