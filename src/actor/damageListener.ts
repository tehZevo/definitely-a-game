import { Component } from '../ecs';

export class DamageListener extends Component {
  onDamage(attacker: import('../ecs').Entity, amount: number): void;
}
