import { Interactable } from '../core/interactable';
import { GameMaster } from '../core/gameMaster';
import type { Entity } from '../ecs';
import type { MapDef } from '../maps/dfsGenerator';
import { Sprite } from '../graphics/sprite';

export class Stairs extends Interactable {
  override solid = false;

  constructor(public mapdef: MapDef | string) {
    super();
    this.description = 'Stairs to another area.';
  }

  override start(): void {
    this.entity.ensureComponent(Sprite);
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.frames = { default: ['assets/tiles/stairs.png'] };
      sprite.current = 'default';
    }
  }

  override interact(_entity: Entity): void {
    void _entity;
    this.entity.world?.findComponent(GameMaster)?.transition(this.mapdef);
  }
}
