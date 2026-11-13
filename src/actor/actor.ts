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
    if (stats.hp <= 0) {
      this.alive = false;
      this.entity.remove();
    }
  }

  damageHits(hits: Array<[number, boolean]>): void {
    const total = hits.reduce((sum, [amount]) => sum + amount, 0);
    this.damage(total);
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
