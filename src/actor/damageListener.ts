import { Component } from '../ecs';
import type { Entity } from '../ecs';

export class DamageListener extends Component {
  onDamage(_attacker: Entity, _amount: number): void {}
}
