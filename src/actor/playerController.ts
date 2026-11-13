import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import type { InputSource } from '../core/input';

export class PlayerController extends Component {
  speed = 120;
  private input: InputSource;

  constructor(input: InputSource) {
    super();
    this.input = input;
  }

  override update(dt = 0): void {
    const axis = this.input.getAxis();
    const raw = new Vector2(axis.x, axis.y);
    const len = raw.length();
    if (len === 0) return;
    const dir = raw.scale(1 / len);
    const pos = this.entity.getComponent(Position);
    if (!pos) return;
    pos.x += dir.x * this.speed * dt;
    pos.y += dir.y * this.speed * dt;
  }
}
