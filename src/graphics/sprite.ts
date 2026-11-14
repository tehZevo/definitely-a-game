import { Component } from '../ecs';
import type { FlipMode } from './spriteDef';

export class Sprite extends Component {
  current: string;
  flip: FlipMode;

  constructor(public frames: Record<string, string[]> = {}, current?: string, flip: FlipMode = 'none') {
    super();
    this.current = current ?? Object.keys(frames)[0] ?? '';
    this.flip = flip;
  }

  setAnimation(name: string): void {
    if (name in this.frames) {
      this.current = name;
    }
  }

  setSprite(path: string): void {
    this.frames = { idle: [path] };
    this.current = 'idle';
  }
}
