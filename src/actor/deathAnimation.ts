import { Component } from '../ecs';
import { DT } from '../constants';

export const DEFAULT_DEATH_ANIMATION_DURATION = 0.5;

export class DeathAnimation extends Component {
  time: number;

  constructor(duration = DEFAULT_DEATH_ANIMATION_DURATION) {
    super();
    this.time = duration;
  }

  override update(dt = DT): void {
    this.time = Math.max(0, this.time - dt);
  }

  get finished(): boolean {
    return this.time <= 0;
  }
}
