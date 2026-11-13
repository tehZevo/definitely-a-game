import { Component } from '../ecs';
import { Position } from '../physics/position';

export class Shadow extends Component {
  override start(): void {
    this.entity.ensureComponent(Position);
  }
}
