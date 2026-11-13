import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { PlayerController } from '../actor/playerController';

export class MobAI extends Component {
  speed = 40;
  aggroRange = 120;
  stopRange = 12;

  override update(dt = 0): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    if (!world || !pos) return;

    const players = world.find(PlayerController);
    if (players.length === 0) return;
    const target = players[0].getComponent(Position);
    if (!target) return;

    const to = new Vector2(target.x - pos.x, target.y - pos.y);
    const dist = to.length();
    if (dist <= this.stopRange || dist > this.aggroRange) return;

    const dir = to.scale(1 / dist);
    const step = Math.min(this.speed * dt, dist - this.stopRange);
    pos.x += dir.x * step;
    pos.y += dir.y * step;
  }
}
