import { TileEntity } from './tileEntity';
import type { MapDef } from '../maps/dfsGenerator';
import { Sprite } from '../graphics/sprite';

export class Stairs extends TileEntity {
  constructor(public mapdef: MapDef | string) {
    super();
  }

  override start(): void {
    this.entity.ensureComponent(Sprite);
    const sprite = this.entity.getComponent(Sprite);
    if (sprite) {
      sprite.frames = { default: ['assets/tiles/stairs.png'] };
      sprite.current = 'default';
    }
  }
}
