import { Assets, Container, Rectangle, Sprite as PixiSprite, Texture } from 'pixi.js';
import { World } from '../ecs';
import { assetUrl } from '../assets';
import { ParticleSystem } from './particleSystem';
import { flipScales } from '../graphics/spriteDef';

const PARTICLE_Z_INDEX = 90;

export class ParticleRenderer {
  private container: Container;
  private cache = new Map<string, Texture[]>();

  constructor(stage: Container) {
    this.container = new Container();
    this.container.zIndex = PARTICLE_Z_INDEX;
    this.container.eventMode = 'none';
    stage.addChild(this.container);
  }

  async load(path: string): Promise<Texture[]> {
    const cached = this.cache.get(path);
    if (cached) return cached;
    const tex = await Assets.load<Texture>(assetUrl(path));
    tex.source.scaleMode = 'nearest';
    const size = tex.source.height;
    const count = Math.max(1, Math.floor(tex.source.width / size));
    const frames: Texture[] = [];
    for (let i = 0; i < count; i++) {
      frames.push(new Texture({ source: tex.source, frame: new Rectangle(i * size, 0, size, size) }));
    }
    this.cache.set(path, frames);
    return frames;
  }

  async preload(paths: string[]): Promise<void> {
    await Promise.all(
      paths.map(async (path) => {
        try {
          await this.load(path);
        } catch {
          // Missing particle assets should not block the world.
        }
      }),
    );
  }

  update(world: World): void {
    this.container.removeChildren();
    const system = world.findComponent(ParticleSystem);
    if (!system) return;
    for (const particle of system.particles) {
      const frames = this.cache.get(particle.path);
      if (!frames || frames.length === 0) continue;
      const index = Math.min(frames.length - 1, Math.floor(particle.progress * frames.length));
      const sprite = new PixiSprite(frames[index]);
      const scale = flipScales(particle.flip);
      sprite.scale.set(scale.x, scale.y);
      sprite.anchor.set(0.5);
      sprite.x = Math.round(particle.pos.x);
      sprite.y = Math.round(particle.pos.y);
      sprite.eventMode = 'none';
      this.container.addChild(sprite);
    }
  }
}
