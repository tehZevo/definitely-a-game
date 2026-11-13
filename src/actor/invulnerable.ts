import { Component } from '../ecs';
import { DT } from '../constants';

export class Invulnerable extends Component {
  constructor(public time: number | null) {
    super();
  }

  override update(dt = DT): void {
    if (this.time === null) return;
    this.time -= dt;
    if (this.time <= 0) {
      this.entity.removeComponent(this);
    }
  }
}
