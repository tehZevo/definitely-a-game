import { Component } from '../ecs';

export abstract class DamageListener extends Component {
  abstract onDamage(attacker: import('../ecs').Entity, amount: number): void;
}
