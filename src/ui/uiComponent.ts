import { Component } from '../ecs';
import { Position } from '../physics/position';

export abstract class UIComponent extends Component {
  override start(): void {
    this.entity.ensureComponent(Position);
  }
}
