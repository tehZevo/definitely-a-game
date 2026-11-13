import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';

export class Physics extends Component {
  force = new Vector2(0, 0);
  vel = new Vector2(0, 0);
  mass = 1;
  friction = 0.5;

  applyForce(force: Vector2): void {
    this.force = this.force.add(force);
  }

  override update(dt = 0): void {
    const pos = this.entity.getComponent(Position);
    if (!pos) return;
    this.vel = this.vel.add(this.force.scale(dt / this.mass));
    pos.x += this.vel.x * dt;
    pos.y += this.vel.y * dt;
    this.force = new Vector2(0, 0);
    this.vel = this.vel.scale(1 / (1 + this.friction));
  }
}
