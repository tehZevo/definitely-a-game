import { Vector2 } from '../utils/vector';

export class Layer {
  imagePath: string;
  frameWidth: number;
  numFrames: number;
  offsets: Vector2[];

  constructor(imagePath: string, frameWidth: number, numFrames: number, offsets?: Vector2[]) {
    this.imagePath = imagePath;
    this.frameWidth = frameWidth;
    this.numFrames = numFrames;
    this.offsets = offsets ?? Array.from({ length: numFrames }, () => new Vector2(0, 0));
  }
}

export class Animation {
  layers: Layer[];
  loop: boolean;
  numFrames: number;
  frameTimes: number[];

  constructor(layers: Layer[] = [], frameTimes?: number[], loop = false) {
    this.layers = layers;
    this.loop = loop;
    this.numFrames = this.calcNumFrames(layers);
    this.frameTimes = this.calcFrameTimes(frameTimes);
  }

  private calcNumFrames(layers: Layer[]): number {
    if (layers.length === 0) return 0;
    const counts = layers.map((l) => l.numFrames);
    if (!counts.every((f) => f === counts[0])) {
      throw new Error(`Layers do not all have the same number of frames: ${counts.join(', ')}`);
    }
    return counts[0];
  }

  private calcFrameTimes(frameTimes?: number[]): number[] {
    if (this.numFrames === 0) return [];
    const times = frameTimes ?? Array.from({ length: this.numFrames }, () => 1 / this.numFrames);
    const sum = times.reduce((a, b) => a + b, 0);
    const normalized = times.map((t) => t / sum);
    const cumulative: number[] = [];
    let acc = 0;
    for (const t of normalized) {
      acc += t;
      cumulative.push(acc);
    }
    return cumulative;
  }

  calcFrame(t: number): number {
    if (!this.loop && t < 0) return 0;
    if (!this.loop && t >= 1) return this.numFrames - 1;
    const wrapped = this.loop ? t % 1 : t;
    const idx = this.frameTimes.findIndex((ft) => ft >= wrapped);
    return Math.max(0, Math.min(idx === -1 ? this.numFrames - 1 : idx, this.numFrames - 1));
  }
}

export class SpriteDef {
  id: string;
  animations: Record<string, Animation>;
  origin: Vector2;

  constructor(id: string, animations: Record<string, Animation> = {}, origin?: [number, number]) {
    this.id = id;
    this.animations = animations;
    this.origin = origin ? new Vector2(origin[0], origin[1]) : new Vector2(0, 0);
  }
}

export class SimpleSprite extends SpriteDef {
  constructor(id: string, imagePath: string, frameWidth: number, numFrames: number, offset?: [number, number], loop = false) {
    const offsets = offset ? Array.from({ length: numFrames }, () => new Vector2(offset[0], offset[1])) : undefined;
    const layer = new Layer(imagePath, frameWidth, numFrames, offsets);
    const anim = new Animation([layer], undefined, loop);
    super(id, { default: anim });
  }
}
