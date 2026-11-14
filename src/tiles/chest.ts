import { Interactable } from '../core/interactable';
import type { Entity } from '../ecs';
import type { ItemDef } from '../items/itemDef';
import { Sprite } from '../graphics/sprite';

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
  }

  override interact(_entity: Entity): void {
    void _entity;
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.frames = { default: ['assets/tiles/chest_open.png'] };
      sprite.current = 'default';
    }
  }
}
