import { Component } from '../ecs';
import { DT } from '../constants';

export const DEFAULT_SAFE_AREA_DURATION = 3;
export const DEFAULT_SAFE_AREA_RADIUS = 4;

export class SafeArea extends Component {
  time: number;
  radius: number;

  constructor(duration = DEFAULT_SAFE_AREA_DURATION, radius = DEFAULT_SAFE_AREA_RADIUS) {
    super();
    this.time = duration;
    this.radius = radius;
  }

  override update(dt = DT): void {
    this.time = Math.max(0, this.time - dt);
  }

  get active(): boolean {
    return this.time > 0;
  }
}
