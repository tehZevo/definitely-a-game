import { Interactable } from '../core/interactable';
import type { Entity } from '../ecs';
import type { ItemDef } from '../items/itemDef';

export class Chest extends Interactable {
  items: ItemDef[];

  constructor(items: ItemDef[] = []) {
    super();
    this.items = items;
  }

  override interact(_entity: Entity): void {
    void _entity;
    this.entity.remove();
  }
}
