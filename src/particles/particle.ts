import { Vector2 } from '../utils/vector';

export type FlipMode = 'none' | 'x' | 'y' | 'both';

export class Particle {
  pos: Vector2;
  vel: Vector2;
  startingLife: number;
  life: number;
  path: string;
  flip: FlipMode;

  constructor(opts: {
    path: string;
    pos: Vector2;
    vel?: Vector2;
    life?: number;
    flip?: FlipMode;
  }) {
    this.path = opts.path;
    this.pos = opts.pos;
    this.vel = opts.vel ?? new Vector2(0, 0);
    this.life = opts.life ?? 1;
    this.startingLife = this.life;
    this.flip = opts.flip ?? 'none';
  }

  update(dt: number): void {
    this.pos = this.pos.add(this.vel.scale(dt));
    this.life -= dt;
  }

  get alive(): boolean {
    return this.life > 0;
  }

  get progress(): number {
    return Math.min(1, Math.max(0, 1 - this.life / this.startingLife));
  }
}
