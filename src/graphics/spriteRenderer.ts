import { Assets, Container, Sprite as PixiSprite, Texture } from 'pixi.js';
import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from './sprite';
import { assetUrl } from '../assets';

export class SpriteRenderer {
  private views = new Map<Entity, Container>();
  private rendered = new Map<Entity, string>();
  private cache = new Map<string, Texture>();

  constructor(private stage: Container) {}

  private async load(path: string): Promise<Texture> {
    let tex = this.cache.get(path);
    if (!tex) {
      tex = await Assets.load<Texture>(assetUrl(path));
      tex.source.scaleMode = 'nearest';
      this.cache.set(path, tex);
    }
    return tex;
  }

  private build(container: Container, paths: string[]): void {
    container.removeChildren();
    for (const path of paths) {
      const tex = this.cache.get(path);
      if (tex) container.addChild(new PixiSprite(tex));
    }
  }

  async preload(world: World): Promise<void> {
    for (const entity of world.find(Sprite)) {
      const sprite = entity.getComponent(Sprite);
      if (!sprite) continue;
      for (const paths of Object.values(sprite.frames)) {
        for (const path of paths) await this.load(path);
      }
      const container = new Container();
      this.build(container, sprite.frames[sprite.current] ?? []);
      this.stage.addChild(container);
      this.views.set(entity, container);
      this.rendered.set(entity, sprite.current);
    }
  }

  update(world: World): void {
    for (const entity of world.find(Sprite)) {
      const view = this.views.get(entity);
      const pos = entity.getComponent(Position);
      const sprite = entity.getComponent(Sprite);
      if (!view || !pos || !sprite) continue;
      if (this.rendered.get(entity) !== sprite.current) {
        this.build(view, sprite.frames[sprite.current] ?? []);
        this.rendered.set(entity, sprite.current);
      }
      view.x = Math.round(pos.x);
      view.y = Math.round(pos.y);
    }
  }
}
