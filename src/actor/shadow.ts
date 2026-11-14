import { Component } from '../ecs';
import { Position } from '../physics/position';
import { SHADOW_OFFSET_Y } from '../constants';

export class Shadow extends Component {
  offsetY = SHADOW_OFFSET_Y;

  override start(): void {
    this.entity.ensureComponent(Position);
  }
}
