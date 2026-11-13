import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Stats } from './stats';

export class Actor extends Component {
  lookDir = new Vector2(0, -1);
  moveDir = new Vector2(0, -1);
  alive = true;
  inCombat = false;
  combatTimer = 0;

  damage(amount: number): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    stats.addHp(-amount);
    if (stats.hp <= 0) this.alive = false;
  }

  heal(amount: number): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    stats.addHp(amount);
  }

  healMp(amount: number): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    stats.addMp(amount);
  }
}
