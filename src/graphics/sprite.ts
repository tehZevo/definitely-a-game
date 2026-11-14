import { Component } from '../ecs';

export class Sprite extends Component {
  current: string;

  constructor(public frames: Record<string, string[]> = {}, current?: string) {
    super();
    this.current = current ?? Object.keys(frames)[0] ?? '';
  }

  setAnimation(name: string): void {
    if (name in this.frames) {
      this.current = name;
    }
  }
}
