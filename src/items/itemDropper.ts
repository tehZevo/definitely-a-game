import { Component } from '../ecs';
import { Position } from '../physics/position';
import type { ItemDef } from '../items/itemDef';
import { DroppedItem } from './droppedItem';

const ITEM_DROP_RADIUS = 2;

export class ItemDropper extends Component {
  drop(item: ItemDef, pos: Position): import('../ecs').Entity {
    const world = this.entity.world;
    if (!world) return this.entity;
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * ITEM_DROP_RADIUS;
    const offset = { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    return world.createEntity([
      new Position(pos.x + offset.x, pos.y + offset.y),
      new DroppedItem(item),
    ]);
  }
}
