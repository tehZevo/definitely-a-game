import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from './sprite';
import { assetUrl } from '../assets';

export class SpriteRenderer {
  private views = new Map<Entity, Container>();
  private cache = new Map<string, Texture>();

  constructor(private stage: Container) {}

  async preload(world: World): Promise<void> {
    for (const entity of world.find(Sprite)) {
      const sprite = entity.getComponent(Sprite);
      if (!sprite) continue;
      const container = new Container();
      for (const path of sprite.textures) {
        let tex = this.cache.get(path);
        if (!tex) {
          tex = await Assets.load<Texture>(assetUrl(path));
          tex.source.scaleMode = 'nearest';
          this.cache.set(path, tex);
        }
        container.addChild(new PixiSprite(tex));
      }
      this.stage.addChild(container);
      this.views.set(entity, container);
    }
  }

  update(world: World): void {
    for (const entity of world.find(Sprite)) {
      const view = this.views.get(entity);
      const pos = entity.getComponent(Position);
      if (view && pos) {
        view.x = Math.round(pos.x);
        view.y = Math.round(pos.y);
      }
    }
  }
}
