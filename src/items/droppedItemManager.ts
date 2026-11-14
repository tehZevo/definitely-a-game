import { Component } from '../ecs';
import { MAX_DROPPED_ITEMS } from '../constants';
import { DroppedItem } from './droppedItem';

export function excessDroppedItems<T>(
  entities: T[],
  max = MAX_DROPPED_ITEMS,
): T[] {
  if (entities.length <= max) return [];
  return entities.slice(0, entities.length - max);
}

export class DroppedItemManager extends Component {
  override update(): void {
    const world = this.entity.world;
    if (!world) return;
    for (const entity of excessDroppedItems(world.find(DroppedItem))) {
      entity.remove();
    }
  }
}
