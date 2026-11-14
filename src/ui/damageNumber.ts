import { Component } from '../ecs';
import { Position } from '../physics/position';
import { DamageNumberType, damageNumberIcon } from './damageNumberType';

export const DAMAGE_NUMBER_TIME = 1;
export const DAMAGE_NUMBER_HEIGHT = 16;
export const DAMAGE_NUMBER_STACK_DELAY = 0.25;
export const DAMAGE_NUMBER_STACK_SEPARATION = 12;

export class DamageNumber extends Component {
  number: string;
  delay: number;
  time = 0;
  startY = 0;

  constructor(
    public rawNumber: number,
    public damageType: DamageNumberType = DamageNumberType.NORMAL,
    public stack = 0,
  ) {
    super();
    const icon = damageNumberIcon(damageType);
    const value = String(Math.round(rawNumber));
    this.number = icon ? `${icon} ${value}` : value;
    this.delay = stack * DAMAGE_NUMBER_STACK_DELAY;
  }

  override start(): void {
    const pos = this.entity.getComponent(Position);
    if (pos) this.startY = pos.y;
  }

  override update(dt = 0): void {
    this.delay -= dt;
    if (this.delay > 0) return;
    this.time += dt;
    const pos = this.entity.getComponent(Position);
    if (pos) pos.y = this.startY - (this.time / DAMAGE_NUMBER_TIME) * DAMAGE_NUMBER_HEIGHT;
    if (this.time >= DAMAGE_NUMBER_TIME) this.entity.remove();
  }
}
