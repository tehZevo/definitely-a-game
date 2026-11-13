import { Assets, Container, Rectangle, Sprite as PixiSprite, Texture } from 'pixi.js';
import { World, type Entity } from '../ecs';
import { Position } from '../physics/position';
import { Sprite } from './sprite';
import { Shadow } from '../actor/shadow';
import { assetUrl } from '../assets';

const FRAME_DURATION = 0.1;

interface Layer {
  sprite: PixiSprite;
  frames: Texture[];
}

interface AnimState {
  current: string;
  frameIndex: number;
  elapsed: number;
  layers: Layer[];
  frameCount: number;
}

export class SpriteRenderer {
  private views = new Map<Entity, Container>();
  private anims = new Map<Entity, AnimState>();
  private cache = new Map<string, Texture[]>();
  private shadowTex: Texture | null = null;
  private shadowViews = new Map<Entity, PixiSprite>();

  constructor(private stage: Container) {}

  private async load(path: string): Promise<Texture[]> {
    let frames = this.cache.get(path);
    if (!frames) {
      const tex = await Assets.load<Texture>(assetUrl(path));
      tex.source.scaleMode = 'nearest';
      const size = tex.source.height;
      const count = Math.max(1, Math.floor(tex.source.width / size));
      frames = [];
      for (let i = 0; i < count; i++) {
        frames.push(new Texture({ source: tex.source, frame: new Rectangle(i * size, 0, size, size) }));
      }
      this.cache.set(path, frames);
    }
    return frames;
  }

  private build(paths: string[]): { layers: Layer[]; frameCount: number } {
    const layers: Layer[] = [];
    let frameCount = Infinity;
    for (const path of paths) {
      const frames = this.cache.get(path);
      if (!frames) continue;
      layers.push({ sprite: new PixiSprite(frames[0]), frames });
      frameCount = Math.min(frameCount, frames.length);
    }
    return { layers, frameCount: frameCount === Infinity ? 1 : frameCount };
  }

  async preload(world: World): Promise<void> {
    try {
      this.shadowTex = await Assets.load<Texture>(assetUrl('assets/shadow.png'));
      this.shadowTex.source.scaleMode = 'nearest';
    } catch {
      this.shadowTex = null;
    }

    for (const entity of world.find(Sprite)) {
      const sprite = entity.getComponent(Sprite);
      if (!sprite) continue;
      for (const paths of Object.values(sprite.frames)) {
        for (const path of paths) await this.load(path);
      }
      const container = new Container();
      if (this.shadowTex && entity.getComponent(Shadow)) {
        const shadow = new PixiSprite(this.shadowTex);
        shadow.alpha = 0.5;
        shadow.y = 5;
        container.addChild(shadow);
        this.shadowViews.set(entity, shadow);
      }
      const built = this.build(sprite.frames[sprite.current] ?? []);
      for (const layer of built.layers) container.addChild(layer.sprite);
      this.stage.addChild(container);
      this.views.set(entity, container);
      this.anims.set(entity, {
        current: sprite.current,
        frameIndex: 0,
        elapsed: 0,
        layers: built.layers,
        frameCount: built.frameCount,
      });
    }
  }

  update(world: World, dt = 0): void {
    for (const entity of world.find(Sprite)) {
      const view = this.views.get(entity);
      const pos = entity.getComponent(Position);
      const sprite = entity.getComponent(Sprite);
      const anim = this.anims.get(entity);
      if (!view || !pos || !sprite || !anim) continue;
      if (anim.current !== sprite.current) {
        const built = this.build(sprite.frames[sprite.current] ?? []);
        const shadow = this.shadowViews.get(entity);
        view.removeChildren();
        if (shadow) view.addChild(shadow);
        for (const layer of built.layers) view.addChild(layer.sprite);
        anim.current = sprite.current;
        anim.layers = built.layers;
        anim.frameCount = built.frameCount;
        anim.frameIndex = 0;
        anim.elapsed = 0;
      }
      if (anim.frameCount > 1) {
        anim.elapsed += dt;
        while (anim.elapsed >= FRAME_DURATION) {
          anim.elapsed -= FRAME_DURATION;
          anim.frameIndex = (anim.frameIndex + 1) % anim.frameCount;
        }
      }
      for (const layer of anim.layers) {
        layer.sprite.texture = layer.frames[anim.frameIndex] ?? layer.frames[0];
      }
      view.x = Math.round(pos.x);
      view.y = Math.round(pos.y);
    }
  }
}
