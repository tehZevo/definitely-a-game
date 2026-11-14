import { Interactable } from '../core/interactable';
import type { Entity } from '../ecs';
import type { ItemDef } from '../items/itemDef';
import { Sprite } from '../graphics/sprite';
import { ItemDropper } from '../items/itemDropper';
import { Position } from '../physics/position';
import { Physics } from '../physics/physics';
import { Vector2 } from '../utils/vector';
import { TILE_SIZE } from '../constants';

export const CHEST_SPAWN_FORCE = 1000 * TILE_SIZE;

export class Chest extends Interactable {
  items: ItemDef[];
  solid = true;

  constructor(items: ItemDef[] = []) {
    super();
    this.items = items;
    this.description = 'A chest holding loot.';
  }

  override start(): void {
    this.entity.ensureComponent(Sprite);
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.frames = { default: ['assets/tiles/chest.png'] };
      sprite.current = 'default';
    }
    const dropper = this.entity.ensureComponent(ItemDropper);
    dropper.setItems(this.items);
  }

  override interact(_entity: Entity): void {
    void _entity;
    const dropper = this.entity.getComponent(ItemDropper);
    const pos = this.entity.getComponent(Position);
    if (!dropper || !pos) return;
    for (const item of this.items) {
      const dropped = dropper.drop(item, pos);
      const physics = dropped.getComponent(Physics);
      physics?.applyForce(Vector2.random().scale(CHEST_SPAWN_FORCE));
    }
    this.entity.remove();
  }
}
