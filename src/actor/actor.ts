import { Component } from '../ecs';
import { Vector2 } from '../utils/vector';
import { Position } from '../physics/position';
import { Stats } from './stats';
import { DamageNumber } from '../ui/damageNumber';
import { DamageNumberType } from '../ui/damageNumberType';

export class Actor extends Component {
  lookDir = new Vector2(0, -1);
  moveDir = new Vector2(0, -1);
  alive = true;
  inCombat = false;
  combatTimer = 0;

  damage(amount: number, damageType: DamageNumberType = DamageNumberType.NORMAL): void {
    const stats = this.entity.getComponent(Stats);
    if (!stats) return;
    stats.addHp(-amount);
    this.spawnNumber(amount, damageType);
    if (stats.hp <= 0) {
      this.alive = false;
      this.entity.remove();
    }
  }

  damageHits(hits: Array<[number, boolean]>): void {
    const total = hits.reduce((sum, [amount]) => sum + amount, 0);
    const isCrit = hits.some(([, crit]) => crit);
    this.damage(total, isCrit ? DamageNumberType.CRIT : DamageNumberType.NORMAL);
  }

  private spawnNumber(amount: number, damageType: DamageNumberType): void {
    const world = this.entity.world;
    const pos = this.entity.getComponent(Position);
    if (!world || !pos) return;
    world.createEntity([new Position(pos.x, pos.y), new DamageNumber(amount, damageType)]);
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
